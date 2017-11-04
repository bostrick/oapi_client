import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// default generated index.html has no mount point... we need to create one.
const mountDiv = document.createElement('div');
mountDiv.setAttribute('id', 'app');
document.body.insertBefore(mountDiv, document.body.firstChild);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
