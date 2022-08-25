import React, {Fragment, Component} from 'react';
import './App.css';
import './media.css';
import 'react-input-range/lib/css/index.css';
import { Collapse,  Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import {Form, FormGroup, FormText} from 'reactstrap';
import SingleCard from './Card';
import SingleItem from './Item';
import PagePagination from './PagePagination'
import axios from 'axios'
import InputRange from 'react-input-range';
import ReactResizeDetector from 'react-resize-detector';
import {CSSTransition} from 'react-transition-group';
import {bindActionCreators} from 'redux';
import actions from './actions/index';
import fetchItems from './actions/fetchItems';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Cameras extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      searchValue: '',
      items: [],
      priceItems: [],
      originalItems: [],
      manufacturers: [],
      matrixTypes: [],
      pixelsNumber: [],
      matrixSizes: [],
      types: [],
      brandsOpen: false,
      cameraTypesOpen: false,
      matrixTypesOpen: false,
      pixelsNumberOpen: false,
      matrixSizesOpen: false,
      value4: { min: 2, max: 10 },
      valueStart: { min: 2, max: 10 },
      isPriceAscending: true,
      isNameAscending: true,
      isPopularityAscending: true,
      visible: 6,
      filters: [],
      startPosition: 0,
      selectedManufacturers: [],
      singleItemVisible: false,
      cartVisible: false,
      activeItem: {},
      cartItems: [],
      alertVisible: false,
      loaded: false,
      checkboxes: [],
      typesVisible: false,
      priceVisible: false,
      brandsVisible: false,
      matrixesVisible: false,
      sizesVisible: false,
      pixelsVisible: false

    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount(){
  	fetchItems();
  	document.addEventListener('click', this.handleClickOutside);
  	if(this.state.cartVisible){
    	document.body.style.overflow = 'hidden';
  	} 
  	
  	axios.get('items.json')
  		.then(response => 
  			this.setState({
  				items: response.data,
  				priceItems: response.data,
  				originalItems: response.data,
  				loaded: true
  			}, () => this.executeFunctions())
  		)  
  }

	componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
	} 

	setWrapperRef(node) {
	  this.wrapperRef = node;
	}

	handleClickOutside(event){
		if(!event.target.classList.contains('card-title-link')){
	    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && (this.state.singleItemVisible  === true)) {
	      this.setState({ singleItemVisible: !this.state.singleItemVisible })
	    }
		}
	} 

  toggleNavbar = () =>{
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  executeFunctions = () =>{
  	this.getManufacturers(this.state.items);
  	this.calcRangeValues();
  }

  calcRangeValues = () =>{
  	let price = this.state.items.map((value, key) => value.price);
  	let minValue = Math.min(...price);
  	let maxValue = Math.max(...price);
  	this.setState({ value4: { min: minValue, max: maxValue }, valueStart: { min: minValue, max: maxValue } } )
  }

  changeSearchValue = (e) =>{
  	this.setState({
  		searchValue: e.target.value
  	})
  }

  getManufacturers = (params) =>{
  	let manufacturers = [];
  	let matrixTypes = [];
  	let matrixTypesCategories = [];
  	let pixelsNumber = [];
  	let pixelsNumberCategories = [];
  	let matrixSizes = [];
  	let matrixSizesCategories = [];
  	let types = [];
  	let typesCategories = [];
  	for (var i = 0; i < params.length; i++) {
  		manufacturers.push(params[i].manufacturer);
  		matrixTypes.push(params[i].matrix_type);
  		pixelsNumber.push(params[i].pixels);
  		matrixSizes.push(params[i].matrix_size);
  		types.push(params[i].type);
  	}
  	manufacturers = [...new Set(manufacturers)];
		matrixTypes = [...new Set(matrixTypes)];
		pixelsNumber = [...new Set(pixelsNumber)];
		matrixSizes = [...new Set(matrixSizes)];
		types = [...new Set(types)]; 
		this.buildCheckboxes(manufacturers);
		this.buildCheckboxes(matrixTypes);
		this.buildCheckboxes(pixelsNumber);
		this.buildCheckboxes(matrixSizes);
		this.buildCheckboxes(types); 	
  	this.setState({
  		manufacturers,
  		matrixTypes,
  		pixelsNumber,
  		matrixSizes,
  		types,
   		matrixTypesCategories,
  		pixelsNumberCategories,
  		matrixSizesCategories,
  		typesCategories
  	})
  }

  buildCheckboxes = (params) => {
		let checkboxes = this.state.checkboxes.slice();
		let temp = [];
		temp.length = params.length;
		temp.fill(false);
		checkboxes.push(temp);
		this.setState({
			checkboxes
		})
  }

  addItem = () =>{
  	let newObject = {};
  	newObject["name"] = "blabla";
  	newObject["price"] = 2330;
  	newObject["photo"] = "camera/17.jpg";
  	let items = this.state.items.slice();
  	items.push(newObject);
  	this.setState({
  		items
  	}) 
  }

  sortByPrice = () =>{
  	let items = this.state.items.slice(); 
		if (this.state.isPriceAscending) {
			this.setState(prevState => { items.sort((a,b) => (a.price - b.price)) })
		}
		else{
			this.setState(prevState => { items.sort((a,b) => (b.price - a.price)) })
		}

		this.setState({
			items,
			isPriceAscending: !this.state.isPriceAscending
		})
  }

  sortByPopularity = () =>{
  	let items = this.state.items.slice(); 
		if (this.state.isPopularityAscending ) {
			this.setState(prevState => { items.sort((a,b) => (a.popularity - b.popularity)) })
		}
		else{
			this.setState(prevState => { items.sort((a,b) => (b.popularity - a.popularity)) })
		}

		this.setState({
			items,
			isPopularityAscending: !this.state.isPopularityAscending
		})
  }  

	sortByName= () =>{
		let items = this.state.items.slice();
		if(this.state.isNameAscending){
			this.setState(prevState => {items.sort((a,b) => a.name.localeCompare(b.name)) });
		} else {
			this.setState(prevState => {items.sort((a,b) => b.name.localeCompare(a.name)) });
		}
		this.setState({
			isNameAscending: !this.state.isNameAscending,
			items,
		})		
	}  

	loadMore = (e) => {
		if (e.target.value === 'Все') {
			this.setState({
				visible: this.state.items.length
			})
		}
		else{
	    this.setState({
	      visible: e.target.value
	    })
		}
	}

	callbackFromPagination = (startPosition) => {
		this.setState({startPosition})
	}

	callbackFromCardShow = (id) => {
		this.setState({activeItem: this.state.items[id - 1], singleItemVisible: true})
	}

	callbackFromCardAdd = (id) => {
		let cartItems = this.state.cartItems;
		let newItem = this.state.items[id - 1];
		let result = cartItems.find(x => x.id === id);
		if ( !result ) {
			newItem["count"] = 1;
			cartItems.push(newItem);
			this.setState({cartItems})			
		}
		else if ( result ) {
			for (var i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id === id) {
            cartItems[i].count++;
        }
			}
			this.setState({cartItems})	
		}

	}	

	closeCart = () =>{
		this.setState({
			cartVisible: false
		})
	}

	addActiveToCart = (id) => {
		let cartItems = this.state.cartItems;
		let newItem = this.state.items[id - 1];
		let result = cartItems.find(x => x.id === id);
		if ( !result ) {
			newItem["count"] = 1;
			cartItems.push(newItem);
			this.setState({cartItems})			
		}
		else if ( result ) {
			for (var i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id === id) {
            cartItems[i].count++;
        }
			}
			this.setState({cartItems})	
		}
	}


	increaseCount = (id, value) =>{
		let cartItems = this.state.cartItems.slice();
		cartItems[id].count = value;
		this.setState({
			cartItems
		})
	}	

	removeItem = (id) =>{
		let cartItems = this.state.cartItems.splice(id, 1);
		this.setState({
			cartItems
		})
		if (cartItems.length === 0) {
			this.setState({
				cartVisible: false			
			})
		}
	}

	applyFilters = () => {
		let filters = this.state.selectedManufacturers;
		let items = this.state.originalItems;
		let newItems = [];
		if (filters.length !== 0) {
			for (var i = 0; i < items.length; i++) {
				let item = items[i];
				let count = 0;
				for (var j = 0; j < filters.length; j++) {
					let currentCategory = Object.keys(filters[j])
					let itemKeys = Object.keys(item);
					let itemValues = Object.values(item);
					let currentValue = Object.values(filters[j]);
					let indexOfKey = itemKeys.indexOf(currentCategory[0])
					if (itemValues[indexOfKey] === currentValue[0]) {
						count++
					} 
				}
				if(count === filters.length){
					newItems.push(item);
				}
			}
			this.setState({
				items: newItems,
				priceItems: newItems
			}, () => this.calcRangeValues())			

		}
		else{
			this.setState({
				items, priceItems: items
			})
		}
	} 

	setCheckbox = (e) =>{
		let selectedManufacturers = this.state.selectedManufacturers;
		let dataName = e.target.getAttribute("data-name");
		let type = e.target.getAttribute("name");
		let dataIndex = e.target.getAttribute("data-index");
		let checkboxes = document.querySelectorAll('[name=' + type);
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].getAttribute("data-index") !== dataIndex ) {
				checkboxes[i].checked = false
			}
		}

		let newObject = {};
		newObject[type] = dataName;
	
		if (selectedManufacturers.length !== 0) {
			selectedManufacturers = selectedManufacturers.filter(e =>  Object.getOwnPropertyNames(e)[0] !== type )  ;
		}
		if (e.target.checked) {
			selectedManufacturers.push(newObject)
		}
		else{
			selectedManufacturers = selectedManufacturers.filter(e => e[type] !== dataName);
		}
		
		this.setState({
			selectedManufacturers
		}, () => this.applyFilters() )	
	}

	clearFilters = () =>{
		let checkboxes = document.getElementsByClassName('checkbox-input');

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false
		}  
		this.setState({
			selectedManufacturers: [],
			items: this.state.originalItems
		}, () => this.getManufacturers(this.state.items) )
	}


	onDismiss =() =>{
		this.setState({alertVisible: false})
	}

	showCart = () =>{
		if (this.state.cartItems.length) {
			this.setState({ cartVisible: true })
		}

		else{
			alert("Cart is empty!");
		}
	}

	changeMinPrice = (e) =>{
		let value4 = this.state.value4;
		if ( (e.target.value >= this.state.valueStart.min ) && (e.target.value <= this.state.valueStart.max) )  {
			value4.min = e.target.value;
			this.setState({ value4})			
		}
		else{
			value4.min = this.state.valueStart.min;
			this.setState({ value4 })
		}		
	}

	changeMaxPrice = (e) =>{
		let value4 = this.state.value4;
		if ( (e.target.value <= this.state.valueStart.max) && (e.target.value >= this.state.valueStart.min) ) {
			value4.max = e.target.value;
			this.setState({ value4})			
		}
		else{
			value4.max = this.state.valueStart.max;
			this.setState({ value4 })
		}
		
	}	

	filterByPrice = (value) => {
		let items = this.state.items.filter((item,i) => item.price >= value.min  && item.price <= value.max );
		this.setState({ value4: value, priceItems: items })
	}

	addToCart = () =>{
		this.props.actions.addItemToCart({name: 'bla', id: 1})
	}

	deleteFromCart = (id) =>{
		this.props.actions.deleteItemFromCart(id)
	}

	checkLinkCart = (e) =>{
		if (this.props.reducer.cartItems.length === 0) {
			e.preventDefault();
			alert('Корзина пуста!');
		}
	}	
	
  render(){
  	let filteredItems;
  	if (this.state.priceItems) {
	  	filteredItems = this.state.priceItems.filter(
	  		(word) =>{
	  			return word.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
	  		}
	  	) 
  	}

    return (
      <Fragment>
        <Navbar className="p-3 mb-2 bg-primary text-white" dark>
          <NavbarBrand href="/" className="mr-auto">Каталог</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link className="nav-link" to="/">Камеры</Link>
              </NavItem>                                          
            </Nav>
          </Collapse>
        </Navbar>
        <Container >
        	<Row>
	            <Col md="12">
	            	<div className="breadcrumbs-wrapper">
	            		<div className="input-wrapper">
		                    <InputGroup >
		                      <Input className="search-input" placeholder="Искать" value={this.state.searchValue} onChange={this.changeSearchValue} />
		                      <InputGroupAddon addonType="append">
		                        <InputGroupText><i className="fas fa-search"></i></InputGroupText>
		                      </InputGroupAddon>
		                    </InputGroup>
			                    <Link to='/cart' onClick={this.checkLinkCart}>
				                    <Button  color="primary">
				                    	<span className="button-icon">
											<i className="fas fa-cart-plus"></i>
										</span>
										<span className="button-text">Корзина</span>			                    	
				                    </Button>		                    	
			                    </Link>			                    
	            		</div>
	            	</div>	
	            </Col>        		
        	</Row>
        </Container>    
        {filteredItems ?
	        <Container style={{ marginTop: '1rem', marginBottom: '1rem' }}>
	          <Row>
	            <Col md="12" lg="3" >
				    <Form className="form-menu" >
	        			<ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
						<div className="form-header">
							Категории
						</div>
				      <FormGroup check>
				        <FormText onClick={() => this.setState({ brandsVisible: !this.state.brandsVisible })}>
				        	Бренды
				          	{this.state.brandsVisible ? <span><i className="fas fa-caret-up"></i></span> : null}
				          	{this.state.brandsVisible ? null : <span><i className="fas fa-caret-right"></i></span>}				        	
				        </FormText>
				        <CSSTransition in={this.state.brandsVisible}
	  								   timeout={0}
	  								   classNames='list-transition'
	  								   unmountOnExit appear>
					        <div className="form-checkbox_wrapper">
						      	{this.state.manufacturers.map((item, index) =>
							        <Label className="checkbox-container" check key={index} >
							          <Input className="checkbox-input" type="checkbox" name="manufacturer" data-name={item} data-index={index} onChange={ this.setCheckbox} />
							          <span className="checkmark"></span>
							          {item}
							        </Label>
						      	)}			        
					        </div>			        	
				        </CSSTransition>			        
				      </FormGroup>
				      <FormGroup check>
				        <FormText onClick={() => this.setState({ typesVisible: !this.state.typesVisible })}>
				          	Тип камеры
				          	{this.state.typesVisible ? <span><i className="fas fa-caret-up"></i></span> : null}
				          	{this.state.typesVisible ? null : <span><i className="fas fa-caret-right"></i></span>}
				        </FormText>
				        <CSSTransition in={this.state.typesVisible}
	  								   timeout={0}
	  								   classNames='list-transition'
	  								   unmountOnExit appear>
					        <div className="form-checkbox_wrapper">
						      	{this.state.types.map((item, index) =>
							        <Label className="checkbox-container" check key={index} >
							          <Input className="checkbox-input" type="checkbox" data-name={item} data-index={index} name="type" onChange={ this.setCheckbox} />
							          <span className="checkmark"></span>
							          {item}
							        </Label>
						      	)}			        
					        </div>			        	
				        </CSSTransition>
				      </FormGroup>
				      <FormGroup check className="input-range-wrapper">
				        <FormText onClick={() => this.setState({ priceVisible: !this.state.priceVisible })}>
				          	Цена
				          	{this.state.priceVisible ? <span><i className="fas fa-caret-up"></i></span> : null}
				          	{this.state.priceVisible ? null : <span><i className="fas fa-caret-right"></i></span>}				          	
				        </FormText>
				        <CSSTransition in={this.state.priceVisible}  timeout={0}  classNames='list-transition' unmountOnExit appear>
					        <Fragment>
					        	<div className="input-range_price">
					        		<label>От <Input onChangeComplete={this.changeMinPrice} onChange={this.changeMinPrice} value={this.state.value4.min} /> </label>
					        		<label>До <Input onChangeComplete={this.changeMaxPrice} onChange={this.changeMaxPrice} value={this.state.value4.max} /> </label>
					        	</div>
					        	<div className="form-checkbox_wrapper">
									<InputRange
										maxValue={this.state.valueStart.max}
										minValue={this.state.valueStart.min}
										formatLabel={value => value}
										value={this.state.value4}
										onChange={this.filterByPrice }
										/>			        		
					        	</div>
					        </Fragment>			        	
				        </CSSTransition>			        	
				      </FormGroup>
				      <FormGroup check>
				        <FormText onClick={() => this.setState({ matrixesVisible: !this.state.matrixesVisible })}>
				          	Тип матрицы
				          	{this.state.matrixesVisible ? <span><i className="fas fa-caret-up"></i></span> : null}
				          	{this.state.matrixesVisible ? null : <span><i className="fas fa-caret-right"></i></span>}				          	
				        </FormText>
				        <CSSTransition in={this.state.matrixesVisible}  timeout={0}  classNames='list-transition' unmountOnExit appear>
					        <div className="form-checkbox_wrapper">
						      	{this.state.matrixTypes.map((item, index) =>
							        <Label className="checkbox-container" check key={index} >
							          <Input className="checkbox-input" type="checkbox" data-name={item} data-index={index} name="matrix_type" onChange={ this.setCheckbox} />
							          <span className="checkmark"></span>
							          {item}
							        </Label>
						      	)}
					        </div>			        	
				        </CSSTransition>			        
				      </FormGroup>
				      <FormGroup check>
				        <FormText onClick={() => this.setState({ pixelsVisible: !this.state.pixelsVisible })}>
				          	Кол-во точек матрицы
				          	{this.state.pixelsVisible ? <span><i className="fas fa-caret-up"></i></span> : null}
				          	{this.state.pixelsVisible ? null : <span><i className="fas fa-caret-right"></i></span>}				          	
				        </FormText>
				        <CSSTransition in={this.state.pixelsVisible}  timeout={0}  classNames='list-transition' unmountOnExit appear>
					        <div className="form-checkbox_wrapper">				      
						      	{this.state.pixelsNumber.map((item, index) =>
							        <Label className="checkbox-container" check key={index} >
							          <Input className="checkbox-input" type="checkbox" data-name={item} data-index={index} name="pixels" onChange={ this.setCheckbox} />
							          <span className="checkmark"></span>
							          {item}
							        </Label>
						      	)}
						      </div>			        	
				        </CSSTransition>			        
				      </FormGroup>
				      <FormGroup check>
				        <FormText onClick={() => this.setState({ sizesVisible: !this.state.sizesVisible })}>
				          	Размер матрицы
				          	{this.state.sizesVisible ? <span><i className="fas fa-caret-up"></i></span> : null}
				          	{this.state.sizesVisible ? null : <span><i className="fas fa-caret-right"></i></span>}				          	
				        </FormText>
				        <CSSTransition in={this.state.sizesVisible}  timeout={0}  classNames='list-transition' unmountOnExit appear>
					        <div className="form-checkbox_wrapper" >
						      	{this.state.matrixSizes.map((item, index) =>
							        <Label className="checkbox-container" check key={index} >
							          <Input className="checkbox-input" type="checkbox" data-name={item} data-index={index} name="matrix_size" onChange={ this.setCheckbox} />
							          <span className="checkmark"></span>
							          {item}
							        </Label>
						      	)}			          
					        </div>			        	
				        </CSSTransition>			        
				      </FormGroup>
				      	<FormText className="form-checkbox_wrapper form-checkbox_wrapper-selected">
				          	Выбрано товаров: {filteredItems.length}
				        </FormText>
				      {this.state.selectedManufacturers.length ?
					      <div className="form-button_wrapper">
							<Button color="primary" className="form-button" onClick={this.clearFilters} >Сбросить фильтры</Button>
					      </div>
				      : null}   			      
				    </Form>            
	            </Col>
	            {this.state.loaded ?
	            <Col md="12" lg="9" >
	              <Row>
	                <Col md="12">
	                  <div className="menu-panel">
					      <Nav>
					        <NavItem>
					          <NavLink onClick={this.sortByPrice} href="#">По цене</NavLink>
					        </NavItem>
					        <NavItem>
					          <NavLink onClick={this.sortByName} href="#">Название</NavLink>
					        </NavItem>
					        <NavItem>
					          <NavLink onClick={this.sortByPopularity} href="#">Популярность</NavLink>
					        </NavItem>
					      </Nav>
					      <Form className="form-nav">
						      <FormGroup className="pages-form">
						        <Label for="exampleSelect">Показывать на странице</Label>
						        <Input type="select" name="select" id="exampleSelect" onChange={this.loadMore} >
						          <option>6</option>
						          <option>12</option>
						          <option>18</option>
						          <option>20</option>
						          <option>Все</option>
						        </Input>
						      </FormGroup>
					      </Form>
	                  </div>
	                </Col>
	              </Row>
	              <Row>{filteredItems.length ?
		              <Fragment>
		                {filteredItems.splice(this.state.startPosition, this.state.visible).map((item,index) =>
		                  <Col md="6" lg="6" xl="4" sm="6" xs="12" key={index}>
		                    <SingleCard callbackShow={this.callbackFromCardShow} 
		                    			callbackAdd={this.callbackFromCardAdd}
		                    			callbackCompareItem={this.compareItem} 
		                    			id={item.id} 
		                    			name={item.name} 
		                    			type = {item.type} 
		                    			price={item.price} 
		                    			link={item.photo}
		                    			image={item.image} />
		                  </Col>
		                )}
		               </Fragment>
	              : <div className="no-items-container">
	              Sorry! No items were found.</div> }
	              </Row>
	              <Row>
	               {filteredItems.length ?
		                <Col md="12">
		                  <PagePagination 
		                  	callbackFromApp={this.callbackFromPagination} 
		                  	items={this.state.items} 
		                  	visible={this.state.visible} />
		                </Col>
	               : null}
	              </Row>
	            </Col>
	            : null}
	          </Row>
	        </Container>
        : null}
        <Fragment>
          {this.state.singleItemVisible ?
              <div className="single-item-container">
              	<div className="single-item-wrapper">
	              	<Container>
		              <Row>
		              	<div className="single-item-ref-wrapper" ref={this.setWrapperRef}>
			                <Col md={{ size: 12, offset: 0 }} className="single-item-card" >
			                	<SingleItem callbackAddActiveToCart={this.addActiveToCart}
			                				callbackAddActiveToComparison={this.addActiveToComparison}
			                				activeItem = {this.state.activeItem} />
			                </Col>
		                </div>              	
		              </Row>
		            </Container>
              	</div>
              </div>
          : null            
      }	
          </Fragment>

        <Navbar className="p-3 mb-2 bg-primary footer text-white" dark>

        </Navbar>         
      </Fragment>    
    );
  }
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps (dispatch) {
    return { actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cameras);

