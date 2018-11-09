import * as Babel from '@babel/core';
import { CodeLocation } from '../../types/profile/codeLocation';
import Tools from './tools';
import { CodeState } from './types';
import reset from './util/reset';

const plugin = ({ types }: typeof Babel): Babel.PluginObj => {
  const state: CodeState = {
    stepCallee: '$',
    allPath: [],
    scopes: [],
  };
  const ctx = { state, types };

  return {
    visitor: {
      Program(path) {
        reset(state);
        Tools.register(ctx, path, {
          prog: {
            code: path.hub.file.code,
            scopes: state.scopes,
          },
        });
      },

      ArrowFunctionExpression(path) {
        Tools.register(ctx, path, {
          func: {
            isArrow: true,
            args: path.node.params.map<CodeLocation>(({ start, end }) => [start || 0, end || 0]),
          },
        });
      },

      VariableDeclaration(path) {
        path.get('declarations').forEach((declaration) => {
          const init = declaration.get('init');
          const {
            id: { start, end },
          } = declaration.node;
          Tools.register(ctx, init, {
            decl: { id: [start || 0, end || 0] },
          });
        });
      },

      MemberExpression(path) {
        const objPath = path.get('object');
        const { start, end } = objPath.node;
        Tools.register(ctx, path, {
          tobj: { obj: [start || 0, end || 0] },
        });
        Tools.register(ctx, objPath);
      },

      CallExpression(path) {
        Tools.register(ctx, path);
        path.get('arguments').forEach((arg) => Tools.register(ctx, arg));
      },
    },
    post() {
      Tools.apply(ctx);
    },
  };
};

export default plugin;
