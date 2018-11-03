import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Layout from './components/templates/Layout/Layout';
import { enhancers } from './effects';
import EffectRedux from './lib/effect-redux';
import configureStore, { actionCreators } from './store';

const store = configureStore();
store.dispatch(
  actionCreators.flow.setCode(`const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const upper = lower.map((char) => (lower.reverse(),char.charCodeAt()));
for (let i=0; i<10; i++) {
  console.log(i**i);
}
`),
);
store.dispatch(actionCreators.flow.insertSnapshotTarget(0));
store.dispatch(
  actionCreators.flow.updateSnapshotTarget(0, {
    key: 'lower',
  }),
);

EffectRedux.Provider(store)(enhancers);

const App = () => (
  <ReactRedux.Provider store={store}>
    <Layout />
  </ReactRedux.Provider>
);

export default App;
