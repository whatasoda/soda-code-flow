import * as React from 'react';
import { ControllProgressBarProps, getBarStatus, toggleRunning, ToggleRunningProps } from '../../../tasks/controll';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

export interface PlayPauseProps extends ControllProgressBarProps, ToggleRunningProps {}

class PlayPause extends React.Component<PlayPauseProps> {
  constructor(props: PlayPauseProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  public render() {
    const { isAvailable, isRunning } = getBarStatus(this);

    return (
      <a href="#" className={s(['button', !isAvailable && 'inavailable'])} onClick={this.toggle}>
        <Icon name={isRunning ? 'pause-outline' : 'play-outline'} size="xxlarge" />
      </a>
    );
  }

  private toggle(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    toggleRunning(this);
  }
}

export default PlayPause;
