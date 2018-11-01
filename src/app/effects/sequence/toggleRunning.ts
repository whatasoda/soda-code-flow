import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';
import { getBarStatus } from '../util/sequenceBar';

interface ToggleRunningContext {
  status: State['flow']['status'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

const toggleRunning = connect<State, ToggleRunningContext>(
  ({ flow: { status } }) => ({ status }),
  (dispatch) => {
    const { setStatus } = actionCreators.flow;
    return wrapAll(dispatch, { setStatus });
  },
)(({ status, setStatus }) => {
  const { isAvailable, isRunning } = getBarStatus(status);
  if (!isAvailable) {
    return;
  }
  setStatus(isRunning ? 'ready' : 'running');
});

export const toggleRunningEffect = toggleRunning.effect;

export default toggleRunning;
