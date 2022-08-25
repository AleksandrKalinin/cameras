import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class Breadcrumbs extends Component {
  render(){
    return (
        <Breadcrumb tag="nav" listTag="div" style={{marginBottom: 0}} >
          <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Cameras</BreadcrumbItem>
        </Breadcrumb>
    );
  }
};

export default Breadcrumbs;