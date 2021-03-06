import { FlowProfile } from '../../../types/profile';
import FlowState from '../state';
import { findWindowEntry } from '../state/windowEntires';

export type Resolver = (profile: FlowProfile, value: unknown) => typeof value;

const createResolver = (state: FlowState): Resolver => (profile, value) => {
  state.updateIdentifier(profile, value);
  state.updateValue(profile.loc, value);
  state.pushFlow(profile, value);

  if (typeof value === 'function') {
    const func = value;

    const entry = findWindowEntry(func);
    if (entry) {
      return value;
    }

    const thisArg = state.getThisArg(profile);

    if (thisArg !== null && thisArg !== undefined) {
      return function(this: any, ...args: any[]) {
        return func.apply(this || thisArg || undefined, args);
      };
    }
  }

  return value;
};

export default createResolver;
