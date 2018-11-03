import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./ColorPicker.css');

const s = styleHelper(style);

interface ColorPickerProps {
  color: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ColorPicker: React.SFC<ColorPickerProps> = ({ color, onChange }) => (
  <div className={s(['container'])}>
    <input type="text" defaultValue={color} className={s(['input'])} onChange={onChange} />
    <div className={s(['highlight'])} style={{ background: color }} />
  </div>
);

export default ColorPicker;
