import * as React from 'react';
import { DescriptorJSON } from '../../../code-flow';
import styleHelper from '../../../util/styleHelper';
import ValueNode from './ValueNode';

const s = styleHelper({});

interface ValueFormatterProps {
  node: DescriptorJSON;
}

const space = '';
const ValueFormatter: React.SFC<ValueFormatterProps> = ({ node }) => (
  <pre>
    <code className={s([], ['json', 'hljs'])}>
      <ValueNode {...{ node, space }} />
    </code>
  </pre>
);

export default ValueFormatter;
