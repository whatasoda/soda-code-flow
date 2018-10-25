import * as React from 'react';
import Highlight from 'react-highlight';
import styleHelper from '../../../util/styleHelper';
import style = require('./CodeBox.css');

const s = styleHelper(style);

interface CodeBoxProps {
  code: string;
}

const CodeBox: React.SFC<CodeBoxProps> = ({ code, children }) => (
  <div className={s(['container'])}>
    <div className={s(['scroll-box'])}>
      <Highlight className="js">{code}</Highlight>
      <pre>
        <code className={s(['children-container'])}>{children}</code>
      </pre>
    </div>
  </div>
);

export default CodeBox;
