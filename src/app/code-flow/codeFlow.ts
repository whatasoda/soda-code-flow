import Axios from 'axios';
import { ProgramProfile } from '../../types/profile/custom';
import createResolver, { Resolver } from './resolver/resolver';
import FlowState from './state';

export interface EvaluatedCode {
  code: ($: Resolver) => any;
  profile: ProgramProfile;
}

const codeFlow = async (source: string) => {
  const { profile, code } = await loadCode(source);

  const state = new FlowState(profile);
  const resolver = createResolver(state);

  code(resolver);
  return state;
};

const loadCode = async (code: string): Promise<EvaluatedCode> => {
  const transformed = await Axios.post(`${window.location.origin}/transform`, { code }).then(
    ({ data }) => data as string,
  );
  // tslint:disable-next-line:no-eval
  return eval(transformed);
};

export default codeFlow;
