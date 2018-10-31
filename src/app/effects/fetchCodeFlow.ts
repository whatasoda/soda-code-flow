import codeFlow, { CustomContext } from '../code-flow';
import { ActionCreatorsMap } from '../store';
import { EffectContext } from './types';

export interface FetchCodeFlowProps {
  code: string;
  watch: string[];
  assignCodeFlow: ActionCreatorsMap['flow']['assignCodeFlow'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

const fetchCodeFlow = async ({ props }: EffectContext<FetchCodeFlowProps>) => {
  const { code, watch, assignCodeFlow, setStatus } = props;
  setStatus('fetching');
  const codeFlowPayload = await codeFlow<CustomContext>({
    source: code,
    ctx: { watch },
  });
  assignCodeFlow(codeFlowPayload);
  setStatus('ready');
};

export default fetchCodeFlow;
