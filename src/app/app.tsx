import * as React from 'react';
import { Provider } from 'react-redux';
import Layout from './components/templates/Layout/Layout';
import { enhancers } from './effects';
import { provideAll } from './effects/connect';
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
store.dispatch(actionCreators.flow.insertWatchTarget(0));
store.dispatch(actionCreators.flow.setWatchTargetName(0, 'lower'));

provideAll(store, enhancers);

const App = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

export default App;
