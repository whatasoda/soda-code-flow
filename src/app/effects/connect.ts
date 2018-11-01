import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { Action, Dispatch } from 'redux';
import { DispatchPropsOf, StatePropsOf } from '../container/types';

interface EffectProps<TContext, TArgs extends any[]> {
  controller: {
    observer: (handle: (...args: TArgs) => void) => Promise<void>;
    effect: (ctx: TContext, ...args: TArgs) => void;
    kill: () => void;
  };
  ctx: TContext;
}

const EffectComponents: React.SFC[] = [];
export const EffectRoot: React.SFC = () =>
  React.createElement(
    React.Fragment,
    {},
    ...EffectComponents.map((Component, key) => React.createElement(Component, { key })),
  );

const emptyHandler = () => void 0;

const connect = <TState, TContext>(
  mapStateToProps: (state: TState) => StatePropsOf<TContext>,
  mapDispatchProps: (dispatch: Dispatch<Action<any>>) => DispatchPropsOf<TContext>,
  handleContextChange: (ctx: TContext) => void = emptyHandler,
) => {
  interface TStateProps {
    ctx: StatePropsOf<TContext>;
  }
  interface TDispatchProps {
    ctx: DispatchPropsOf<TContext>;
  }
  interface TMergedProps {
    ctx: TContext;
  }
  type TOwnProps = Pick<EffectProps<TContext, any[]>, 'controller'>;

  const Connected = ReactRedux.connect<TStateProps, TDispatchProps, TOwnProps, TMergedProps, TState>(
    (state) => ({ ctx: mapStateToProps(state) }),
    (dispatch) => ({ ctx: mapDispatchProps(dispatch) }),
    ({ ctx: sCtx }, { ctx: dCtx }, ownProps) => {
      const ctx = Object.assign({} as TContext, sCtx, dCtx);
      handleContextChange(ctx);
      return { ...ownProps, ctx };
    },
  )(EffectComponent);

  const enhancer = <TArgs extends any[], TPayload>(effect: (ctx: TContext, ...args: TArgs) => TPayload) => {
    const { dispatch, kill, observer } = dispatcher<TArgs>();
    const controller: TOwnProps['controller'] = { effect: effect as any, kill, observer };
    const Component = () => React.createElement(Connected, { controller });
    EffectComponents.push(Component);
    interface TEnhanced {
      (...args: TArgs): void;
      effect: (ctx: TContext, ...args: TArgs) => TPayload;
    }
    const enhanced = dispatch as TEnhanced;
    enhanced.effect = effect;
    return enhanced;
  };

  return enhancer;
};

class EffectComponent extends React.PureComponent<EffectProps<any, any[]>> {
  public componentDidMount() {
    this.props.controller.observer(this.handle.bind(this));
  }

  public componentWillUnmount() {
    this.props.controller.kill();
  }

  public render() {
    return null;
  }

  private handle(...args: any[]) {
    this.props.controller.effect(this.props.ctx, ...args);
  }
}

const dispatcher = <TArgs extends any[]>() => {
  interface TNextObject {
    next: Promise<TNextObject> | null;
    args: TArgs;
  }

  let nextResolver: (obj: TNextObject) => void = null as any;
  let observed = false;
  const initial = new Promise<TNextObject>((resolve) => (nextResolver = resolve));

  const dispatch = (...args: TArgs) => {
    if (!observed) {
      // tslint:disable-next-line:no-console
      console.warn('No effect component is rendered.');
      return;
    }
    const currResolver = nextResolver;
    const next = new Promise<TNextObject>((resolve) => (nextResolver = resolve));
    currResolver({ next, args });
  };

  const kill = () => nextResolver({ next: null, args: [] as any });

  const observer = async (handle: (...args: TArgs) => void) => {
    if (observed) {
      return;
    }
    observed = true;
    let curr = initial;
    while (true) {
      const { next, args } = await curr;
      handle(...args);
      if (!next) {
        break;
      }
      curr = next;
    }
  };

  return { dispatch, kill, observer };
};

export default connect;
