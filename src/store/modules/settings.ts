export const SettingsModule = {
	namespaced: false,
	state: () => ({
		currency: '',
		currencySign: ''
	}),
	mutations: {
		UPDATE_CURRENCY(state: any, payload: any){
			state.currency = payload
		},
		UPDATE_CURRENCY_SIGN(state: any, payload: any){
			state.currencySign = payload
		}
	},
	action: {
		setCurrency(context: any, payload: any){
			context.commit('UPDATE_CURRENCY', payload.currency)
			context.commit('UPDATE_CURRENCY_SIGN', payload.currencySign)
		}
	},
	getters: {
        currency: (state: any): string => {
            return `${state.currencySign}${state.currency}`
        },
		cartCurrency: (state: any) => (payment_method: string): string => {
            if (payment_method !== 'tnbc'){
                return state.currency
            } else return payment_method.toUpperCase()
        },
	}
}