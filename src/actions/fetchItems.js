import actions from './index.js';
//import {fetchItemsPending, fetchItemsSuccess, fetchItemsError} from './index.js'
import axios from 'axios';
import items from './items.json';
import thunk from 'redux-thunk';


function fetchItems()  {
       actions.fetchItemsPending()
       axios.get('./items.json')
        .then(res => {
            const items = res.data;
            actions.fetchItemsSuccess(items)
        })
};

export default fetchItems;

