import { FlowProfile } from '../../../types/profile';
import FlowState from '../state';

export type Resolver = <T>(profile: FlowProfile, value: T) => T;

const createResolver = (state: FlowState): Resolver => (profile, value) => {
  state.updateIdentifier(profile, value);
  state.updateValue(profile.loc, value);
  state.pushFlow(profile.loc, value);

  if (typeof value === 'function') {
    const func: (...args: any[]) => any = value as any;
    const thisArg = state.getThisArg(profile.loc);

    const wrapped = function(this: any, ...args: any[]) {
      if (profile.func) {
        profile.func.args.forEach((arg, i) => state.pushFlow(arg, args[i]));
      }

      const result = func.apply(this || thisArg || undefined, args);

      if (profile.func) {
        state.pushFlow(profile.loc, result);
      }
      return result;
    };

    value = wrapped as any;
  }

  return value;
};

export default createResolver;
