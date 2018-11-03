import * as React from 'react';
import { DescriptorJSON } from '../../../code-flow';

interface ValueNodeProps {
  node: DescriptorJSON;
  space: string;
}
const ValueNode: React.SFC<ValueNodeProps> = ({ node: { label, children }, space }) => {
  if (!children) {
    if (!label) {
      return null;
    }
    const isString = label.startsWith('"') && label.endsWith('"');
    const isNumber = /^(0[xob]?)?[0-9.]*$/.test(label);
    const isMeta = /^\[.*\]$/.test(label);
    const className = isString ? 'hljs-string' : isNumber ? 'hljs-number' : isMeta ? 'hljs-meta' : 'hljs-literal';
    return <span {...{ className }}>{label}</span>;
  }
  label = label ? `${label} ` : '';
  const bracketOpen = `${space}${label}${Array.isArray(children) ? '[' : '{'}\n`;
  const bracketClose = `${space}${Array.isArray(children) ? ']' : '}'}\n`;
  space += '  ';

  const childrenEntries = Array.isArray(children)
    ? children.map((node, key) => ({ key: key.toString(), node, isProp: false }))
    : Object.entries(children).map(([key, node]) => ({ key, node, isProp: true }));

  const childrenElems = childrenEntries.map(({ key, node, isProp }) => (
    <React.Fragment key={key}>
      {space}
      {isProp && <span className="hljs-attr">{`${key}: `}</span>}
      <ValueNode {...{ node, space }} />
      {',\n'}
    </React.Fragment>
  ));

  return (
    <span>
      {label && `${label} `}
      {bracketOpen}
      {childrenElems}
      {bracketClose}
    </span>
  );
};

export default ValueNode;
