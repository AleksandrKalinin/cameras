let initialState = {
		
};

let reducer = (state = initialState , action) =>{
	switch(action.type){
		case 'CONSOLE_CURRENT_STORE':
			return{
				...state
			}
		case 'GET_CAMERAS':
			return{
				...state
			}
		case 'OPEN_MODAL':
			return{
				...state,
				modalOpen: true
			}		
		case 'ADD_ITEM_TO_CART':
			return{
				...state,
				cartItems: [...state.cartItems, action.item]

			}
		case 'ADD_ADDITIONAL_ITEM_TO_CART':
			return{
				...state		

			}			
		case 'DELETE_ITEM_FROM_CART':
			return{
				cartItems: [...state.cartItems.slice(0, action.id), ...state.cartItems.slice(action.id + 1)]

			}			
		case 'ADD_ITEM_TO_COMPARISON':
			return{
				comparisonItems: [...state.comparisonItems, action.item]
			}
		case 'DELETE_ITEM_FROM_COMPARISON':
			return{
				...state,
				comparisonItems: [...state.comparisonItems]
			}
		case 'FETCH_ITEMS_SUCCESS': 
			return{
				items: [...state.items, action.items],
				pending: false
			}
		case 'FETCH_ITEMS_PENDING':
			return{
				...state,
				pending: true
			}
		case 'FETCH_ITEMS_ERROR':
			return{
				...state,
				pending: false,
				error: action.error
			}
		case 'FETCH_ITEMS':
			return{
				...state
			}								

		default: return state
	}
}

export default reducer;