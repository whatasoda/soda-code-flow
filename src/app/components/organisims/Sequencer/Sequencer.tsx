import * as React from 'react';
import codeFlow, { FlowState } from '../../../code-flow';
import FlowHighlight from '../../molecules/FlowHighlight';
import TextArea from '../../molecules/TextArea';

export interface SequencerProps {
  interval: number;
}

interface SequencerState {
  interval: number;
  index: number;
  input: string;
  flowState: FlowState | null;
  base64: string;
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
      base64: '',
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
    return (
      <React.Fragment>
        <TextArea update={this.updateInput} content={this.state.input} />
        <FlowHighlight code={this.state.input} state={this.state.flowState} index={this.state.index} />
        <button onClick={this.dispatch}>dispatch</button>
      </React.Fragment>
    );
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
    const source = this.state.input;
    const { state: flowState, base64 } = await codeFlow({
      source,
      ctx: {
        watch: ['lower'],
      },
    });

    this.setState({ flowState, base64 });
  }

  private start() {
    this.stop();
    this.timer = setInterval(() => {
      const { index, flowState } = this.state;
      const len = flowState ? flowState.flow.length : 0;

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
