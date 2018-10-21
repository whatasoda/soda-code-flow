import * as Babel from '@babel/core';
import { CodeState } from '../types';

export interface ToolContext {
  state: CodeState;
  types: typeof Babel.types;
}
type ToolFunc = (ctx: ToolContext, ...args: any[]) => any;
export const ToolHelper = <TFunc extends ToolFunc>(tool: TFunc): TFunc => tool;

export default ToolHelper;
