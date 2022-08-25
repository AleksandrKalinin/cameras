import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Cart from './Cart';
import Cameras from './Cameras'

import {Provider} from 'react-redux';

import {ConnectedRouter} from 'connected-react-router';
import configureStore, {history} from './store/index';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";



let initialState = {
	cartItems: []
}

let store = configureStore(initialState)

ReactDOM.render(
	<Router>
		 <Provider store = {store}>
			<div className="router-wrapper">
				<ConnectedRouter history={history}>
				    <Route exact path="/" component={Cameras}/>
				    <Route exact path="/cart" component={Cart} />
				</ConnectedRouter>    
			</div>
		</Provider>
	</Router>, document.getElementById('root'));
