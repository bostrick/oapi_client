
import _ from 'lodash';
import { Col, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
// import appDesktopStore from '../Desktop/store';

import openAPIStore from '../../store/openapi';
import OpenAPIView from '../OpenAPIView';
import WorldMap from '../WorldMap';

/* eslint  jsx-a11y/anchor-is-valid: "off" */

@inject('desktop') @observer
class NavGutter extends React.Component {

  static propTypes = {
    desktop: PropTypes.observableObject.isRequired,
  }

  components = {
    openapi: () => ({
      component: <OpenAPIView openApiStore={openAPIStore} />,
      title: 'OpenAPI View',
    }),
    another: () => ({
      component: <OpenAPIView openApiStore={openAPIStore} />,
      title: 'Another OpenAPI View',
    }),
    labenv: () => ({
      component: <WorldMap />,
      title: 'WorldMap',
    }),
  }

  addComponent = (event) => {
    const name = event.target.id;
    const f = _.get(this.components, name);
    if (f) {
      global.log.info(`adding ${name} to destkop`);
      const obj = f();
      this.props.desktop.add(name, obj.component, { title: obj.title });
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
            <Button id="labenv" onClick={this.addComponent}>
              Lab Environment Mapping
            </Button>
          </NavItem>
        </Nav>
      </Col>
    );
  }
}

export default NavGutter;
