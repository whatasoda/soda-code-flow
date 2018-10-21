import { NodePath, Node } from '@babel/traverse';
import { ScopeProfile } from '../../types/profile/scope';

export interface CodeState {
  stepCallee: string;
  allPath: Array<NodePath<Node>>;
  scopes: Array<ScopeProfile>;
}

