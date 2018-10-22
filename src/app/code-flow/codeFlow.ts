import Axios from 'axios';
import { ProgramProfile } from '../../types/profile/custom';
import createResolver, { Resolver } from './resolver/resolver';
import FlowState from './state';
import { CustomContext } from './state/state';

export interface TransformedCode {
  content: {
    transformed: string;
    ctx: CustomContext;
  };
  base64: string;
}

export interface EvaluatedCode {
  code: ($: Resolver) => any;
  profile: ProgramProfile;
}

const codeFlow = async (source: string, ctx: CustomContext) => {
  const {
    content: { transformed },
  } = await transform(source, ctx);
  const { code, profile } = evaluate(transformed);

  const state = new FlowState(profile, ctx);
  const resolver = createResolver(state);

  code(resolver);
  return state;
};

const url = `${window.location.origin}/transform`;
const transform = async (source: string, ctx: CustomContext): Promise<TransformedCode> => {
  const transformed = await Axios.post(url, { code: source }).then(({ data }) => data as string);

  return {
    content: { transformed, ctx },
    base64: '',
  };
};

// tslint:disable-next-line:no-eval
const evaluate = (transformed: string): EvaluatedCode => eval(transformed);

export default codeFlow;
