import { Cart, CartItems } from '@/types/pos/Cart'
import { SingleItem } from '@/types/items/Items'

export const PosModule = {
	namespaced: true,
	state: () => ({
		cart: {
            cartItems: [],
            payment_method: ''
        } as Cart,
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
		ADD_QUANTITY_TO_CART_ITEM(state: any, item_id: number){
            state.cart.cartItems.map((item: CartItems) => {
                if (item.item_id === item_id){
                    item.qty += 1
                }
            })
        },
		REMOVE_QUANTITY_FROM_CART_ITEM(state: any, item_id: number){
            state.cart.cartItems.map((item: CartItems) => {
                if (item.item_id === item_id){
                    if (item.qty <= 0)
                        return

                    item.qty -= 1
                }
            })
        },
        UPDATE_INVOICE_NUMBER(state: any, payload: any){
            state.cart = {...state.cart, ...payload}
        },
        UPDATE_PAYMENT_METHOD(state: any, payload: string){
            state.cart.payment_method = payload
        },
        UPDATE_COUPON(state: any, payload: any){
            state.coupon = payload
        },
        UPDATE_IS_PROCESSING_PAYMENT(state: any, payload: any){
            state.isProcessingPayment = payload
        },
        CONVERT_PRICES_TO_USD(state: any, payload: any){
            let items = state.cart.cartItems
    
            items.map((item: CartItems) => {
                item.price = Math.ceil(item.unit_price * payload)
            })
        },
        CONVERT_PRICES_TO_TNBC(state: any, payload: any){
            let items = state.cart.cartItems
    
            items.map((item: CartItems) => {
                item.price = Math.ceil(item.unit_price / payload)
            })
        },
        CONVERT_PRICES_TO_FIAT(state: any, payload: any){
            let stateCartItems = state.cart.cartItems
            let items = payload
            
            stateCartItems.map((stateCartItem) => {
                items.map((item) => {
                    if (stateCartItem.item_id === item.item_id){
                        stateCartItem.unit_price = item.price
                    }
                })
            })
        }
	},
	actions: {
		setCart(context: any, payload: any){
            context.commit('UPDATE_CART', payload)
        },
        addItemToCart(context: any, payload: SingleItem){
            let stateCart = context.state.cart
            const cartItem: CartItems = {
                item_id: payload.item_id,
                item_name: payload.name,
                unit: payload.unit,
                unit_price: payload.price,
                qty: 1
            }
            
            if (stateCart.cartItems.length) {
                const exists = stateCart.cartItems.filter((i: { item_id: Number }) => i.item_id === cartItem.item_id)
                if (exists.length) {
                    context.commit('ADD_QUANTITY_TO_CART_ITEM', cartItem.item_id)
                } else {
                    context.commit('ADD_ITEM_TO_CART', cartItem)
                }
            } else {
                context.commit('ADD_ITEM_TO_CART', cartItem)
            }
        },
        removeItemFromCart(context: any, payload: any){
            context.commit('REMOVE_ITEM_FROM_CART', payload)
        },
        addQuantityToCartItem(context: any, item_id: any){
            context.commit('ADD_QUANTITY_TO_CART_ITEM', item_id)
        },
        removeQuantityFromCartItem(context: any, payload: any){
            context.commit('REMOVE_QUANTITY_FROM_CART_ITEM', payload)
        },
        setInvoiceNumber(context: any, payload: any){
            context.commit('UPDATE_INVOICE_NUMBER', payload)
        },
        setPaymentMethod(context: any, payload: string){
            context.commit('UPDATE_PAYMENT_METHOD', payload)
        },
        setCoupon(context: any, payload: any){
            context.commit('UPDATE_COUPON', payload)
        },
        setIsProcessingPayment(context: any, payload: any){
            context.commit('UPDATE_IS_PROCESSING_PAYMENT', payload)
        },
        convertPricesToUSD(context: any, payload: any){
            context.commit('CONVERT_PRICES_TO_USD', payload)
        },
        convertPricesToTNBC(context: any, payload: any){
            context.commit('CONVERT_PRICES_TO_TNBC', payload)
        },
        convertPricesToFIAT(context: any, payload: any){
            context.commit('CONVERT_PRICES_TO_FIAT', payload)
        }
	},
	getters: {
		isProcessingPayment: (state: any): boolean => {
            return state.isProcessingPayment
        },
        cartSubtotal: (state: any): number => {
            const cartHasItems = state.cart.cartItems.length;
            let total = 0;
            if (cartHasItems) {
                state.cart.cartItems.map((item: CartItems) => {
                    total += item.unit_price * item.qty
                })
            }

            return total
        },
        cartTax: (state: any, getters: any, rootState: any): number => {
            const subTotal = getters.cartSubtotal
            const taxRate = rootState.settings.taxRate / 100
            return subTotal * taxRate
        },
        cartTotal: (state: any, getters: any, rootState: any): number => {
            const subTotal = getters.cartSubtotal
            const taxTotal = getters.cartTax
            return subTotal + taxTotal
        },
	}
}