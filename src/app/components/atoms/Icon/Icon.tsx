import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./Icon.css');

const s = styleHelper(style);

interface IconProps {
  name:
    | 'spinner3'
    | 'reload'
    | 'add-outline'
    | 'minus-outline'
    | 'play-outline'
    | 'pause-outline'
    | 'cheveron-outline-left'
    | 'cheveron-outline-right'
    | 'chat-bubble-dots'
    | 'repost'
    | 'github';
  size?: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge';
}

const Icon: React.SFC<IconProps> = ({ name, size = 'normal' }) => (
  <span className={s([`icon-${size}`], ['icon', `icon-${name}`])} />
);

export default Icon;
