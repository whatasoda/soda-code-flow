import * as React from 'react';
import { SnapshotJSON } from '../../../code-flow';

interface SnapshotValueProps {
  snapshot: SnapshotJSON;
  space: string;
}
const SnapshotValue: React.SFC<SnapshotValueProps> = ({ snapshot: { label, children }, space }) => {
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
    ? children.map((snapshot, key) => ({ key: key.toString(), snapshot, isProp: false }))
    : Object.entries(children).map(([key, snapshot]) => ({ key, snapshot, isProp: true }));

  const childrenElements = childrenEntries.map(({ key, snapshot, isProp }) => (
    <React.Fragment key={key}>
      {space}
      {isProp && <span className="hljs-attr">{`${key}: `}</span>}
      <SnapshotValue {...{ snapshot, space }} />
      {',\n'}
    </React.Fragment>
  ));

  return (
    <span>
      {label && `${label} `}
      {bracketOpen}
      {childrenElements}
      {bracketClose}
    </span>
  );
};

export default SnapshotValue;
