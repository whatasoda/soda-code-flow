import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';

interface SetCodeContext {
  setCode: ActionCreatorsMap['flow']['setCode'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

const setCode = connect<State, SetCodeContext>(
  () => ({}),
  (dispatch) => {
    const { setCode, setStatus } = actionCreators.flow;
    return wrapAll(dispatch, { setCode, setStatus });
  },
)((ctx, textarea: HTMLTextAreaElement) => {
  ctx.setStatus('changed');
  ctx.setCode(textarea.value);
});
export const setCodeEffect = setCode.effect;

export default setCode;
