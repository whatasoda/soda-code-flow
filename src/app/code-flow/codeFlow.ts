import Axios from 'axios';
import * as pako from 'pako';
import { FlowContent, TransformProps } from '../../types/flowContent';
import { ProgramProfile } from '../../types/profile/custom';
import createResolver, { Resolver } from './resolver/resolver';
import FlowState from './state';
import { CustomContext } from './state/state';

export interface TransformedCode {
  content: FlowContent<CustomContext>;
  base64: string;
}

export interface EvaluatedCode {
  code: ($: Resolver) => any;
  profile: ProgramProfile;
}

export type CodeFlowPayload = ReturnType<typeof codeFlow> extends Promise<infer T> ? T : never;

const codeFlow = async <TContext = any>(props: TransformProps<TContext> | string) => {
  const {
    content: { transformed, ctx },
    base64,
  } = await transform(props);

  const { code, profile } = evaluate(transformed);

  const state = new FlowState(profile, ctx);
  const resolver = createResolver(state);

  code(resolver);
  return { state, base64 };
};

const transform = async (props: TransformProps | string): Promise<TransformedCode> => {
  const base64 = typeof props === 'string' ? props : await fetchContent(props);
  const content = parse(base64);
  return { content, base64 };
};

const url = `${window.location.origin}/transform`;
const fetchContent = (props: TransformProps) => Axios.post(url, props).then(({ data }) => data as string);

const parse = (base64: string): FlowContent<CustomContext> => JSON.parse(pako.inflate(atob(base64), { to: 'string' }));

// tslint:disable-next-line:no-eval
const evaluate = (transformed: string): EvaluatedCode => eval(transformed);

export default codeFlow;
