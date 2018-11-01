import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './common.css';
import fetchCodeFlow from './effects/codeFlow/fetch';

ReactDOM.render(<App />, document.getElementById('app'));
fetchCodeFlow();
