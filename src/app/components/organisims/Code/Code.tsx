import * as React from 'react';
import CFlowHighlight from '../../../container/CFlowHighlight';
import CTextArea from '../../../container/CTextArea';
import CodeBox from '../../atoms/CodeBox';

export interface CodeProps {
  code: string;
}

const Code: React.SFC<CodeProps> = ({ code }) => (
  <CodeBox code={code}>
    <CFlowHighlight />
    <CTextArea />
  </CodeBox>
);

export default Code;
