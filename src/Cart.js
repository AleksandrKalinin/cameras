import React, {Fragment, Component} from 'react';
import './App.css';
import { Table } from 'reactstrap';
import {Container, Row, Col, Input, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import equal from 'fast-deep-equal'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actions from './actions'
import {Link} from 'react-router-dom';
import { push } from 'connected-react-router';

class Cart extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      items: [],
      shown: false,
      totalPrice: 0,
      count: 5,
      quantity: [],
      interval: null

    }
  }

  componentDidMount(){
    if (this.props.reducer.cartItems.length == 0) {
    	//this.setState({ interval:  })
    	this.setRedirect();
    }

    let quantity = Array(this.props.reducer.cartItems.length).fill(1);
    this.setState({
    	quantity
    }, () => this.getTotalPrice())


  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.reducer.cartItems, prevProps.reducer.cartItems)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.getTotalPrice();
    }
  }  

  consoleProps = () =>{
    
  }

  setRedirect = () =>{
  	let interval = this.state.interval;
	interval = setInterval(() => this.countSeconds(), 1000)
	this.setState({ interval })  	
  	//redirect here 
  	//interval = setInterval(() => this.startCycle(), 1000)
  }

  countSeconds = () =>{
  	if(this.state.count > 1){
  		this.setState({
  			count: this.state.count - 1
  		})
  	}
  	else{
  		let interval = this.state.interval;
  		clearInterval(interval);
  		this.setState({interval});
  		this.props.push('/'); 
  	}  	
  }

  addToCard = (id) =>{
    this.props.callbackFromApp(id);
  }

  changeCount = (e) =>{
    let index = e.target.getAttribute("data-index");
    let value = e.target.value;
    let quantity = this.state.quantity.slice();
    quantity[index] = Number(value);
    this.setState({
    	quantity
    }, () => this.getTotalPrice())
  }

  removeFromCart = (id) =>{
  	let quantity = this.state.quantity.slice();
  	quantity = [...quantity.slice(0, id), ...quantity.slice(id + 1)]
  	this.setState({
  		quantity
  	}, () => this.checkQuantity())
    this.props.actions.deleteItemFromCart(id);
  }

  checkQuantity = () =>{
  	if (this.state.quantity == 0) {
  		this.setRedirect();
  	}
  }

  closeCart = () =>{
    this.props.callbackCloseCart();
  }

  getTotalPrice = () =>{
    let cartItems = this.props.reducer.cartItems.slice();
    let quantity = this.state.quantity;
    let totalPrice = 0;    
    for (var i = 0; i < cartItems.length; i++) {
    	totalPrice += cartItems[i].price * quantity[i]
    } 
    this.setState({
      totalPrice,
      items: this.props.reducer.cartItems
    })

  }
  consoleState = () =>{
  	console.log(this.state)
  }

  render(){
    return (
      <Fragment>
      	{this.state.items.length ?
	      <div className="empty-cart">
		      <Container>
		      	<Row>
		      		<Col md="12">
				        <div className="cart-table-wrapper">
				            <Table bordered className="cart-table">
				              <thead>
				                <tr>
				                  <th className="w-40">Наименование товара</th>
				                  <th className="w-10">Шт.</th>
				                  <th className="w-20">Цена за шт</th>
				                  <th className="w-20">Итого</th>
				                  <th className="w-20"></th>
				                </tr>
				              </thead>
				              <tbody>
				              <TransitionGroup component={null}>
				              {this.props.reducer.cartItems.map((item, index) =>
				                <CSSTransition key={index} timeout={200} classNames="move">
				                  <tr key={index} >
				                        <td className="w-40 cart-image-wrapper" ><div className="cart-image"><img src={item.photo} /></div> {item.name}</td>
				                        <td className="w-10 align-middle cart-input" ><Input data-index={index} value={this.state.quantity[index]} min="1" onChange={this.changeCount} type="number" /></td>
				                        <td className="w-20 align-middle">{item.price}</td>
				                        <td className="w-20 align-middle">{item.price}</td>
				                        <td className="w-10 align-middle cart-icon"><span className="remove-icon" onClick={this.removeFromCart.bind(this, index)}><i className="fas fa-times"></i></span></td>              
				                  </tr>
				                </CSSTransition>                 
				              )}
				              </TransitionGroup> 
				              </tbody>
				            </Table>
				          <div className="total-price">Всего: {this.state.totalPrice}$</div>
				          <div className="cart-buttons">
				            <Button color="primary" className="cart-button" >Купить</Button>
				            <Link className="cart-link" to='/'>
				                <Button className="cart-button" color="info">
									         <span className="button-text">Закрыть</span>			                    	
				                </Button>		                    	
				            </Link>         
				          </div>
				        </div>
		      		</Col>
		      	</Row>
		      </Container>
	      </div>      		
      	: null}
      	{this.state.items.length ? null :
	      <div className="empty-cart">
	      <p className="empty-cart__text">
				Your cart is empty! You will be redirected to main page in {this.state.count} seconds
	      </p>
            <Link to='/'>
                <Button  color="primary">
					<span className="button-text">Перейти</span>			                    	
                </Button>		                    	
            </Link>
	      </div>
      	}
      </Fragment>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps (dispatch) {
    return {push: bindActionCreators(push, dispatch),
    actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
