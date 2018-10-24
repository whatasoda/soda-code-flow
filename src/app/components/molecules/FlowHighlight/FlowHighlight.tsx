import * as React from 'react';
import { FlowItem } from '../../../code-flow/state/state';

interface FlowHighlightProps {
  code: string;
  item: FlowItem | null;
}

const FlowHighlight: React.SFC<FlowHighlightProps> = ({ code, item }) => {
  const [s = 0, e = 0] = item ? item.location : [];
  const value = item ? item.data.value : null;

  // tslint:disable-next-line:no-console
  console.log(value);
  return (
    <pre>
      <code>
        {code.slice(0, s)}
        <span style={{ color: '#f00' }}>{code.slice(s, e)}</span>
        {code.slice(e)}
      </code>
    </pre>
  );
};

export default FlowHighlight;
