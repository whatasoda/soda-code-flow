import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import connect from '../connect';

interface TweakStepContext {
  step: number;
  lifespan: number;
  setStep: ActionCreatorsMap['flow']['setStep'];
}

const tweakStep = connect<State, TweakStepContext>(
  ({ flow: { step, lifespan } }) => ({ step, lifespan }),
  (dispatch) => {
    const { setStep } = actionCreators.flow;
    return wrapAll(dispatch, { setStep });
  },
)(
  ({ step, lifespan, setStep }, amount: number): number => {
    amount = Math.sign(amount) * Math.min(Math.abs(amount), lifespan);

    let next: number = step + Math.min(amount, lifespan);
    if (next === -1 || next === lifespan + 1) {
      next = -1;
    } else if (next < -1) {
      next += lifespan + 1;
    } else if (next > lifespan + 1) {
      next -= lifespan + 1;
    }
    setStep(next);
    return next;
  },
);

export default tweakStep;
