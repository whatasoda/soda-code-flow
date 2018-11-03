import * as React from 'react';
import FlowState, { SnapshotTarget } from '../../../code-flow/state/state';
import Snapshot from '../../molecules/Snapshot';

export interface SnapshotDisplayProps {
  flowState: FlowState | null;
  snapshotTargets: SnapshotTarget[];
  step: number;
}

const SnapshotDisplay: React.SFC<SnapshotDisplayProps> = ({ flowState, snapshotTargets, step }) => {
  if (!flowState) {
    return <div />;
  }
  const item = flowState.flow[step] || null;
  const snapshots = item
    ? item.snapshots.map((snapshot, i) => ({ ...snapshot, ...snapshotTargets[i] }))
    : snapshotTargets;
  return (
    <div>
      {snapshots.map((snapshot, index) => (
        <Snapshot key={index} {...{ index, snapshot }} />
      ))}
    </div>
  );
};

export default SnapshotDisplay;
