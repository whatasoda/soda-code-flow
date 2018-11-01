import * as React from 'react';
import fetchCodeFlow from '../../../effects/codeFlow/fetch';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

class Fetch extends React.Component {
  public render() {
    return (
      <a href="#" className={s(['button'])} onClick={this.onClick}>
        <Icon name="reload" size="xxlarge" />
      </a>
    );
  }

  private onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    fetchCodeFlow();
  }
}

export default Fetch;
