import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './asset/common.css';
import fetchCodeFlow from './effects/codeFlow/fetchCodeFlow';
import { getCodeFromUrl } from './util/codeOnUrl';

ReactDOM.render(<App />, document.getElementById('app'));
const base64 = getCodeFromUrl() || undefined;
console.log(base64);

fetchCodeFlow(base64);
