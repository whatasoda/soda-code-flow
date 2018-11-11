import * as React from 'react';
import FlowState, { SnapshotTarget } from '../../../code-flow/state/state';
import styleHelper from '../../../util/styleHelper';
import Snapshot from '../../molecules/Snapshot';
import style = require('./SnapshotDisplay.css');

const s = styleHelper(style);

export interface SnapshotDisplayProps {
  flowState: FlowState | null;
  snapshotTargets: SnapshotTarget[];
  step: number;
}

const SnapshotDisplay: React.SFC<SnapshotDisplayProps> = ({ flowState, snapshotTargets, step }) => {
  if (!flowState) {
    return <div className={s(['container'])} />;
  }
  const item = flowState.flow[step] || null;
  const snapshots = item
    ? item.snapshots.map((snapshot, i) => ({ ...snapshot, ...snapshotTargets[i] }))
    : snapshotTargets;
  return (
    <div className={s(['container'])}>
      {snapshots.map((snapshot, index) => (
        <Snapshot key={index} {...{ index, snapshot }} />
      ))}
    </div>
  );
};

export default SnapshotDisplay;
