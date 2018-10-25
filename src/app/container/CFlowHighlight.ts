import * as ReactRedux from 'react-redux';
import FlowHighlight, { FlowHighlightProps } from '../components/molecules/FlowHighlight';
import { State } from '../store';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<FlowHighlightProps>;
type DispatchProps = DispatchPropsOf<FlowHighlightProps>;

const CFlowHighlight = ReactRedux.connect<StateProps, DispatchProps, {}, State>(({ flow }) => {
  const { code, step, flowState } = flow;
  const item = flowState && flowState.flow[step];
  return { code, item };
})(FlowHighlight);

export default CFlowHighlight;
