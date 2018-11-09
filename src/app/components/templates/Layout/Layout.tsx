import * as React from 'react';
import CCode from '../../../container/CCode';
import CSequencer from '../../../container/CSequencer';
import CSnapshotDisplay from '../../../container/CSnapshotDisplay';
import styleHelper from '../../../util/styleHelper';
import Header from '../../organisims/Header';
import style = require('./Layout.css');

const s = styleHelper(style);

const Layout: React.SFC = () => (
  <div className={s(['layout'])} spellCheck={false}>
    <Header />
    <CCode />
    <CSnapshotDisplay />
    <CSequencer />
  </div>
);

export default Layout;
