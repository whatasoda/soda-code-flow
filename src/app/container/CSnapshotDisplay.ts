import * as ReactRedux from 'react-redux';
import SnapshotDisplay, { SnapshotDisplayProps } from '../components/organisims/SnapshotDisplay/SnapshotDisplay';
import { State } from '../store';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<SnapshotDisplayProps>;
type DispatchProps = DispatchPropsOf<SnapshotDisplayProps>;

const CSnapshotDisplay = ReactRedux.connect<StateProps, DispatchProps, {}, State>(
  ({ flow: { flowState, step, snapshotTargets } }) => ({
    flowState,
    step,
    snapshotTargets,
  }),
)(SnapshotDisplay);

export default CSnapshotDisplay;
