
import {
  Navbar, NavbarBrand, Nav,
  NavItem, NavLink, NavbarToggler, Collapse,
} from 'reactstrap';
import React from 'react';

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
      <Navbar light color="light" className="navbar-expand-md">
        <NavbarBrand href="/">oai_client</NavbarBrand>
        <NavbarToggler right onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavHeader;
