import codeFlow, { CustomContext } from '../../code-flow';
import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface FetchCodeFlowContext {
  code: string;
  watch: string[];
  assignCodeFlow: ActionCreatorsMap['flow']['assignCodeFlow'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

const fetchCodeFlow = connect<State, FetchCodeFlowContext>(
  ({ flow: { code, watch } }) => ({ code, watch }),
  (dispatch) => {
    const { assignCodeFlow, setStatus } = actionCreators.flow;
    return wrapAll(dispatch, { assignCodeFlow, setStatus });
  },
)(async ({ code, watch, assignCodeFlow, setStatus }) => {
  setStatus('fetching');
  const codeFlowPayload = await codeFlow<CustomContext>({
    source: code,
    ctx: { watch },
  });
  assignCodeFlow(codeFlowPayload);
  setStatus('ready');
});

export default fetchCodeFlow;
