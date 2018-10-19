import { ScopeProfile } from '../babel-plugin/state';

interface CodeLocation {
  start: number;
  end: number;
}

export interface FunctionProfile {
  isArrow: boolean;
  args: Array<CodeLocation>;
}

export interface ProgramProfile {
  code: string;
  scopes: ScopeProfile[];
}

export interface DeclarationProfile {
  idLocation: CodeLocation;
}
