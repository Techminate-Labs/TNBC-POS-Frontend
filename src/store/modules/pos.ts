import { Cart, CartItems } from '@/types/pos/Cart'

export const PosModule = {
	namespaced: true,
	state: () => ({
		cart: {} as Cart,
		coupon: '' as string,
		isProcessingPayment: false as boolean
	}),
	mutations: {
		UPDATE_CART(state: any, payload: any){
            state.cart = {...state.cart, payload}
        },
		ADD_ITEM_TO_CART(state: any, cartItem: CartItems){
            state.cart.cartItems.push(cartItem)
        },
		REMOVE_ITEM_FROM_CART(state: any, item_id: number){
            const filteredCartItems = state.cart.cartItems.filter((item: CartItems) => {
                return item.item_id !== item_id
            })
            
            state.cart.cartItems = filteredCartItems

        },
		ADD_QUANTITY_TO_CART_ITEM(state: any, payload: CartItems){
            // state.cart.cartItems.push(payload)
        },
		REMOVE_QUANTITY_TO_CART_ITEM(state: any, payload: CartItems){
            // state.cart.cartItems.push(payload)
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
	actions: {
		setCart(context: any, payload: any){
            context.commit('UPDATE_CART', payload)
        },
        addItemToCart(context: any, payload: any){
            context.commit('ADD_ITEM_TO_CART', payload)
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