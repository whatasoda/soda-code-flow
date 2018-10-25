import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./Header.css');

const s = styleHelper(style);

const Header: React.SFC = () => (
  <header className={s(['container'])}>
    <h1 className={s(['head'])}>SODA CODE FLOW</h1>
  </header>
);

export default Header;
