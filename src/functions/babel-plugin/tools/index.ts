import apply from './apply';
import getScope from './getScope';
import register from './register';

export type Tools = typeof Tools;
const Tools = { apply, register, getScope };

export default Tools;
