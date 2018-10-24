import { ActionCreatorsMap, State } from '../store';
import tweakStep from './tweakStep';
import { TaskContext } from './types';

export interface SequenceProps {
  status: State['flow']['status'];
  interval: number;
  step: number;
  lifespan: number;
  loop: boolean;
  setStep: ActionCreatorsMap['flow']['setStep'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}

export interface SequenceState {
  alive: boolean;
}

const startSequence = (component: TaskContext<SequenceProps, SequenceState>) => {
  const sequence = () => {
    // to support change of objects themselves,
    // require to do destructuring assignment here
    const { props, state } = component;
    if (!state.alive) {
      return;
    }

    const { status, interval } = props;
    let running = false;
    try {
      if (status === 'running') {
        const { loop, setStatus } = props;
        const next = tweakStep(component, 1);

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

  sequence();
};

export default startSequence;
