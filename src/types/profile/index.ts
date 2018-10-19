import { Node } from '@babel/traverse';
import { FunctionProfile, ProgramProfile, DeclarationProfile } from './customProfiles';
import { ScopeProfile } from '../babel-plugin/state';

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
