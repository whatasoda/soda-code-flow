import { NodePath, Node } from '@babel/traverse';
import { FlowRoles } from '../../types/profile';
import { ToolGenerator } from '../../types/babel-plugin/state';
import { isNotNullPath } from '../util/path';

export type Register = <TNode extends Node>(path: NodePath<TNode | null>, roles?: FlowRoles) => void;

const genRegister: ToolGenerator<Register> = (state) => (path, roles = {}) => {
  if (state.visited) return;
  if (!isNotNullPath(path)) {
    return;
  }
  
  if (!path.profile) {
    const { type, start, end } = path.node;
    if (start === null || end === null) return;
    path.profile = { type, start, end, roles: {} };
    state.allPath.push(path);
  }
  
  Object.assign(path.profile.roles, roles);
};

export default genRegister;
