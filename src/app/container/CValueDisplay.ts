import * as ReactRedux from 'react-redux';
import SnapshotDisplay, { SnapshotDisplayProps } from '../components/organisims/SnapshotDisplay/ValueDisplay';
import { State } from '../store';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<SnapshotDisplayProps>;
type DispatchProps = DispatchPropsOf<SnapshotDisplayProps>;

const CValueDisplay = ReactRedux.connect<StateProps, DispatchProps, {}, State>(({ flow: { flowState, step } }) => ({
  flowState,
  step,
}))(SnapshotDisplay);

export default CValueDisplay;
