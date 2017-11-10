
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
// import PropTypes from 'prop-types';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <NavItem>
          <Link to="/openapi">OpenAPI</Link>
        </NavItem>
        <NavItem>
          <Link to="/mailings">Mailings</Link>
        </NavItem>
        <NavItem>
          <Link to="/">Courses</Link>
        </NavItem>
      </div>
    );
  }
}

export default Sidebar;
