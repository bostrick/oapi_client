import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './utils/logging'; // load this early
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
