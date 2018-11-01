import * as React from 'react';
import handleSequence from '../../../effects/sequence/start';
import { State } from '../../../store';
import styleHelper from '../../../util/styleHelper';
import { Fetch, PlayPause, Tweak } from '../../atoms/ControllButtons';
import style = require('./Sequencer.css');

const s = styleHelper(style);

export interface SequencerProps {
  status: State['flow']['status'];
}

class Sequencer extends React.Component<SequencerProps> {
  public componentDidMount() {
    handleSequence(true);
  }

  public componentWillUnmount() {
    handleSequence(false);
  }

  public render() {
    const { status } = this.props;
    const common = { status };
    return (
      <div className={s(['container'])}>
        <div className={s(['buttons'])}>
          <Fetch />
          <Tweak {...common} direction={-1} />
          <PlayPause {...common} />
          <Tweak {...common} direction={1} />
        </div>
        <div>aa</div>
      </div>
    );
  }
}

export default Sequencer;
