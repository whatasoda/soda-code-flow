import * as React from 'react';
import { Provider } from 'react-redux';
import Layout from './components/templates/Layout/Layout';
import { EffectRoot } from './effects/connect';
import configureStore, { actionCreators } from './store';

const store = configureStore();
store.dispatch(
  actionCreators.flow.setCode(`const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const upper = lower.map((char) => char.charCodeAt());
for (let i=0; i<10; i++) {
  console.log(i**i);
}
`),
);

const App = () => (
  <Provider store={store}>
    <React.Fragment>
      <EffectRoot />
      <Layout />
    </React.Fragment>
  </Provider>
);

export default App;
