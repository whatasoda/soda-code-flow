import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./ColorPicker.css');

const s = styleHelper(style);

interface ColorPickerProps {
  index: number;
  color: string;
}

class ColorPicker extends React.Component<ColorPickerProps> {
  public render() {
    const { color } = this.props;
    return <a href="#" style={{ background: color }} className={s(['color-picker'])} />;
  }
}

export default ColorPicker;
