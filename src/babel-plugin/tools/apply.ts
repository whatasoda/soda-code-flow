import { ToolGenerator } from '../../types/babel-plugin/state';
import { NodePath } from '@babel/traverse';
import generate from '@babel/generator';
import { parse } from '@babel/core';
import { genObjNode } from '../util/genObjNode';

export type Apply = () => void;

const genApply: ToolGenerator<Apply> = (state, t) => () => {
  state.visited = true;
  state.allPath.slice().sort(pathSorter).forEach((path) => {
    if (path.node.type === 'Program') {
      const ast = parse([
        'module.exports = {',
        `code: ${state.stepCallee} => {${generate(path.node).code}},`,
        `role: ${JSON.stringify(path.profile.roles.program)}`,
        '}',
      ].join(''));
      return ast && t.isFile(ast) ? path.replaceWith(ast.program) : null;
    };
    
    const { node } = path;
    const profileNode = genObjNode(t, path.profile);
    if (!(t.isExpression(node) || t.isSpreadElement(node)) || !profileNode) {
      return;
    }
    
    path.replaceWith(
      t.callExpression(
        t.identifier(state.stepCallee),
        [profileNode, node],
      )
    );
  });
};

const pathSorter = (a: NodePath<any>, b: NodePath<any>): number => {
  const aStart = a.profile.start;
  const aEnd = a.profile.end;
  const bStart = b.profile.start;
  const bEnd = b.profile.end;
  
  return (
    aStart <= bStart && aEnd >= bEnd ? 1 :
    aStart >= bStart && aEnd <= bEnd ? -1 : aStart - bStart
  );
};


export default genApply;
