import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './common.css';
import Sequencer from './components/organisims/Sequencer';

ReactDOM.render(<Sequencer interval={300} />, document.getElementById('app'));
