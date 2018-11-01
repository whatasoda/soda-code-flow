import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';

interface WatchCursorContext {
  isFocused: boolean;
  setCursor: ActionCreatorsMap['textarea']['setCursor'];
  setFocus: ActionCreatorsMap['textarea']['setFocus'];
}
interface WatchCursorState {
  ctx: WatchCursorContext;
  textarea: HTMLTextAreaElement | null;
}
const state: WatchCursorState = {
  ctx: {} as any,
  textarea: null,
};

const watchCursor = connect<State, WatchCursorContext>(
  ({ textarea: { isFocused } }) => ({ isFocused }),
  (dispatch) => {
    const { setCursor, setFocus } = actionCreators.textarea;
    return wrapAll(dispatch, { setCursor, setFocus });
  },
  (ctx) => (state.ctx = ctx),
)((_, textarea: HTMLTextAreaElement | null) => {
  if (textarea !== state.textarea) {
    const prev = state.textarea;
    state.textarea = textarea;
    if (textarea && !prev) {
      watch();
    }
  }
});

const watch = () => {
  if (state.textarea) {
    state.ctx.setCursor(state.textarea);
    const isFocused = document.activeElement === state.textarea;
    if (isFocused !== state.ctx.isFocused) {
      state.ctx.setFocus(isFocused);
    }
    requestAnimationFrame(watch);
  }
};

export default watchCursor;
