import * as React from 'react';
import { ControllProgressBarProps, getBarStatus } from '../../../effects/controll';
import tweakStep, { TweakStepProps } from '../../../effects/tweakStep';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

export interface TweakProps extends TweakStepProps, ControllProgressBarProps {
  direction: 1 | -1;
}

class Tweak extends React.Component<TweakProps> {
  constructor(props: TweakProps) {
    super(props);
    this.tweak = this.tweak.bind(this);
  }

  public render() {
    const { isAvailable } = getBarStatus(this);

    return (
      <a href="#" className={s(['button', !isAvailable && 'inavailable'])} onClick={this.tweak}>
        <Icon name={this.props.direction < 0 ? 'cheveron-outline-left' : 'cheveron-outline-right'} size="xxlarge" />
      </a>
    );
  }

  private tweak(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    tweakStep(this, this.props.direction);
  }
}

export default Tweak;
