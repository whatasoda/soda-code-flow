import { Node, NodePath } from '@babel/traverse';

export const isTruthyPath = <TNode extends Node>(path: NodePath<TNode | null>): path is NodePath<TNode> => !!path.node;
