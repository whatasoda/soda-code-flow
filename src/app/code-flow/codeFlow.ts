import Axios from 'axios';
import register from './register';
import { FlowProfile } from '../../types/profile';
import { ProgramProfile } from '../../types/profile/custom';
import { FlowState } from './types';

export type Resolver = <T>(profile: FlowProfile, value: T) => T;

export interface EvaluatedCode {
  code: ($: Resolver) => any;
  profile: ProgramProfile;
}

const codeFlow = async (code: string) => {
  const asset = await loadCode(code);
  
  const state: FlowState = {
    code: asset.profile.code,
    identifiers: [],
    registry: [],
    values: {},
  };
  asset.code((profile, value) => register(state, profile, value));
  return state;
};

const loadCode = async (code: string) => {
  const transformed = await Axios.post( `${window.location.origin}/transform`, { code })
    .then(({ data }) => data as string);
  const evaluated: EvaluatedCode = eval(transformed);
  return evaluated;
};

export default codeFlow;
