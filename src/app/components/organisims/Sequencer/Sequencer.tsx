import * as React from 'react';
import { FlowState } from '../../../../types/code-flow/state';
import FlowHighlight from '../../molecules/FlowHighlight';

interface SequencerState {
  index: number;
}

class Sequencer extends React.Component<FlowState, SequencerState> {
  private interval: ReturnType<typeof setInterval> | null = null;
  
  constructor(props: FlowState) {
    super(props);
    this.state = { index: 0 };
  }
  
  public componentDidMount() {
    this.interval = setInterval(() => this.setState((prev) => ({ index: prev.index + 1 })), 500);
  }
  
  public componentWillUnmount() {
    clearInterval(this.interval as any);
  }
  
  public render() {
    const i = this.state.index;
    return <FlowHighlight code={this.props.code} flow={this.props.registry[i]}/>
  }
}

export default Sequencer;
