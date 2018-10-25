import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./CodeDeco.css');

const s = styleHelper(style);

interface CodeDecoProps {
  code: string;
  start: number;
  end: number;
  style?: React.CSSProperties;
  className?: string;
}

const CodeDeco: React.SFC<CodeDecoProps> = ({ code, start, end, style, className }) => {
  code = `${code}\n`;
  return (
    <div className={s(['container'])}>
      {code.slice(0, start)}
      <span {...{ style, className }}>{code.slice(start, end)}</span>
      {`${code}\n`.slice(end)}
    </div>
  );
};

export default CodeDeco;
