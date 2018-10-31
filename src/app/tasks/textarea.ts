import { ActionCreatorsMap } from '../store';
import { TaskContext } from './types';

export interface SetCodeProps {
  setCode: ActionCreatorsMap['flow']['setCode'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}
export const setCode = ({ props }: TaskContext<SetCodeProps>, textarea: HTMLTextAreaElement) => {
  props.setStatus('changed');
  props.setCode(textarea.value);
};

export interface WatchCursorProps {
  isFocused: boolean;
  setCursor: ActionCreatorsMap['textarea']['setCursor'];
  setFocus: ActionCreatorsMap['textarea']['setFocus'];
}
export interface WatchCursorContext {
  alive: boolean;
  area: HTMLTextAreaElement | null;
}
export const watchCursor = (ctx: TaskContext<WatchCursorProps>, extra: WatchCursorContext) => {
  const watch = () => {
    if (extra.area && extra.alive) {
      ctx.props.setCursor(extra.area);
      const isFocused = document.activeElement === extra.area;
      if (isFocused !== ctx.props.isFocused) {
        ctx.props.setFocus(isFocused);
      }
      requestAnimationFrame(watch);
    }
  };
  watch();
};
