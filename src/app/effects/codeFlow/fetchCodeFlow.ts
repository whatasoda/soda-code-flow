import codeFlow, { CustomContext } from '../../code-flow';
import { SnapshotTarget } from '../../code-flow/state/state';
import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import { setCodeIntoUrl } from '../../util/codeOnUrl';
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
)(async ({ code, snapshotTargets, assignCodeFlow, setStatus }, base64?: string) => {
  setStatus('fetching');
  const props = {
    source: code,
    ctx: { snapshotTargets },
  };
  try {
    const codeFlowPayload = await codeFlow<CustomContext>(base64 || props);
    assignCodeFlow(codeFlowPayload);
    if (codeFlowPayload.base64 !== base64) {
      setCodeIntoUrl(codeFlowPayload.base64);
    }
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
    setCodeIntoUrl(null);
  }
  setStatus('ready');
});

export default fetchCodeFlow;
