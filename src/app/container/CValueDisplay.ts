import * as ReactRedux from 'react-redux';
import ValueDisplay from '../components/molecules/ValueDisplay';
import { ValueDisplayProps } from '../components/molecules/ValueDisplay/ValueDisplay';
import { State } from '../store';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<ValueDisplayProps>;
type DispatchProps = DispatchPropsOf<ValueDisplayProps>;

const CValueDisplay = ReactRedux.connect<StateProps, DispatchProps, {}, State>(({ flow: { flowState, step } }) => ({
  flowState,
  step,
}))(ValueDisplay);

export default CValueDisplay;
