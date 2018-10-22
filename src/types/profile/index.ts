import { CodeLocation } from './codeLocation';
import { DeclarationProfile, FunctionProfile, ProgramProfile } from './custom';
import { ScopeProfile } from './scope';

declare module '@babel/traverse' {
  interface NodePath<T = Node> {
    profile: FlowProfile;
  }
}

export interface FlowProfile extends CustomProfiles {
  loc: CodeLocation;
  scope: ScopeProfile['id'];
}

export interface CustomProfiles {
  func?: FunctionProfile;
  prog?: ProgramProfile;
  decl?: DeclarationProfile;
}
