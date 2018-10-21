import * as React from 'react';
import { FlowState } from '../../../code-flow/types';

interface FlowHighlightProps {
  code: string;
  flow: FlowState | null;
  index: number;
}

const FlowHighlight: React.SFC<FlowHighlightProps> = ({ code, flow, index }) => {
  const { start = 0, end = 0 } =
    flow && flow.registry[index] ? flow.registry[index].profile : {};
  const sample = flow && flow.registry[index] ? flow.registry[index].value : null;
  
  console.log(sample);
  return (
    <pre>
      <code>
        {code.slice(0, start)}
        <span style={{ color: '#f00' }}>{code.slice(start, end)}</span>
        {code.slice(end)}
      </code>
    </pre>
  )
};

export default FlowHighlight;
