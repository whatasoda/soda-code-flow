import * as ReactRedux from 'react-redux';
import Sequencer, { SequencerProps } from '../components/organisims/Sequencer/Sequencer';
import { actionCreators, State } from '../store/reducers';
import wrapAll from '../util/wrapAll';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<SequencerProps>;
type DispatchProps = DispatchPropsOf<SequencerProps>;

const CSequencer = ReactRedux.connect<StateProps, DispatchProps, {}, State>(
  ({ flow }) => {
    const { status, code, flowState, interval, step, loop, lifespan, watch } = flow;
    return { status, code, flowState, interval, step, loop, lifespan, watch };
  },
  (dispatch) => {
    const { flow } = actionCreators;
    const { assignCodeFlow, setStep, setStatus, setCode } = flow;
    return wrapAll(dispatch, { assignCodeFlow, setStep, setStatus, setCode });
  },
)(Sequencer);

export default CSequencer;
