import { FlowState } from '../../types/code-flow/state';
import { FlowProfile } from '../../types/profile';
import { isIdentifierCode, getThisArgCode } from '../util/identifier';

const register = <T>(state: FlowState, profile: FlowProfile, value: T): T => {
  state.registry.push({ profile, value });
  
  const code = state.code.slice(profile.start, profile.end);
  state.values[code] = value;
  if (isIdentifierCode(code)) {
    state.identifiers
  }
  
  if (typeof value === 'function') {
    const funcVal: Function = value;
    const thisArgCode = getThisArgCode(code);
    const thisArg = thisArgCode ? state.values[thisArgCode] : null;
    
    const wrapped = function (this: any, ...args: any[]) {
      state.registry.push({ profile, value: args });
      const result = funcVal.apply(this || thisArg || undefined, args);
      state.registry.push({ profile, value: result });
      return result;
    };
    
    value = wrapped as any;
  }
  
  return value;
};

export default register;
