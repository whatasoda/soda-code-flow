import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';
import setStepByTime from './setStepByTime';

type Position = Pick<MouseEvent, 'clientX'>;
export type PositionUpdater = (e: MouseEvent) => void;
export type SlideTerminator = () => void;
interface StartTimeSlideContext {
  setTime: ActionCreatorsMap['flow']['setTime'];
}

const startTimeSlide = connect<State, StartTimeSlideContext>(
  () => ({}),
  (dispatch) => {
    const { setTime } = actionCreators.flow;
    return wrapAll(dispatch, { setTime });
  },
)(
  (
    { setTime },
    {
      containerRect,
      knobRect,
      start,
      onTerminate,
      onUpdate,
    }: {
      containerRect: ClientRect;
      knobRect: ClientRect;
      start: number;
      onUpdate?: () => void;
      onTerminate?: () => void;
    },
  ) => {
    const offset = knobRect.left + knobRect.width / 2 - start;
    const origin = containerRect.left;

    const { width } = containerRect;

    let alive: boolean = true;
    const terminator: SlideTerminator = () => {
      alive = false;
      if (onTerminate) {
        onTerminate();
      }
    };

    let position: Position | null = null;
    const updater: PositionUpdater = (e: MouseEvent) => {
      e.preventDefault();
      const { clientX } = e;
      position = { clientX };
      if (onUpdate) {
        onUpdate();
      }
    };

    const next = () => requestAnimationFrame(watch);
    const watch = () => {
      if (!alive) {
        return;
      }

      if (!position) {
        return next();
      }

      const { clientX } = position;
      const x = clientX + offset - origin;

      const time = Math.min(Math.max(x / width, 0), 1);
      setTime(time);
      setStepByTime(time);

      next();
    };
    watch();

    return { updater, terminator };
  },
);

export default startTimeSlide;
