import { Resolver } from '../../../step';
import { ProgramRole } from '../../../profile/roles';

declare module '*.asset.js' {
  export = asset;
  
  const asset: {
    code: ($: Resolver) => any;
    role: ProgramRole;
  };
}
