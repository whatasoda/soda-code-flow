import * as React from 'react';
import toggleRunning from '../../../effects/sequence/toggleRunning';
import { getBarStatus } from '../../../effects/util/sequenceBar';
import { State } from '../../../store';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

export interface PlayPauseProps {
  status: State['flow']['status'];
}

class PlayPause extends React.Component<PlayPauseProps> {
  public render() {
    const { isAvailable, isRunning } = getBarStatus(this.props.status);

    return (
      <a href="#" className={s(['button', !isAvailable && 'inavailable'])} onClick={this.onClick}>
        <Icon name={isRunning ? 'pause-outline' : 'play-outline'} size="xxlarge" />
      </a>
    );
  }

  private onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    toggleRunning();
  }
}

export default PlayPause;
