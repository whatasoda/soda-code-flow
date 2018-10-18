import { ScopeProfile } from '../babel-plugin/state';

interface Loc {
  start: number;
  end: number;
}

export interface FunctionRole {
  isArrow: boolean;
  args: Array<Loc>;
}

export interface ProgramRole {
  code: string;
  scopes: ScopeProfile[];
}

export interface DeclarationRole {
  id: Loc;
}
