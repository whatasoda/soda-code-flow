import * as React from 'react';
import FlowState from '../../../code-flow/state/state';
import ValueFormatter from '../../atoms/ValueFormatter';

export interface ValueDisplayProps {
  flowState: FlowState | null;
  step: number;
}

const ValueDisplay: React.SFC<ValueDisplayProps> = ({ flowState, step }) => {
  const item = flowState ? flowState.flow[step] : null;
  if (!item) {
    return (
      <code>
        <pre />
      </code>
    );
  }
  const { value, snapshot } = item.data;

  return (
    <code>
      <pre>
        <ValueFormatter value={value} />
        {Object.keys(snapshot).map((key) => (
          <ValueFormatter key={key} value={snapshot[key]} />
        ))}
      </pre>
    </code>
  );
};

export default ValueDisplay;
