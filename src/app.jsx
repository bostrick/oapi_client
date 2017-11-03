import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Page from './components/Page/index';
import Header from './components/Header';

// default generated index.html has no mount point... we need to create one.
const mountDiv = document.createElement('div');
mountDiv.setAttribute('id', 'app');
document.body.insertBefore(mountDiv, document.body.firstChild);

ReactDOM.render(
  <div>
    <Header />
    <Page>
      <h1>hello world</h1>
    </Page>
  </div>,
  document.getElementById('app'),
);
