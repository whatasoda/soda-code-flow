import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sequencer from './components/organisims/Sequencer';
import './common.css';

ReactDOM.render(<Sequencer interval={300}/>, document.getElementById('app'));
