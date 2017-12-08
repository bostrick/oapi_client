
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

/* eslint  jsx-a11y/anchor-is-valid: "off" */

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <NavItem>
          <Link to="/openapi">OpenAPI</Link>
        </NavItem>
        <NavItem>
          <Link to="/mailing">Mailings</Link>
        </NavItem>
        <NavItem>
          <Link to="/">Courses</Link>
        </NavItem>
        <NavItem>
          <Link to="/worldmap">World Map</Link>
        </NavItem>
      </div>
    );
  }
}

export default Sidebar;
