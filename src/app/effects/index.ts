import fetchCodeFlow from './codeFlow/fetchCodeFlow';
import sequence from './sequence/sequence';
import toggleRunning from './sequence/toggleRunning';
import tweakStep from './sequence/tweakStep';
import setColor from './snapshot/setColor';
import setDescription from './snapshot/setDescription';
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
  setDescription,
};
export const enhancers = Object.values(effects).map((effect) => effect.enhancer);

export default effects;
