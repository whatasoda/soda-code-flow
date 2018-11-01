import codeFlow, { CustomContext } from '../../code-flow';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';

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
