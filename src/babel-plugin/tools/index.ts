import { ToolGenerator } from '../../types/babel-plugin/state';
import genRegister, { Register } from './register';
import genApply, { Apply } from './apply';

export interface Tools {
  apply: Apply;
  register: Register;
}

const genTools: ToolGenerator<Tools> = (state, t) => ({
  apply: genApply(state, t),
  register: genRegister(state, t),
});

export default genTools;
