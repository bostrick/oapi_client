import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Page from './components/Page';
import Header from './components/NavBar';
import Dashboard from './components/Dashboard';

// default generated index.html has no mount point... we need to create one.
const mountDiv = document.createElement('div');
mountDiv.setAttribute('id', 'app');
document.body.insertBefore(mountDiv, document.body.firstChild);

ReactDOM.render(
  <div>
    <Header />
    <Page>
      <Dashboard>
        <h1>hello world</h1>
      </Dashboard>
    </Page>
  </div>,
  document.getElementById('app'),
);
