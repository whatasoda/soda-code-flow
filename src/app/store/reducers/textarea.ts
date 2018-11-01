import { Action } from 'redux';
import unitRegistry, { ActionsMapOf, ActionsOf } from '../../lib/unit-redux';

interface State {
  cursor: number;
  start: number;
  end: number;
  isFocused: boolean;
}

const base = unitRegistry<State>(() => ({
  cursor: 0,
  start: 0,
  end: 0,
  isFocused: false,
}));

interface SET_FOCUS extends Action<'SET_FOCUS'> {
  isFocused: boolean;
}
const SET_FOCUS = base.extention(() =>
  base
    .action<SET_FOCUS>('SET_FOCUS')
    .actionCreator((type) => {
      const setFocus = (isFocused: boolean) => ({ type, isFocused });
      return { setFocus };
    })
    .reducer((state, { isFocused }) => ({ ...state, isFocused })),
);

interface SET_CURSOR extends Action<'SET_CURSOR'> {
  start: number;
  end: number;
}
const SET_CURSOR = base.extention(() =>
  base
    .action<SET_CURSOR>('SET_CURSOR')
    .actionCreator((type) => {
      const setCursor = ({ selectionStart, selectionEnd }: HTMLTextAreaElement) => ({
        type,
        start: selectionStart,
        end: selectionEnd,
      });
      return { setCursor };
    })
    .reducer((state, action) => {
      let { cursor, start, end } = state;
      if (action.start !== start) {
        cursor = start = action.start;
      }
      if (action.end !== end) {
        cursor = end = action.end;
      }
      return { ...state, cursor, start, end };
    }),
);

const registry = base.combine(SET_FOCUS).combine(SET_CURSOR);

export const textareaActionTypes = registry.getActionTypes();
export const textareaActionCreators = registry.getActionCreators();
export type TextareaActions = ActionsOf<typeof registry>;
export type TextareaActionsMap = ActionsMapOf<TextareaActions>;

const textarea = registry.getComposedReducer();
export default textarea;
