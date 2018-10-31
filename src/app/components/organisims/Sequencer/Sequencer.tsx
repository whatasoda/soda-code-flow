import * as React from 'react';
import { FetchCodeFlowProps } from '../../../effects/fetchCodeFlow';
import startSequence, { SequenceProps, SequenceState } from '../../../effects/sequence';
import styleHelper from '../../../util/styleHelper';
import { Fetch, PlayPause, Tweak } from '../../atoms/ControllButtons';
import style = require('./Sequencer.css');

const s = styleHelper(style);

export interface SequencerProps extends SequenceProps, FetchCodeFlowProps {}

interface SequencerState extends SequenceState {}

class Sequencer extends React.Component<SequencerProps, SequencerState> {
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      alive: true,
    };
  }

  public componentDidMount() {
    startSequence(this);
  }

  public componentWillUnmount() {
    this.setState({ alive: false });
  }

  public render() {
    return (
      <div className={s(['container'])}>
        <div className={s(['buttons'])}>
          <Fetch {...this.props} />
          <Tweak {...this.props} direction={-1} />
          <PlayPause {...this.props} />
          <Tweak {...this.props} direction={1} />
        </div>
        <div>aa</div>
      </div>
    );
  }
}

export default Sequencer;
