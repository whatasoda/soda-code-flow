import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';
import tweakStep from './tweakStep';

interface SequenceContext {
  status: State['flow']['status'];
  interval: number;
  loop: boolean;
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

const sequence = connect<State, SequenceContext>(
  ({ flow: { status, interval, loop } }) => ({ status, interval, loop }),
  (dispatch) => {
    const { setStatus } = actionCreators.flow;
    return wrapAll(dispatch, { setStatus });
  },
)((ctx) => {
  const { status, interval, loop, setStatus } = ctx;
  let running = false;
  try {
    if (status === 'running') {
      const next = tweakStep(1);
      if (next === -1 && !loop) {
        setStatus('ready');
      } else {
        running = true;
      }
    }
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  if (running) {
    setTimeout(sequence, interval);
  }
});

export default sequence;
