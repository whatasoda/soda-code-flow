import fetchCodeFlow from './codeFlow/fetchCodeFlow';
import sequence from './sequence/sequence';
import toggleRunning from './sequence/toggleRunning';
import tweakStep from './sequence/tweakStep';
import setColor from './snapshot/setColor';
import setKey from './snapshot/setKey';
import setCode from './textarea/setCode';
import watchCursor from './textarea/watchCursor';

const effects = {
  fetchCodeFlow,
  sequence,
  toggleRunning,
  tweakStep,
  setCode,
  watchCursor,
  setColor,
  setKey,
};
export const enhancers = (Object.keys(effects) as Array<keyof typeof effects>).map((key) => effects[key].enhancer);

export default effects;
