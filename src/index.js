import React from 'react';
import ReactDOM from 'react-dom';
import TeamsTable from './Teams';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<TeamsTable />, document.getElementById('teamstable'));
registerServiceWorker();

