import { CodeState } from '../../types/babel-plugin/state';

const reset = (state: CodeState) => {
  state.allPath.length = 0;
  state.scopes.length = 0;
};

export default reset;
