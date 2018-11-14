import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import Icon from '../../atoms/Icon';
import UrlSharer from '../../atoms/UrlSharer';
import style = require('./Header.css');

const s = styleHelper(style);

const Header: React.SFC = () => (
  <header className={s(['container'])}>
    <h1 className={s(['title'])}>SODA CODE FLOW</h1>
    <UrlSharer className={s(['share'])} />
    <a className={s(['github'])} target="_blank" href="https://github.com/whatasoda/soda-code-flow">
      <Icon name="github" size="xxlarge" />
    </a>
  </header>
);

export default Header;
