import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import { getBarStatus } from '../util/sequenceBar';
import sequence from './sequence';

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
  const nextStatus = isRunning ? 'ready' : 'running';
  setStatus(nextStatus);
  if (nextStatus === 'running') {
    sequence();
  }
});

export default toggleRunning;
