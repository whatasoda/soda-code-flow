import * as Prettier from 'prettier';
import * as plugin from 'prettier/parser-babylon';
import * as standalone from 'prettier/standalone';
import * as React from 'react';
import Highlight from 'react-highlight';

const options: Prettier.Options = {
  parser: 'babylon',
  plugins: [plugin],
  printWidth: 50,
};

const format = (value: any) => standalone.format(`(${JSON.stringify(value, null, '\t')});`, options);

interface ValueFormatterProps {
  value: any;
}
const ValueFormatter: React.SFC<ValueFormatterProps> = ({ value }) => (
  <Highlight className="json">{format(value)}</Highlight>
);

export default ValueFormatter;
