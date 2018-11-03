import * as React from 'react';
import setColor from '../../../effects/snapshot/setColor';
import styleHelper from '../../../util/styleHelper';
import style = require('./ColorPicker.css');

const s = styleHelper(style);

interface ColorPickerProps {
  index: number;
  color: string;
}

class ColorPicker extends React.Component<ColorPickerProps> {
  constructor(props: ColorPickerProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { color } = this.props;
    return (
      <div className={s(['container'])}>
        <input type="text" defaultValue={color} className={s(['input'])} onChange={this.onChange} />
        <div className={s(['highlight'])} style={{ background: color }} />
      </div>
    );
  }

  private onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(this.props.index, e.target.value);
  }
}

export default ColorPicker;
