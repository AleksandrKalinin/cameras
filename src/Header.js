import React, {Component} from 'react';
import { Collapse,  Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from "react-router-dom";

class Header extends Component {
  render(){
    return (
      <Navbar className="p-3 mb-2 bg-primary text-white" dark>
        <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.props.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link className="nav-link" to="/cameras">Cameras</Link>
            </NavItem>                                          
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
};

export default Header;