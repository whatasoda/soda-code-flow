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
  const data: Array<{ start: number; end: number; color: string }> = [];
  const className = s(['deco']);
  if (item) {
    if (item.snapshots.every(({ key }) => !!key)) {
      const color = '#ffee00';
      const [start, end] = item.location;
      data.push({ start, end, color });
    }
    item.snapshots.forEach(({ color, loc }) => {
      if (loc) {
        const [start, end] = loc;
        data.push({ start, end, color });
      }
    });
  }
  return (
    <React.Fragment>
      {data.map(({ start, end, color }, key) => (
        <CodeDeco {...{ key, code, start, end, className }} className={s(['deco'])} style={{ background: color }} />
      ))}
    </React.Fragment>
  );
};

export default FlowHighlight;
