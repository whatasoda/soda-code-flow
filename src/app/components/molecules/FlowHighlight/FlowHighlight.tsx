import * as React from 'react';
import { FlowItem } from '../../../../types/code-flow/state';

interface FlowHighlightProps {
  code: string;
  flow: FlowItem;
}

const FlowHighlight: React.SFC<FlowHighlightProps> = ({ code, flow }) => {
  const { start, end } = flow.profile;
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
