
import { Row } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavGutter from '../NavGutter';
import Desktop from '../Desktop';
import Counter from '../Desktop/counter';
import DesktopStore from '../Desktop/store';

const desktopStore = new DesktopStore();

class Page extends Component {
  render() {
    return (
      <Row className="page">
        <NavGutter store={desktopStore} />
        <Desktop store={desktopStore} />
        <Counter store={desktopStore} />
        { this.props.children }
      </Row>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
