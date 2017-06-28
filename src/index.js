import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TeamsTable from './Teams';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<TeamsTable />, document.getElementById('teamstable'));
registerServiceWorker();
