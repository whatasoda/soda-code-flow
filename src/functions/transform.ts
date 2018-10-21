import * as Babel from '@babel/core';
import plugin from './babel-plugin';
import { TransformProps } from './types';

const opitons: Babel.TransformOptions = {
  plugins: [plugin(Babel)],
};

export const transform = async (code: string) => {
  const result = await Babel.transformAsync(code, opitons);

  return result && result.code ? result.code : null;
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
    const params: TransformProps = req.body;
    if (params.code) {
      const result = await transform(params.code);
      if (result) {
        const body = result;
        const status = 200;
        return { body, status };
      }
    }
  }
  const body = 'bad request';
  const status = 400;
  return { body, status };
};
