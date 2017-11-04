
import {
  NavItem, NavLink,
} from 'reactstrap';
import React from 'react';
// import PropTypes from 'prop-types';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <NavItem>
          <NavLink href="/">Mailings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">Courses</NavLink>
        </NavItem>
      </div>
    );
  }
}

export default Sidebar;
