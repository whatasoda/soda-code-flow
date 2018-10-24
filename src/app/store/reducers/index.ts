import * as Redux from 'redux';
import flow, { flowActionCreators, FlowActions, FlowActionsMap, flowActionTypes } from './flow';
import textarea, { textareaActionCreators, TextareaActions, TextareaActionsMap, textareaActionTypes } from './textarea';

const combinedReducer = Redux.combineReducers({ textarea, flow });
export type State = typeof combinedReducer extends Redux.Reducer<infer TState, any> ? TState : never;

export type Actions = FlowActions | TextareaActions;

export interface ActionsMap {
  flow: FlowActionsMap;
  textarea: TextareaActionsMap;
}

export type StoreType = Redux.Store<State, Actions>;

export const actionTypes = {
  flow: flowActionTypes,
  textarea: textareaActionTypes,
};

export type ActionCreatorsMap = typeof actionCreators;
export const actionCreators = {
  flow: flowActionCreators,
  textarea: textareaActionCreators,
};

export default combinedReducer;
