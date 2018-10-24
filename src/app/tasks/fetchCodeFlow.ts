import codeFlow, { CustomContext } from '../code-flow';
import { ActionCreatorsMap } from '../store';
import { TaskContext } from './types';

export interface FetchCodeFlowProps {
  code: string;
  watch: string[];
  assignCodeFlow: ActionCreatorsMap['flow']['assignCodeFlow'];
}

const fetchCodeFlow = async ({ props }: TaskContext<FetchCodeFlowProps>) => {
  const { code, watch, assignCodeFlow } = props;
  const codeFlowPayload = await codeFlow<CustomContext>({
    source: code,
    ctx: { watch },
  });
  assignCodeFlow(codeFlowPayload);
};

export default fetchCodeFlow;
