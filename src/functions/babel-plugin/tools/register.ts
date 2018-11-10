import { Node, NodePath } from '@babel/traverse';
import { CustomProfiles } from '../../../types/profile';
import { isTruthyPath } from '../util/path';
import getScope from './getScope';
import ToolHelper from './helper';

const register = ToolHelper((ctx, path: NodePath<Node | null>, profiles: CustomProfiles = {}) => {
  const { state } = ctx;

  if (path.isSpreadElement()) {
    path = path.get('argument');
  } else if (path.isRestElement()) {
    path = path.get('argument');
  }

  if (!isTruthyPath(path)) {
    return;
  }

  if (!path.profile) {
    const { start, end } = path.node;
    if (start === null || end === null) {
      return;
    }
    const scope = getScope(ctx, path).id;
    path.profile = { scope, loc: [start, end], ...profiles };
    state.allPath.push(path);
  } else {
    Object.assign(path.profile, profiles);
  }
});

export default register;
