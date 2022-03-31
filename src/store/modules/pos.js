const state = () => ({
		cart: {},
		coupon: '',
		isProcessingPayment: false
	})

const mutations = {
    UPDATE_CART(state, payload){
        state.cart = payload
    },
    UPDATE_INVOICE_NUMBER(state, payload){
        state.cart = {...state.cart, ...payload}
    },
    UPDATE_PAYMENT_METHOD(state, payload){
        state.cart = {...state.cart, ...payload}
    },
    UPDATE_COUPON(state, payload){
        state.coupon = payload
    },
    UPDATE_IS_PROCESSING_PAYMENT(state, payload){
        state.isProcessingPayment = payload
    },
    ADD_CUSTOMER_TO_CART(state, payload){
        state.cart = {...state.cart, ...payload}
        console.log(`added customer with id ${payload.customerId} to cart`)
    }
}
const actions = {
    setCart(context, payload){
        context.commit('UPDATE_CART', payload)
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
    }
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}