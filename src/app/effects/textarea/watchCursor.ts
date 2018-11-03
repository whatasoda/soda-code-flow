import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface WatchCursorContext {
  isFocused: boolean;
  setCursor: ActionCreatorsMap['textarea']['setCursor'];
  setFocus: ActionCreatorsMap['textarea']['setFocus'];
}

const watchCursor = connect<State, WatchCursorContext>(
  ({ textarea: { isFocused } }) => ({ isFocused }),
  (dispatch) => {
    const { setCursor, setFocus } = actionCreators.textarea;
    return wrapAll(dispatch, { setCursor, setFocus });
  },
)((ctx, textarea: HTMLTextAreaElement | null, next?: () => void) => {
  if (textarea && textarea.getRootNode() !== textarea) {
    ctx.setCursor(textarea);
    const isFocused = document.activeElement === textarea;
    if (isFocused !== ctx.isFocused) {
      ctx.setFocus(isFocused);
    }
    const nextPhase: () => void = next || (() => watchCursor(textarea, nextPhase));
    requestAnimationFrame(nextPhase);
  }
});

export default watchCursor;
