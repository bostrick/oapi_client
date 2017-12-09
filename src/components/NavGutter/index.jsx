
import _ from 'lodash';
import { Col, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import appDesktopStore from '../Desktop/store';

import openAPIStore from '../../store/openapi';
import OpenAPIView from '../OpenAPIView';

/* eslint  jsx-a11y/anchor-is-valid: "off" */

class NavGutter extends React.Component {

  static components = {
    openapi: <OpenAPIView openApiStore={openAPIStore} />,
    another: <OpenAPIView openApiStore={openAPIStore} />,
  }

  addComponent = (name) => {
    const c = _.get(this.components, name);
    if (c) {
      appDesktopStore.add(name, c);
    }
  };

  render() {
    return (
      <Col sm="2">
        <Nav vertical>
          <NavItem className="p-2">
            <Button onClick={this.addComponent('openapi')}>
              OpenAPI
            </Button>
          </NavItem>
          <NavItem className="p-2">
            <Button onClick={this.addComponent('another')}>
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
