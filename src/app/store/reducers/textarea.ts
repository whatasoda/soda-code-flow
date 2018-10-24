import { Action } from 'redux';
import initRegistry, { ActionsMapOf, ActionsOf } from '../helper';

interface State {
  cursor: number;
  start: number;
  end: number;
}

const base = initRegistry<State>(() => ({
  cursor: 0,
  start: 0,
  end: 0,
}));

interface SET_CURSOR extends Action<'SET_CURSOR'> {
  start: number;
  end: number;
}

const SET_CURSOR = base.extention(() =>
  base
    .action<SET_CURSOR>('SET_CURSOR')
    .actionCreator((type) => {
      const setCurrentCursor = ({ selectionStart, selectionEnd }: HTMLTextAreaElement) => ({
        type,
        start: selectionStart,
        end: selectionEnd,
      });
      return { setCurrentCursor };
    })
    .reducer((state, action) => {
      let { cursor, start, end } = state;
      if (action.start !== start) {
        cursor = start = action.start;
      } else if (action.end !== end) {
        cursor = end = action.end;
      }
      return { cursor, start, end };
    }),
);

const registry = base.combine(SET_CURSOR);

export const textareaActionTypes = registry.getActionTypes();
export const textareaActionCreators = registry.getActionCreators();
export type TextareaActions = ActionsOf<typeof registry>;
export type TextareaActionsMap = ActionsMapOf<TextareaActions>;

const textarea = registry.getComposedReducer();
export default textarea;
