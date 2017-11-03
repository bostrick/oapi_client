
import {
  Row, Nav,
} from 'reactstrap';
import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  render() {
    return (
      <Row>
        <Nav className="col-sm-3 col-md-2 hidden-xs-down bg-light sidebar">
          <h3>Sidebar</h3>
          {this.props.sidebar}
        </Nav>
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h1>Dashboard</h1>
          {this.props.children}
        </main>
      </Row>
    );
  }
}

Dashboard.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
export default Dashboard;
