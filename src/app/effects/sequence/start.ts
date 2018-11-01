import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';
import { tweakEffect } from './tweak';

interface SequenceContext {
  status: State['flow']['status'];
  interval: number;
  step: number;
  lifespan: number;
  loop: boolean;
  setStep: ActionCreatorsMap['flow']['setStep'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

interface SequenceState {
  alive: boolean;
  ctx: SequenceContext;
}

const state: SequenceState = {
  alive: false,
  ctx: {} as any,
};

const handleSequence = connect<State, SequenceContext>(
  ({ flow: { status, interval, step, lifespan, loop } }) => ({ status, interval, step, lifespan, loop }),
  (dispatch) => {
    const { setStep, setStatus } = actionCreators.flow;
    return wrapAll(dispatch, { setStep, setStatus });
  },
  (ctx) => (state.ctx = ctx),
)((_, alive: boolean) => {
  if (alive !== state.alive) {
    state.alive = alive;
    if (alive) {
      sequence();
    }
  }
});

const sequence = () => {
  if (!state.alive) {
    return;
  }

  const { status, interval, loop, setStatus } = state.ctx;
  let running = false;
  try {
    if (status === 'running') {
      const next = tweakEffect(state.ctx, 1);

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
  } else {
    requestAnimationFrame(sequence);
  }
};

export default handleSequence;
