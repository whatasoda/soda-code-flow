import { Action, Dispatch, Store } from 'redux';
import { DispatchPropsOf, StatePropsOf } from '../container/types';

interface EnhancedEffect<TState, TContext, TArgs extends any[], TPayload> {
  (...args: TArgs): TPayload;
  effect: (ctx: TContext, ...args: TArgs) => TPayload;
  enhancer: EffectRedux<TState, TContext>;
}

class EffectRedux<TState, TContext> {
  public static connect<TState, TContext>(
    mapStateToProps: (state: TState) => StatePropsOf<TContext>,
    mapDispatchProps: (dispatch: Dispatch<Action<any>>) => DispatchPropsOf<TContext>,
  ) {
    const enhancer = new EffectRedux(mapStateToProps, mapDispatchProps);
    return enhancer.enhance.bind(enhancer) as typeof enhancer.enhance;
  }

  public static Provider<TState, TAction extends Action>(store: Store<TState, TAction>) {
    return (effectEnhancers: Array<EffectRedux<TState, any>>) => {
      effectEnhancers.forEach((enhancer) => enhancer.provide(store));
      store.subscribe(() => effectEnhancers.forEach((enhancer) => enhancer.touch()));
    };
  }

  private ctx!: TContext;
  private changed: boolean = true;
  private disptchCtx: DispatchPropsOf<TContext> | null = null;
  private store: Store<TState, any> | null = null;

  constructor(
    private mapStateToProps: (state: TState) => StatePropsOf<TContext>,
    private mapDispatchProps: (dispatch: Dispatch<Action<any>>) => DispatchPropsOf<TContext>,
  ) {}

  public enhance<TArgs extends any[], TPayload>(
    effect: (ctx: TContext, ...args: TArgs) => TPayload,
  ): EnhancedEffect<TState, TContext, TArgs, TPayload> {
    const enhanced = (...args: TArgs) => effect(this.consume(), ...args);
    enhanced.effect = effect;
    enhanced.enhancer = this;
    return enhanced;
  }

  private touch() {
    this.changed = true;
  }

  private consume(): TContext | never {
    this.updateContext();
    if (this.ctx === null) {
      throw new Error('Invalid context');
    }
    return this.ctx;
  }

  private provide(store: Store<TState, any>) {
    this.store = store;
    this.disptchCtx = this.mapDispatchProps(store.dispatch);
  }

  private updateContext() {
    if (!this.store || !this.disptchCtx) {
      throw new Error('No store is assigned');
    }
    if (this.changed) {
      this.changed = false;
      this.ctx = this.mergeContext(this.mapStateToProps(this.store.getState()), this.disptchCtx);
    }
  }

  private mergeContext(stateContext: StatePropsOf<TContext>, dispatchContext: DispatchPropsOf<TContext>): TContext {
    return Object.assign({}, stateContext, dispatchContext) as TContext;
  }
}

export const { connect, Provider } = EffectRedux;

export default EffectRedux;
