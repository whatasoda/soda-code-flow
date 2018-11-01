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

class Tweak extends React.Component<TweakProps> {
  constructor(props: TweakProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    const { isAvailable } = getBarStatus(this.props.status);

    return (
      <a href="#" className={s(['button', !isAvailable && 'inavailable'])} onClick={this.onClick}>
        <Icon name={this.props.direction < 0 ? 'cheveron-outline-left' : 'cheveron-outline-right'} size="xxlarge" />
      </a>
    );
  }

  private onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    tweakStep(this.props.direction);
  }
}

export default Tweak;
