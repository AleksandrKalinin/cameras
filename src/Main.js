import React, {Fragment, Component} from 'react';
import './App.css';
import './media.css';
import 'react-input-range/lib/css/index.css';
import { Collapse,  Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import {Form, FormGroup, FormText} from 'reactstrap';
import {Alert} from 'reactstrap';
import Breadcrumbs from './Breadcrumbs'
import SingleCard from './Card';
import ComparisonItems from './ComparisonItems'
import Cart from './Cart';
import SingleItem from './Item';
import PagePagination from './PagePagination'
import axios from 'axios'
import InputRange from 'react-input-range';
import {Link} from "react-router-dom";

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: true
    }
  }

  componentDidMount(){

  }

  toggleNavbar = () =>{
  	this.setState({collapsed: !this.state.collapsed})
  }


  render(){

    return (
      <Fragment>
        <Navbar className="p-3 mb-2 bg-primary text-white" dark>
          <NavbarBrand href="/" className="mr-auto">Каталог</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link className="nav-link" to="/">Main</Link>
              </NavItem>            
              <NavItem>
                <Link className="nav-link" to="/laptops">Laptops</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/cameras">Cameras</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/computers">Computers</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/tablets">Tablets</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/smartphones">Smartphones</Link>
              </NavItem>                                            
            </Nav>
          </Collapse>
        </Navbar>
        <Container >
        	<Row>
	            <Col md="12" lg="12">
	            		<Row>
	            			<Col lg="4" md="6" >
		            			<Link className="nav-link" to="/cameras">
		            				<div className="main-item">
		            					<div className="main-item-image">
		            						<img src="main_camera.jpg" />
		            					</div>

		            					<div className="main-item-description">
		            						<p>Cameras</p>
		            					</div>
		            				</div>
		            			</Link>
	            			</Col>
	            			<Col lg="4" md="6">
		            			<Link className="nav-link" to="/laptops">
		            				<div className="main-item">
		            					<div className="main-item-image">
		            						<img src="main_laptop.jpg" />
		            					</div>

		            					<div className="main-item-description">
		            						<p>Laptops</p>
		            					</div>
		            				</div>
		            			</Link>	
	            			</Col>
	            			<Col lg="4" md="6">
	            				<Link className="nav-link" to="/computers">
		            				<div className="main-item">
		            					<div className="main-item-image">
		            						<img src="main_computer.jpg" />
		            					</div>

		            					<div className="main-item-description">
		            						<p>Computers</p>
		            					</div>
		            				</div>
	            				</Link>
	            			</Col>
	            			<Col lg="4" md="6">
	            				<Link className="nav-link" to="/tablets">
		            				<div className="main-item">
		            					<div className="main-item-image">
		            						<img src="main_tablet.jpg" />
		            					</div>

		            					<div className="main-item-description">
		            						<p>Tablets</p>
		            					</div>
		            				</div>
	            				</Link>
	            			</Col>
	            			<Col lg="4" md="6">
	            				<Link className="nav-link" to="/smartphones">
		            				<div className="main-item">
		            					<div className="main-item-image">
		            						<img src="main_smartphone.jpg" />
		            					</div>

		            					<div className="main-item-description">
		            						<p>Smartphones</p>
		            					</div>
		            				</div>
	            				</Link>
	            			</Col>	            				            				            			
	            		</Row>
	            </Col>        		
        	</Row>
        </Container>    

        <Navbar className="p-3 mb-2 bg-primary footer text-white" dark>

        </Navbar>         
      </Fragment>    
    );
  }
}

export default Main;
