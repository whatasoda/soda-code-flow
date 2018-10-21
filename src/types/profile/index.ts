import { Node } from '@babel/traverse';
import { DeclarationProfile, FunctionProfile, ProgramProfile } from './custom';
import { ScopeProfile } from './scope';

declare module '@babel/traverse' {
  interface NodePath<T = Node> {
    profile: FlowProfile;
  }
}

export interface FlowProfile extends CustomProfiles {
  type: Node['type'];
  start: number;
  end: number;
  scopeId: ScopeProfile['id'];
}

export interface CustomProfiles {
  func?: FunctionProfile;
  program?: ProgramProfile;
  declaration?: DeclarationProfile;
}
