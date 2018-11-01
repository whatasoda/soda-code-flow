import { State } from '../../store';

export const getBarStatus = (status: State['flow']['status']) => {
  const isAvailable = status === 'ready' || status === 'running';
  const isRunning = status === 'running';
  return { isAvailable, isRunning };
};
