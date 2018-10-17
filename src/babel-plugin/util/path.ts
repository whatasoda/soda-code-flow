import { NodePath, Node } from '@babel/traverse';

export const isNotNullPath = <TNode extends Node>(path: NodePath<TNode | null>): path is NodePath<TNode> => !!path.node;
