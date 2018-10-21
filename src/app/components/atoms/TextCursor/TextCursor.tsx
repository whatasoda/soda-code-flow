import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./style.css');

const s = styleHelper(style);

export interface TextCursorProps {
  row: number;
  col: number;
}

const TextCursor: React.SFC<TextCursorProps> = ({ row, col }) => (
  <div className={s('container')}>
    {'\n'.repeat(row) + ' '.repeat(col)}
    <span className={s('cursor')} />
  </div>
);

export default TextCursor;
