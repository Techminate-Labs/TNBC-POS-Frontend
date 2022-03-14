export const PosModule = {
	namespaced: false,
	state: () => ({
		cart: {},
		coupon: '',
		isProcessingPayment: false
	}),
	mutations: {
		UPDATE_CART(state: any, payload: any){
            state.cart = payload
        },
        UPDATE_INVOICE_NUMBER(state: any, payload: any){
            state.cart = {...state.cart, ...payload}
        },
        UPDATE_PAYMENT_METHOD(state: any, payload: any){
            state.cart = {...state.cart, ...payload}
        },
        UPDATE_COUPON(state: any, payload: any){
            state.coupon = payload
        },
        UPDATE_IS_PROCESSING_PAYMENT(state: any, payload: any){
            state.isProcessingPayment = payload
        }
	},
	action: {
		setCart(context: any, payload: any){
            context.commit('UPDATE_CART', payload)
        },
        setInvoiceNumber(context: any, payload: any){
            context.commit('UPDATE_INVOICE_NUMBER', payload)
        },
        setPaymentMethod(context: any, payload: any){
            context.commit('UPDATE_PAYMENT_METHOD', payload)
        },
        setCoupon(context: any, payload: any){
            context.commit('UPDATE_COUPON', payload)
        },
        setIsProcessingPayment(context: any, payload: any){
            context.commit('UPDATE_IS_PROCESSING_PAYMENT', payload)
        }
	},
	getters: {
		isProcessingPayment: (state: any): boolean => {
            return state.isProcessingPayment
        },
	}
}