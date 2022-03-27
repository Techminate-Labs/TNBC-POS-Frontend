const state = () => ({
	currency: '',
	currencySign: ''
})
const mutations = {
	UPDATE_CURRENCY(state, payload){
		state.currency = payload
	},
	UPDATE_CURRENCY_SIGN(state, payload){
		state.currencySign = payload
	}
}
const actions = {
	setCurrency(context, payload){
		context.commit('UPDATE_CURRENCY', payload.currency)
		context.commit('UPDATE_CURRENCY_SIGN', payload.currencySign)
	}
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