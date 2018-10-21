import * as React from 'react';
import { FlowState } from '../../../code-flow';

interface FlowHighlightProps {
  code: string;
  state: FlowState | null;
  index: number;
}

const FlowHighlight: React.SFC<FlowHighlightProps> = ({ code, state, index }) => {
  const { start = 0, end = 0 } = state && state.flow[index] ? state.flow[index].location : {};
  const value = state && state.flow[index] ? state.flow[index].data.value : null;

  // tslint:disable-next-line:no-console
  console.log(value);
  return (
    <pre>
      <code>
        {code.slice(0, start)}
        <span style={{ color: '#f00' }}>{code.slice(start, end)}</span>
        {code.slice(end)}
      </code>
    </pre>
  );
};

export default FlowHighlight;
