import { ActionCreatorsMap } from '../store';
import { EffectContext } from './types';

export interface SetCodeProps {
  setCode: ActionCreatorsMap['flow']['setCode'];
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}
export const setCode = ({ props }: EffectContext<SetCodeProps>, textarea: HTMLTextAreaElement) => {
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
export const watchCursor = (ctx: EffectContext<WatchCursorProps>, extra: WatchCursorContext) => {
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
