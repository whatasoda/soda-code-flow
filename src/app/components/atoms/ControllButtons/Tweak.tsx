import * as React from 'react';
import tweakStep from '../../../effects/sequence/tweakStep';
import { getBarStatus } from '../../../effects/util/sequenceBar';
import { State } from '../../../store';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

export interface TweakProps {
  status: State['flow']['status'];
  direction: 1 | -1;
}

const Tweak: React.SFC<TweakProps> = ({ status, direction }) => {
  const { isAvailable } = getBarStatus(status);

  return (
    <a href="#" className={s(['button', !isAvailable && 'inavailable'])} onClick={direction < 0 ? left : right}>
      <Icon name={direction < 0 ? 'cheveron-outline-left' : 'cheveron-outline-right'} size="xxlarge" />
    </a>
  );
};

const onClickFunc = (direction: 1 | -1) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  tweakStep(direction);
};

const left = onClickFunc(-1);
const right = onClickFunc(1);

export default Tweak;
