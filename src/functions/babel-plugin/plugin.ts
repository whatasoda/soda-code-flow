import * as Babel from '@babel/core';
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
          program: {
            code: path.hub.file.code,
            scopes: state.scopes,
          },
        });
      },

      ArrowFunctionExpression(path) {
        Tools.register(ctx, path, {
          func: {
            isArrow: true,
            args: path.node.params
              .map(({ start, end }) => [start || 0, end || 0])
              .map(([start, end]) => ({ start, end })),
          },
        });
      },

      VariableDeclaration(path) {
        path.get('declarations').forEach((declaration) => {
          const init = declaration.get('init');
          const { id } = declaration.node;
          const start = id.start || 0;
          const end = id.end || 0;
          Tools.register(ctx, init, {
            declaration: { idLocation: { start, end } },
          });
        });
      },

      MemberExpression(path) {
        Tools.register(ctx, path);
        Tools.register(ctx, path.get('object'));
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
