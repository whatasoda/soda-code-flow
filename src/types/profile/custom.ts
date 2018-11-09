import { CodeLocation } from './codeLocation';
import { ScopeProfile } from './scope';

export interface FunctionProfile {
  isArrow: boolean;
  args: CodeLocation[];
}

export interface ProgramProfile {
  code: string;
  scopes: ScopeProfile[];
}

export interface DeclarationProfile {
  id: CodeLocation;
}

export interface ThisObjectProfile {
  obj: CodeLocation;
}
