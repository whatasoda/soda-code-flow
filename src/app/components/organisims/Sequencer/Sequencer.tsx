import * as React from 'react';
import { FlowState } from '../../../code-flow';
import { ActionCreatorsMap, State } from '../../../store';
import fetchCodeFlow, { FetchCodeFlowProps } from '../../../tasks/fetchCodeFlow';
import startSequence, { SequenceProps, SequenceState } from '../../../tasks/sequence';
import FlowHighlight from '../../molecules/FlowHighlight';
import TextArea from '../../molecules/TextArea';

export interface SequencerProps extends SequenceProps, FetchCodeFlowProps {
  status: State['flow']['status'];
  flowState: FlowState | null;
  step: number;
  code: string;
  setStatus: ActionCreatorsMap['flow']['setStatus'];
  setCode: ActionCreatorsMap['flow']['setCode'];
}

interface SequencerState extends SequenceState {}

class Sequencer extends React.Component<SequencerProps, SequencerState> {
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      alive: true,
    };
    this.dispatch = this.dispatch.bind(this);
  }

  public componentDidMount() {
    startSequence(this);
  }

  public componentWillUnmount() {
    this.setState({ alive: false });
  }

  public render() {
    const item = this.props.flowState && this.props.flowState.flow[this.props.step];
    return (
      <React.Fragment>
        <TextArea update={this.props.setCode} content={this.props.code} />
        <FlowHighlight code={this.props.code} item={item} />
        <button onClick={this.dispatch}>dispatch</button>
      </React.Fragment>
    );
  }

  private async dispatch() {
    await fetchCodeFlow(this);
    this.props.setStatus('running');
  }
}

export default Sequencer;
