
import {
  Navbar, NavbarBrand, Nav,
  NavItem, NavLink, NavbarToggler, Collapse,
} from 'reactstrap';
import React from 'react';
import './style.css';

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="dark" className="row navbar-dark navbar-expand-md">
        <NavbarBrand href="/">
          <img src="/static/img/rh_logo.png" alt="showman" />
          <span className="logo p-2 border-left border-white">
            OLE Admin Portal
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/RedHatTraining">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavHeader;
