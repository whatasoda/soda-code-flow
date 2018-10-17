import * as Babel from '@babel/core';

import { NodePath, Node } from '@babel/traverse';

export interface CodeState {
  stepCallee: string;
  visited: boolean;
  allPath: Array<NodePath<Node>>;
}

export type ToolGenerator<T> = (state: CodeState, types: typeof Babel.types) => T;
