import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import createRootReducer from '../reducers/rootReducer';
import reducer from '../reducers/index';
import items from './items.json'

import {routerMiddleware} from 'connected-react-router';
import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';

export const history = createBrowserHistory();

let initialState = {
	reducer: {
		pending: false,
		items: items,
		cartItems: [],
	}
};


export default function configureStore(){
	let store = createStore(
		createRootReducer(history), 
		initialState, 
		compose(
			applyMiddleware(
				routerMiddleware(history)
			)
		));
	return store;
}

