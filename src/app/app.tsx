import * as React from 'react';
import { Provider } from 'react-redux';
import SequencerContainer from './container/SequencerContainer';
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
    <SequencerContainer />
  </Provider>
);

export default App;
