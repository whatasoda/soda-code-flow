import * as React from 'react';
import fetchCodeFlow from '../../../effects/codeFlow/fetchCodeFlow';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

const Fetch: React.SFC = () => (
  <a href="#" className={s(['button'])} onClick={onClick}>
    <Icon name="reload" size="xxlarge" />
  </a>
);

const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  fetchCodeFlow();
};

export default Fetch;
