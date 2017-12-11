
import { Row } from 'reactstrap';
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Desktop from '../Desktop';
import DesktopStore from '../Desktop/store';
import { toolkitFactories } from '../Toolkit';
import { registerFactories } from './bootstrap';

const desktopStore = new DesktopStore();

class Page extends Component {

  constructor(props) {
    super(props);
    registerFactories(desktopStore);
  }

  render() {
    return (
      <Provider desktop={desktopStore} toolkit={toolkitFactories}>
        <Row className="page">
          <Desktop />
        </Row>
      </Provider>
    );
  }
}

export default Page;
