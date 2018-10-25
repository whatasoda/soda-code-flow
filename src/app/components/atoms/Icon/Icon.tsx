import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./Icon.css');

const s = styleHelper(style);

interface IconProps {
  name:
    | 'bubble'
    | 'spinner3'
    | 'spinner11'
    | 'plus'
    | 'minus'
    | 'play3'
    | 'pause2'
    | 'stop2'
    | 'backward2'
    | 'forward3'
    | 'first'
    | 'last'
    | 'previous2'
    | 'next2'
    | 'github';
  size?: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge';
}

const Icon: React.SFC<IconProps> = ({ name, size = 'normal' }) => (
  <span className={s([`icon-${size}`], ['icon', `icon-${name}`])} />
);

export default Icon;
