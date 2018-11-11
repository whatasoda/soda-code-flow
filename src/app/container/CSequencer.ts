import * as ReactRedux from 'react-redux';
import Sequencer, { SequencerProps } from '../components/organisims/Sequencer/Sequencer';
import { State } from '../store/reducers';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<SequencerProps>;
type DispatchProps = DispatchPropsOf<SequencerProps>;

const CSequencer = ReactRedux.connect<StateProps, DispatchProps, {}, State>(({ flow: { status, time } }) => ({
  status,
  time,
}))(Sequencer);

export default CSequencer;
