import * as Babel from '@babel/core';
import * as pako from 'pako';
import * as uglify from 'uglify-es';
import { FlowContent, TransformProps } from '../types/flowContent';
import plugin from './babel-plugin';

const opitons: Babel.TransformOptions = {
  plugins: [plugin(Babel)],
};

const prefix = 'const _=';
export const transform = async (source: string) => {
  const babelResult = await Babel.transformAsync(source, opitons);

  if (!(babelResult && babelResult.code)) {
    return null;
  }
  const transformed = babelResult.code;
  const uglifyResult = uglify.minify(prefix + transformed);
  const minified = uglifyResult.code.slice(prefix.length, -1);

  return `(${minified})`;
};

interface TransformReqest {
  body?: TransformProps;
}

interface TransformPayload {
  body: string;
  status: number;
}

export const resolveTransform = async (req: TransformReqest): Promise<TransformPayload> => {
  if (req.body) {
    const { source, ctx }: TransformProps = req.body;
    if (source) {
      const transformed = await transform(source);
      if (transformed) {
        const body = format({ transformed, ctx });
        const status = 200;
        return { body, status };
      }
    }
  }
  const body = 'bad request';
  const status = 400;
  return { body, status };
};

const format = (content: FlowContent<any>) => {
  const deflated = pako.deflate(JSON.stringify(content), { to: 'string' });
  const base64 = Buffer.from(deflated, 'binary').toString('base64');
  return base64;
};
