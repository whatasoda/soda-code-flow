import * as React from 'react';
import { FlowItem } from '../../../code-flow/state/state';
import styleHelper from '../../../util/styleHelper';
import CodeDeco from '../../atoms/CodeDeco';
import style = require('./FlowHighlight.css');

const s = styleHelper(style);

export interface FlowHighlightProps {
  code: string;
  item: FlowItem | null;
}

const FlowHighlight: React.SFC<FlowHighlightProps> = ({ code, item }) => {
  const [start = 0, end = 0] = item ? item.location : [];
  const value = item ? item.data.value : null;

  // tslint:disable-next-line:no-console
  console.log(value);
  return <CodeDeco {...{ code, start, end }} className={s(['curr'])} />;
};

export default FlowHighlight;
