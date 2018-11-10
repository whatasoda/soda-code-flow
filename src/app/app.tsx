import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Layout from './components/templates/Layout/Layout';
import { enhancers } from './effects';
import EffectRedux from './lib/effect-redux';
import configureStore, { actionCreators } from './store';

const store = configureStore();
store.dispatch(
  //   actionCreators.flow.setCode(`const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  // const upper = lower.map((char) => (lower.reverse(),char.charCodeAt()));
  // for (let i=0; i<10; i++) {
  //   console.log(i**i);
  // }
  // `),
  actionCreators.flow.setCode(`const sources = [{
  name: 'root',
  children: [
    {
      name: 'child-1',
      children: [
        {
          name: 'grandchild-1-1',
          children: [],
        },
        {
          name: 'grandchild-1-2',
          children: [],
        },
      ],
    },
    {
      name: 'child-3',
      children: [],
    },
    {
      name: 'child-2',
      children: [
        {
          name: 'grandchild-2-1',
          children: [],
        },
        {
          name: 'grandchild-2-2',
          children: [],
        },
        {
          name: 'grandchild-2-3',
          children: [],
        },
      ],
    }
  ],
}];
const layers = [];

let next = sources;
let curr = [];
while (next.length) {
  const layer = [];
  curr = next;
  next = [];
  curr.forEach(({ name, children }) => {
    next.push(...children);
    const segment = { name, childCount: children.length };
    layer.push(segment);
  });
  layers.push(layer);
}

let nextLayer = [];
while (layers.length) {
  const layer = layers.pop();
  if (!layer) {
    continue;
  }
  const prevLayer = nextLayer.slice();
  nextLayer = layer.map(({ name, childCount }) => {
    const children = prevLayer.splice(0, childCount);
    return { name, children };
  });
}
console.log(nextLayer);`),
);

let i = 0;
const add = (key: string | null, color: string) => {
  store.dispatch(actionCreators.flow.insertSnapshotTarget(i));
  store.dispatch(actionCreators.flow.updateSnapshotTarget(i, { key, color }));
  i++;
};

add(null, '#0ff');
add('layers', '#f00');
add('next', '#0f0');
add('curr', '#00f');
add('nextLayer', '#fff');

store.dispatch(actionCreators.flow.updateInterval(100));

EffectRedux.Provider(store)(enhancers);

const App = () => (
  <ReactRedux.Provider store={store}>
    <Layout />
  </ReactRedux.Provider>
);

export default App;
