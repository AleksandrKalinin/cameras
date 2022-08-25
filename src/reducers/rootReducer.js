//import {routerReducer} from 'react-router-redux';
import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import reducer from './index';


let createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	reducer: reducer
}) 


export default createRootReducer;