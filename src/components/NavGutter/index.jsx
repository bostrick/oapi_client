
import _ from 'lodash';
import { Col, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import appDesktopStore from '../Desktop/store';

import openAPIStore from '../../store/openapi';
import OpenAPIView from '../OpenAPIView';

/* eslint  jsx-a11y/anchor-is-valid: "off" */

class NavGutter extends React.Component {

  components = {
    openapi: <OpenAPIView key="one" openApiStore={openAPIStore} />,
    another: <OpenAPIView key="two" openApiStore={openAPIStore} />,
  }

  addComponent = (event) => {
    const name = event.target.id;
    const c = _.get(this.components, name);
    if (c) {
      global.log.info(`adding ${name} to destkop`);
      this.props.store.add(name, c);
    }
  }

  render() {
    return (
      <Col sm="2">
        <Nav vertical>
          <NavItem className="p-2">
            <Button id="openapi" onClick={this.addComponent}>
              OpenAPI
            </Button>
          </NavItem>
          <NavItem className="p-2">
            <Button id="another" onClick={this.addComponent}>
              Another
            </Button>
          </NavItem>
          <NavItem className="p-2">
            <Link to="/mailing">Mailings</Link>
          </NavItem>
          <NavItem className="p-2">
            <Link to="/">Courses</Link>
          </NavItem>
          <NavItem className="p-2">
            <Link to="/worldmap">World Map</Link>
          </NavItem>
        </Nav>
      </Col>
    );
  }
}

export default NavGutter;
