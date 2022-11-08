export const SettingsModule = {
	namespaced: false,
	state: () => ({
		currency: '',
		currencySign: '',
		taxRate: 0,
		tnbcRate: 0,
		usdRate: 0
	}),
	mutations: {
		UPDATE_CURRENCY(state: any, payload: any){
			state.currency = payload
		},
		UPDATE_CURRENCY_SIGN(state: any, payload: any){
			state.currencySign = payload
		},
		UPDATE_TAX_RATE(state: any, payload: any){
			state.taxRate = payload
		},
		UPDATE_TNBC_RATE(state: any, payload: any){
			state.tnbcRate = payload
		},
		UPDATE_USD_RATE(state: any, payload: any){
			state.usdRate = payload
		}
	},
	actions: {
		setConfiguration(context: any, payload: any){
			context.commit('UPDATE_CURRENCY', payload.currency)
			context.commit('UPDATE_CURRENCY_SIGN', payload.currency_symble)
			context.commit('UPDATE_TAX_RATE', payload.tax_rate)
			context.commit('UPDATE_TNBC_RATE', payload.tnbc_rate)
			context.commit('UPDATE_USD_RATE', payload.usd_rate)
		}
	},
	getters: {
        currency: (state: any): string => {
			console.log('called currency getters')
			console.log(`${state.currencySign}${state.currency}`)
            return `${state.currencySign}${state.currency}`
        },
		cartCurrency: (state: any) => (payment_method: string): string => {
            if (payment_method !== 'tnbc'){
                return state.currency
            } else return payment_method.toUpperCase()
        },
	}
}