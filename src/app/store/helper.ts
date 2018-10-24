import { Action, Reducer } from 'redux';

declare module 'redux' {
  function combineReducers<R extends { [key: string]: Reducer<any, any> }>(
    reducers: R,
  ): Reducer<
    { [K in keyof R]: R[K] extends Reducer<infer S, any> ? S : never },
    { [K in keyof R]: R[K] extends Reducer<any, infer A> ? A : never }[keyof R]
  >;
}

type Creator<TAction extends Action> = (...args: any[]) => TAction;
type NullableReducer<TState, TAction extends Action> = (state: TState, action: TAction) => TState | null;

export type ActionsOf<TRegistry extends AnyRegistry> = TRegistry extends Registry<any, infer TActions, any, any, any>
  ? TActions
  : never;

export type ActionCreatorsOf<TRegistry extends AnyRegistry> = TRegistry extends Registry<
  any,
  any,
  infer TActionCreators,
  any,
  any
>
  ? TActionCreators
  : never;

export type RegisteredActionTypesOf<TRegistry extends AnyRegistry> = TRegistry extends Registry<
  any,
  any,
  any,
  infer TRegisteredActionTypes,
  any
>
  ? TRegisteredActionTypes
  : never;

export type ActionsMapOf<TActions extends Action> = { [TType in TActions['type']]: ActionOf<TActions, TType> };

interface ActionCreatorsMap<TAction extends Action = Action> {
  [name: string]: Creator<TAction>;
}

type ReducersMap<TState, TActions extends Action, TTypes extends TActions['type'] = never> = {
  [TType in Exclude<TActions['type'], TTypes>]: ReducerOf<TState, TActions, TType>
};

type ActionOf<TActions extends Action, TType extends TActions['type']> = TActions extends Action<TType>
  ? TActions
  : never;

type ReducerOf<TState, TActions extends Action, TType extends TActions['type']> = NullableReducer<
  TState,
  ActionOf<TActions, TType>
>;

type CombineFunc<TState, TRegistry extends AnyRegistry<TState>> = () => TRegistry;

type Combine<TState, TBase extends AnyRegistry<TState>, TRegistry extends AnyRegistry<TState>> = Registry<
  TState,
  ActionsOf<TBase> | ActionsOf<TRegistry>,
  ActionCreatorsOf<TBase> & ActionCreatorsOf<TRegistry>,
  RegisteredActionTypesOf<TBase> | RegisteredActionTypesOf<TRegistry>,
  null
>;

type AnyRegistry<
  S = any,
  A extends Action = any,
  ACM extends ActionCreatorsMap = any,
  RAT extends A['type'] = any,
  TAT extends A['type'] = any
> = Registry<S, A, ACM, RAT, TAT>;

/**
 * @param S State
 * @param A Actions
 * @param ACM ActionCreatorsMap
 * @param RAT Registered Action Type
 * @param TAT Target Action Type
 */
interface Registry<S, A extends Action, ACM extends ActionCreatorsMap, RAT extends A['type'], TAT extends A['type']> {
  action<TAction extends Action>(type: TAction['type']): Registry<S, A | TAction, ACM, RAT, TAction['type']>;

  actionCreator<TCreators extends ActionCreatorsMap<ActionOf<A, TAT>>>(
    creators: (type: TAT) => TCreators,
  ): Registry<S, A, ACM & TCreators, RAT, TAT>;

  reducer(reducer: ReducerOf<S, A, TAT>): Registry<S, A, ACM, RAT | TAT, TAT>;

  getActionTypes(): { [TType in RAT]: TType };

  getActionCreators(): ACM;

  getReducers(): ReducersMap<S, A, RAT>;

  getComposedReducer(): Reducer<S, ActionsMapOf<A>[RAT]>;

  extention<TRegistry extends AnyRegistry<S>>(func: CombineFunc<S, TRegistry>): CombineFunc<S, TRegistry>;

  combine<TCombineFunc extends CombineFunc<S, any>>(
    func: TCombineFunc,
  ): TCombineFunc extends CombineFunc<any, infer TRegistry>
    ? Combine<S, Registry<S, A, ACM, RAT, TAT>, TRegistry>
    : never;
}

const initRegistry = <S>(initialState: () => S) => {
  const actionTypes: { [type: string]: string } = {};
  const actionCreators: ActionCreatorsMap = {};
  const reducers: ReducersMap<S, Action> = {} as any;
  let currType: string | null = null;

  const registry: Registry<S, Action, any, string, string> = {
    action: (type) => {
      currType = actionTypes[type] = type;
      return registry;
    },

    actionCreator: (creators) => {
      if (!currType) {
        throw new Error('No action type is specified.');
      }
      Object.assign(actionCreators, creators(currType));
      return registry;
    },

    reducer: (reducer) => {
      if (!currType) {
        throw new Error('No action type is specified.');
      }
      reducers[currType] = reducer;
      return registry;
    },

    getActionTypes: () => actionTypes,

    getActionCreators: () => actionCreators,

    getReducers: () => reducers,

    getComposedReducer: () => (state, action) => {
      if (!state) {
        state = initialState();
      }
      const reducer = reducers[action.type];
      const next = reducer && reducer(state, action);
      return next ? next : state;
    },

    extention: (func) => func as any,

    combine: (func) => func(),
  };
  return (registry as any) as Registry<S, never, {}, never, never>;
};

export default initRegistry;
