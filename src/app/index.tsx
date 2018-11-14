import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './asset/common.css';
import fetchCodeFlow from './effects/codeFlow/fetchCodeFlow';
import { getCodeFromUrl } from './util/codeOnUrl';

ReactDOM.render(<App />, document.getElementById('app'));
fetchCodeFlow(getCodeFromUrl() || undefined);
