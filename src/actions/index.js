let actions = {
	consoleCurrentStore: function(){
		return{
			type: 'CONSOLE_CURRENT_STORE'
		}
	},
	openModal: function(){
		return{
			type: 'OPEN_MODAL'
		}
	},
	fetchItemsSuccess: function(items){
		return{
			type: 'FETCH_ITEMS_SUCCESS',
			items: items
		}
	},
	fetchItemsPending: function(){
		return{
			type: 'FETCH_ITEMS_PENDING'
		}
	},
	fetchItemsError: function(error){
		return{
			type: 'FETCH_ITEMS_ERROR',
			error: error
		}
	},
	addItemToCart: function(item){
		return{
			type: 'ADD_ITEM_TO_CART',
			item: item
		}
	},
	addAdditionalItemToCart: function(item){
		return{
			type: 'ADD_ADDITIONAL_ITEM_TO_CART',
			item: item	
		}
	},
	deleteItemFromCart: function(id){
		return{
			type: 'DELETE_ITEM_FROM_CART',
			id: id
		}
	},
	addItemToComparison: function(item){
		return{
			type: 'ADD_ITEM_TO_COMPARISON',
			item: item
		}
	},	
	deleteItemFromComparison: function(item) {
		return{
			type: 'DELETE_ITEM_FROM_COMPARISON',
			item: item
		}
	}
}

export default actions