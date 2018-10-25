import { ActionCreatorsMap, State } from '../store';
import { TaskContext } from './types';

export interface ControllProgressBarProps {
  status: State['flow']['status'];
}
export const getBarStatus = ({ props }: TaskContext<ControllProgressBarProps>) => {
  const { status } = props;

  const isAvailable = status === 'ready' || status === 'running';
  const isRunning = status === 'running';
  return { isAvailable, isRunning };
};

export interface ToggleRunningProps extends ControllProgressBarProps {
  setStatus: ActionCreatorsMap['flow']['setStatus'];
}
export const toggleRunning = (ctx: TaskContext<ToggleRunningProps>) => {
  const { isAvailable, isRunning } = getBarStatus(ctx);
  if (!isAvailable) {
    return;
  }
  const { setStatus } = ctx.props;
  setStatus(isRunning ? 'ready' : 'running');
};
