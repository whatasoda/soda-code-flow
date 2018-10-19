import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sequencer from './components/organisims/Sequencer';
import codeFlow from './code-flow';

const flowData = codeFlow(`const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const upper = lower.map((char) => char.charCodeAt());
if (true) {
  const a = 0;
  console.log(a);
}
`);

flowData.then(data => {
  ReactDOM.render(<Sequencer {...data}/>, document.getElementById('app'));
});


