import { Node } from '@babel/traverse';
import { FunctionRole, ProgramRole, DeclarationRole } from './roles';

declare module '@babel/traverse' {
  interface NodePath<T = Node> {
    profile: FlowProfile;
  }
}

export interface FlowProfile {
  type: Node['type'];
  start: number;
  end: number;
  roles: FlowRoles;
}

export interface FlowRoles {
  func?: FunctionRole;
  program?: ProgramRole;
  declaration?: DeclarationRole;
}
