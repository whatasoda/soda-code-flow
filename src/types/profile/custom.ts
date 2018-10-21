import { ScopeProfile } from './scope';

interface CodeLocation {
  start: number;
  end: number;
}

export interface FunctionProfile {
  isArrow: boolean;
  args: CodeLocation[];
}

export interface ProgramProfile {
  code: string;
  scopes: ScopeProfile[];
}

export interface DeclarationProfile {
  idLocation: CodeLocation;
}
