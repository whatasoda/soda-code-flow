import codeFlow, { CustomContext } from '../../code-flow';
import { SnapshotTarget } from '../../code-flow/state/state';
import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface FetchCodeFlowContext {
  code: string;
  snapshotTargets: SnapshotTarget[];
  assignCodeFlow: ActionCreatorsMap['flow']['assignCodeFlow'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

const fetchCodeFlow = connect<State, FetchCodeFlowContext>(
  ({ flow: { code, snapshotTargets } }) => ({ code, snapshotTargets }),
  (dispatch) => {
    const { assignCodeFlow, setStatus } = actionCreators.flow;
    return wrapAll(dispatch, { assignCodeFlow, setStatus });
  },
)(async ({ code, snapshotTargets, assignCodeFlow, setStatus }) => {
  setStatus('fetching');
  const codeFlowPayload = await codeFlow<CustomContext>({
    source: code,
    ctx: { snapshotTargets },
  });
  assignCodeFlow(codeFlowPayload);
  setStatus('ready');
});

export default fetchCodeFlow;
