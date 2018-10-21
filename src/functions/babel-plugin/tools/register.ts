import { Node, NodePath } from '@babel/traverse';
import { CustomProfiles } from '../../../types/profile';
import { isTruthyPath } from '../util/path';
import getScope from './getScope';
import ToolHelper from './helper';

const register = ToolHelper((ctx, path: NodePath<Node | null>, profiles: CustomProfiles = {}) => {
  const { state } = ctx;
  if (!isTruthyPath(path)) {
    return;
  }

  if (!path.profile) {
    const { type, start, end } = path.node;
    if (start === null || end === null) {
      return;
    }
    const scopeId = getScope(ctx, path).id;
    path.profile = { type, start, end, scopeId, ...profiles };
    state.allPath.push(path);
  } else {
    Object.assign(path.profile, profiles);
  }
});

export default register;