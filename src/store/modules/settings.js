const state = () => ({
	currency: '',
	currencySign: '',
	taxRate: 0,
	TNBCRate: 0
})
const mutations = {
	UPDATE_CURRENCY(state, payload){
		state.currency = payload
	},
	UPDATE_CURRENCY_SIGN(state, payload){
		state.currencySign = payload
	},
	UPDATE_TAX_RATE(state, payload){
		state.taxRate = payload
	},
	UPDATE_TNBC_RATE(state, payload){
		state.TNBCRate = payload
	}
}
const actions = {
	setCurrency(context, payload){
		context.commit('UPDATE_CURRENCY', payload.currency)
		context.commit('UPDATE_CURRENCY_SIGN', payload.currencySign)
	},
	setTaxRate(context, payload){
		context.commit('UPDATE_TAX_RATE', payload)
	},
	setTNBCRate(context, payload){
		context.commit('UPDATE_TNBC_RATE', payload)
	},
}
const getters = {
	currency: (state) => {
		return `${state.currencySign}${state.currency}`
	},
	cartCurrency: (state) => (payment_method) => {
		if (payment_method !== 'tnbc'){
			return state.currency
		} else return payment_method.toUpperCase()
	}
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}