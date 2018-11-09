import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./ClearTextInput.css');

const s = styleHelper(style);

interface ClearTextInputProps {
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const ClearTextInput: React.SFC<ClearTextInputProps> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    defaultValue={value || ''}
    className={s(['input'])}
    onChange={onChange}
  />
);

export default ClearTextInput;
