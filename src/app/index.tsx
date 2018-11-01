import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './common.css';
import fetchCodeFlow from './effects/codeFlow/fetchCodeFlow';

ReactDOM.render(<App />, document.getElementById('app'));
fetchCodeFlow();
