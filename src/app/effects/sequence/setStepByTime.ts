import { FlowState } from '../../code-flow';
import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface SetStepByTimeContext {
  flowState: FlowState | null;
  setStep: ActionCreatorsMap['flow']['setStep'];
}

const setStepByTime = connect<State, SetStepByTimeContext>(
  ({ flow: { flowState } }) => ({ flowState }),
  (dispatch) => {
    const { setStep } = actionCreators.flow;
    return wrapAll(dispatch, { setStep });
  },
)((
  { flowState, setStep },
  /**
   * @prop time normalized time(0,0 - 1.0)
   */
  time: number,
) => {
  if (!flowState) {
    return false;
  }

  const { flow } = flowState;
  const timestamp = getTimestamp(flow, time);

  const step = flow.findIndex((item) => item.timestamp >= timestamp);
  setStep(step);
});

const getTimestamp = (arr: Array<{ timestamp: number }>, time: number): number => {
  if (!arr.length) {
    return -1;
  }
  const { timestamp: start } = arr[0];
  const { timestamp: end } = arr[arr.length - 1];
  const duration = end - start;
  const timestamp = duration * time + start;
  return timestamp;
};

export default setStepByTime;
