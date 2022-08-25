import React, {Component} from 'react';
import './App.css';
import { Card,  CardText, CardBody, CardTitle, Button } from 'reactstrap';
import actions from './actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SingleCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: true
    }
  }

  showItem = (id) =>{
    this.props.callbackShow(id);
  }  

  addToCart = (id) =>{
    this.props.callbackAdd(id);
  }

  compareItem = (id) =>{
    this.props.callbackCompareItem(id);
  }  

  addCart = (id) =>{
    let item = this.props.reducer.items.find(x => x.id === id);
    let cartItem = this.props.reducer.cartItems.find(x => x.id === id);
    if (cartItem) {

    }
    else {
      this.props.actions.addItemToCart(item);
    }
  }

  addCompare = (id) =>{
    let item = this.props.items.find(x => x.id === id);
    this.props.actions.addItemToComparison(item);
  }

  openInfo = (id) =>{
    let item = this.props.reducer.items.find(x => x.id === id);
    this.props.actions.addItemToComparison(item);
  }  

  render(){
    return (
      <Card className="card-small" style={{marginBottom: "1rem"}}>
        <div className="card-image">
          <img src={this.props.link} alt="" />                  
        </div>
        <CardBody className="single-card">
          <div className="card-text-wrap">
            <CardTitle><span data-title = "card-title"   className="card-title-link" onClick={this.showItem.bind(this, this.props.id)} >{this.props.name}</span> <span>{this.props.price}$</span></CardTitle>
            <CardText>{this.props.type}</CardText>
          </div>
          <div className="card-buttons">
                     
            <Button color="primary" onClick={this.addCart.bind(this, this.props.id)} block><i className="fas fa-cart-plus"></i> Купить</Button>
          </div>
        </CardBody>  
      </Card>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
   return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard);
