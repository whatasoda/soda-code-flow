import { Node } from '@babel/traverse';
import { FunctionRole, ProgramRole, DeclarationRole } from './roles';
import { ScopeProfile } from '../babel-plugin/state';

declare module '@babel/traverse' {
  interface NodePath<T = Node> {
    profile: FlowProfile;
  }
}

export interface FlowProfile extends FlowRoles {
  type: Node['type'];
  start: number;
  end: number;
  scopeId: ScopeProfile['id'];
}

export interface FlowRoles {
  func?: FunctionRole;
  program?: ProgramRole;
  declaration?: DeclarationRole;
}
