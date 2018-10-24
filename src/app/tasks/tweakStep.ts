import { ActionCreatorsMap } from '../store';
import { TaskContext } from './types';

export interface TweakStepProps {
  step: number;
  lifespan: number;
  setStep: ActionCreatorsMap['flow']['setStep'];
}

const tweakStep = ({ props }: TaskContext<TweakStepProps>, change: number): number => {
  const { step, lifespan, setStep } = props;
  change = Math.sign(change) * Math.min(Math.abs(change), lifespan);

  let next: number = step + Math.min(change, lifespan);
  if (next === -1 || next === lifespan + 1) {
    next = -1;
  } else if (next < -1) {
    next += lifespan + 1;
  } else if (next > lifespan + 1) {
    next -= lifespan + 1;
  }
  setStep(next);
  return next;
};

export default tweakStep;
