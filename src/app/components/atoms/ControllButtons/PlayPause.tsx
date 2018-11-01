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

const PlayPause: React.SFC<PlayPauseProps> = ({ status }) => {
  const { isAvailable, isRunning } = getBarStatus(status);

  return (
    <a href="#" className={s(['button', !isAvailable && 'inavailable'])} onClick={onClick}>
      <Icon name={isRunning ? 'pause-outline' : 'play-outline'} size="xxlarge" />
    </a>
  );
};

const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  toggleRunning();
};

export default PlayPause;
