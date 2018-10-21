import * as Babel from '@babel/core';
import { parse } from '@babel/parser';
import { ObjectExpression } from '@babel/types';

export const genObjNode = (t: typeof Babel.types, obj: object): ObjectExpression | null => {
  const ast = parse(`(${JSON.stringify(obj)})`);
  if (!(ast && t.isFile(ast))) {
    return null;
  }

  const stmt = ast.program.body[0];
  const objNode = t.isExpressionStatement(stmt) && t.isObjectExpression(stmt.expression) ? stmt.expression : null;
  return objNode;
};
