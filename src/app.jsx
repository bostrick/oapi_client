import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'reactstrap';
import React from 'react';
import ReactDOM from 'react-dom';

import Page from './components/Page/index';

const ContainerFluid = (
  <Container fluid>
    <h1>hello world</h1>
  </Container>
);

// default generated index.html has no mount point... we need to create one.
const mountDiv = document.createElement('div');
mountDiv.setAttribute('id', 'app');
document.body.insertBefore(mountDiv, document.body.firstChild);

ReactDOM.render(
  <Page>
    <h1>hello world</h1>
  </Page>,
  document.getElementById('app'),
);
