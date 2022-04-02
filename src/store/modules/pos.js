const state = () => ({
		cart: {
            customerID: null,
            items: []
        },
		coupon: '',
        paymentType: 'tnbc',
		isProcessingPayment: false
	})

const mutations = {
    UPDATE_CART(state, payload) {
        state.cart = payload

    },
    ADD_ITEM_TO_CART(state, payload) {
        const cart = state.cart

        if (cart.items.length) {
            const exists = cart.items.filter(i => i.item_id === payload.item_id)
            
            if (exists.length) {
                exists[0].quantity += 1
            
            } else {
                payload.quantity = 1
                cart.items.push(payload)
                
            }
        } else {
            payload.quantity = 1
            cart.items.push(payload)

        }
    },
    ADD_QUANTITY_TO_ITEM(state, payload) {
        let item = state.cart.items.filter(item => item.item_id === payload)[0]
        item.quantity += 1

    },
    REMOVE_QUANTITY_TO_ITEM(state, payload) {
        let item = state.cart.items.filter(item => item.item_id === payload)[0]
        item.quantity -= 1

    },
    DELETE_CART_ITEM(state, payload) {
        state.cart.items = state.cart.items.filter(item => item.item_id !== payload)

    },
    UPDATE_INVOICE_NUMBER(state, payload){
        state.cart = {...state.cart, ...payload}

    },
    UPDATE_PAYMENT_METHOD(state, payload){
        state.paymentType = payload

    },
    UPDATE_COUPON(state, payload){
        state.coupon = payload

    },
    UPDATE_IS_PROCESSING_PAYMENT(state, payload){
        state.isProcessingPayment = payload

    },
    ADD_CUSTOMER_TO_CART(state, payload){
        state.cart.customerID = payload

    }
}
const actions = {
    setCart(context, payload){
        context.commit('UPDATE_CART', payload)

    },
    addItemToCart(context, payload){
        context.commit('ADD_ITEM_TO_CART', payload)

    },
    addQuantityToItem(context, payload){
        context.commit('ADD_QUANTITY_TO_ITEM', payload)

    },
    removeQuantityToItem(context, payload){
        if (payload.quantity > 1){
            context.commit('REMOVE_QUANTITY_TO_ITEM', payload.id)
            
        } else {
            context.commit('DELETE_CART_ITEM', payload.id)
            
        }
    },
    deleteCartItem(context, payload) {
        context.commit('DELETE_CART_ITEM', payload)

    },
    setInvoiceNumber(context, payload){
        context.commit('UPDATE_INVOICE_NUMBER', payload)

    },
    setPaymentMethod(context, payload){
        context.commit('UPDATE_PAYMENT_METHOD', payload)

    },
    setCoupon(context, payload){
        context.commit('UPDATE_COUPON', payload)

    },
    setIsProcessingPayment(context, payload){
        context.commit('UPDATE_IS_PROCESSING_PAYMENT', payload)

    },
    addCustomerToCart(context, payload){
        context.commit('ADD_CUSTOMER_TO_CART', payload)

    }
}
const getters = {
    isProcessingPayment: (state) => {
        return state.isProcessingPayment

    },
    cart: (state) => {
        return state.cart

    }
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}