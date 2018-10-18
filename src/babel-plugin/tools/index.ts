import register from './register';
import apply from './apply';
import getScope from './getScope';

export type Tools = typeof Tools;
const Tools = { apply, register, getScope };

export default Tools;
