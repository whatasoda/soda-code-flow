import * as React from 'react';
import FlowState from '../../../code-flow/state/state';
import Snapshot from '../../molecules/Snapshot';

export interface SnapshotDisplayProps {
  flowState: FlowState | null;
  step: number;
}

const SnapshotDisplay: React.SFC<SnapshotDisplayProps> = ({ flowState, step }) => {
  if (!flowState) {
    return <div />;
  }
  const item = flowState.flow[step] || null;
  const snapshots = item ? item.snapshots : flowState.ctx.snapshotTargets;
  return (
    <div>
      {snapshots.map((snapshot, index) => (
        <Snapshot key={index} {...{ index, snapshot }} />
      ))}
    </div>
  );
};

export default SnapshotDisplay;
