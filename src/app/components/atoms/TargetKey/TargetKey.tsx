import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./TargetKey.css');

const s = styleHelper(style);

interface TargetKeyProps {
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TargetKey: React.SFC<TargetKeyProps> = ({ value, onChange }) => (
  <input type="text" placeholder="DYNAMIC" defaultValue={value || ''} className={s(['input'])} onChange={onChange} />
);

export default TargetKey;
