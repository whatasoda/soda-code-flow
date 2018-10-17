import * as Babel from '@babel/core';
import genTools from './tools';
import { CodeState } from '../types/babel-plugin/state';


const plugin = ({ types }: typeof Babel): Babel.PluginObj => {
  const state: CodeState = {
    stepCallee: '$',
    allPath: [],
    visited: false,
  };
  const tools = genTools(state, types);
  
  return {
    visitor: {
      Program(path) {
        tools.register(path, { program: { code: path.hub.file.code } });
      },
      
      ArrowFunctionExpression(path) {
        tools.register(path, {
          func: {
            isArrow: true,
            args: path.node.params
              .map(({ start, end }) => [start || 0, end || 0])
              .map(([start, end]) => ({ start, end })),
          },
        });
      },
      
      VariableDeclaration(path) {
        path.get('declarations')
          .forEach(declaration => {
            const init = declaration.get('init');
            const { id } = declaration.node;
            const start = id.start || 0;
            const end = id.end || 0;
            tools.register(init, { declaration: { id: { start, end } } });
          });
      },
      
      MemberExpression(path) {
        tools.register(path);
        tools.register(path.get('object'));
      },
      
      CallExpression(path) {
        tools.register(path);
        path.get('arguments').forEach(arg =>
          tools.register(arg)
        );
      },
      
    },
    post() {
      tools.apply();
    },
  };
};

export default plugin;
