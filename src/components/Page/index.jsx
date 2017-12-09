
import { Row } from 'reactstrap';
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import NavGutter from '../NavGutter';
import Desktop from '../Desktop';
import DesktopStore from '../Desktop/store';

const desktopStore = new DesktopStore();

class Page extends Component {
  render() {
    return (
      <Provider desktop={desktopStore}>
        <Row className="page">
          <NavGutter />
          <Desktop />
        </Row>
      </Provider>
    );
  }
}

export default Page;
