
import { Row } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavGutter from '../NavGutter';
import Desktop from '../Desktop';

class Page extends Component {
  render() {
    return (
      <Row className="page">
        <NavGutter />
        <Desktop />
        { this.props.children }
      </Row>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
