import { NodePath, Node } from '@babel/traverse';
import { FlowRoles } from '../../types/profile';
import { isTruthyPath } from '../util/path';
import ToolHelper from './helper';
import getScope from './getScope';

const register = ToolHelper((
  ctx,
  path: NodePath<Node | null>,
  roles: FlowRoles = {}
) => {
  const { state } = ctx;
  if (state.visited) return;
  if (!isTruthyPath(path)) {
    return;
  }
  
  if (!path.profile) {
    const { type, start, end } = path.node;
    if (start === null || end === null) return;
    const scopeId = getScope(ctx, path).id;
    path.profile = { type, start, end, scopeId, ...roles };
    state.allPath.push(path);
  } else {
    Object.assign(path.profile, roles);
  }
});

export default register;
