import * as Redux from 'redux';
import combinedReducer, { State } from './reducers';

const configureStore = (initialState?: Partial<State>) => {
  const store = Redux.createStore(combinedReducer, initialState);
  return store;
};

export default configureStore;
