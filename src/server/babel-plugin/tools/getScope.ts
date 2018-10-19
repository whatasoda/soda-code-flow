import { CodeState, ScopeProfile } from '../../../types/babel-plugin/state';
import { NodePath, Scope } from '@babel/traverse';
import ToolHelper from './helper';

const getScope = ToolHelper((
  { state },
  { scope }: NodePath<any>
) => {
  registerScope(state, scope);
  return state.scopes.find(Finder(scope)) || state.scopes[0];
});

const registerScope = (state: CodeState, scope: Scope) => {
  const stack: Scope[] = [];
  let next: Scope = scope;
  while (next && !state.scopes.some(Finder(next))) {
    stack.push(next);
    next = next.parent;
  }
  
  while (stack.length) {
    const scope = stack.pop();
    if (!scope) {
      continue;
    }
    const id = state.scopes.length;
    const token = tokenize(scope);
    const parent = state.scopes.findIndex(Finder(scope.parent));
    const bindings = Object.keys(scope.bindings);
    state.scopes.push({ id, token, parent, bindings });
  }
};

const Finder = (scope: Scope) => (state: ScopeProfile) => (state.token === tokenize(scope));
const tokenize = (scope: Scope) => `${scope.block.start}-${scope.block.end}`;

export default getScope;
