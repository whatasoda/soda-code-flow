import * as React from 'react';
import CCode from '../../../container/CCode';
import CSequencer from '../../../container/CSequencer';
import CValueDisplay from '../../../container/CValueDisplay';
import styleHelper from '../../../util/styleHelper';
import Header from '../../organisims/Header';
import style = require('./Layout.css');

const s = styleHelper(style);

const Layout: React.SFC = () => (
  <div className={s(['layout'])}>
    <Header />
    <CCode />
    <CValueDisplay />
    <CSequencer />
  </div>
);

export default Layout;
