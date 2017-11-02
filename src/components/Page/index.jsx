
import { Container } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
  render() {
    return (
      <Container fluid>
        { this.props.children }
      </Container>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
