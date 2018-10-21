import { NodePath, Node } from '@babel/traverse';

export interface CodeState {
  stepCallee: string;
  allPath: Array<NodePath<Node>>;
  scopes: Array<ScopeProfile>;
}

export interface ScopeProfile {
  id: number;
  token: string;
  parent: number;
  bindings: string[];
}
