import * as React from 'react';
import FlowHighlight from '../../molecules/FlowHighlight';
import codeFlow from '../../../code-flow';
import TextArea from '../../molecules/TextArea';
import { FlowState } from '../../../code-flow/types';

export interface SequencerProps {
  interval: number;
}

interface SequencerState {
  interval: number;
  index: number;
  input: string;
  flowState: FlowState | null;
}

class Sequencer extends React.Component<SequencerProps, SequencerState> {
  private timer: ReturnType<typeof setInterval> | null = null;
  
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      index: 0,
      interval: props.interval,
      input: `const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const upper = lower.map((char) => char.charCodeAt());
for (let i=0; i<10; i++) {
  console.log(i**i);
}
`,
      flowState: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateInterval = this.updateInterval.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.prepare = this.prepare.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.prepare();
    this.start();
  }
  
  public componentWillUnmount() {
    this.stop();
  }
  
  public render() {
    
    return <React.Fragment>
      <TextArea update={this.updateInput} content={this.state.input} />
      <FlowHighlight code={this.state.input} flow={this.state.flowState} index={this.state.index}/>
      <button onClick={this.dispatch}>dispatch</button>
    </React.Fragment>
  }
  
  
  private updateInput(input: string) {
    this.setState({ input });
    this.stop();
  }
  
  private updateInterval(interval: number) {
    this.setState({ interval });
  }
  
  private async dispatch() {
    await this.prepare();
    this.start();
  }
  
  private async prepare() {
    const flowState = await codeFlow(this.state.input);
    this.setState({ flowState });
  }
  
  
  private start() {
    this.stop();
    this.timer = setInterval(() => {
      const { index, flowState } = this.state;
      const len = flowState ? flowState.registry.length : 0;
      
      if (index <= len) {
        return this.setState({ index: index + 1 });
      }
      
      this.stop();
    }, this.props.interval);
  }
  
  private stop() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.setState({ index: 0 });
    }
  }
  
}

export default Sequencer;
