import { NodePath } from '@babel/traverse';
import generate from '@babel/generator';
import { parse } from '@babel/core';
import { genObjNode } from '../util/genObjNode';
import ToolHelper from './helper';

const apply = ToolHelper((
  {state, types: t},
) => {
  state.allPath.slice().sort(pathSorter).forEach((path) => {
    if (path.node.type === 'Program') {
      const content = [
        `code: ${state.stepCallee} => {${generate(path.node).code}},`,
        `profile: ${JSON.stringify(path.profile.program)}`,
      ];
      const ast = parse(`({${content.join('')}})`);
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
});

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


export default apply;
