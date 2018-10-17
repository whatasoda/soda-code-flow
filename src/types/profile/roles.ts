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
}

export interface DeclarationRole {
  id: Loc;
}
