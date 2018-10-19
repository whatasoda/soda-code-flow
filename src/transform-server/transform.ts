import * as Babel from '@babel/core';
import * as path from 'path';

const opitons: Babel.TransformOptions = {
  plugins: [path.resolve(__dirname, '../babel-plugin')],
};

export const transform = async (code: string) => {
  const result = await Babel.transformAsync(code, opitons);
  
  return result && result.code ? result.code : null;
}
