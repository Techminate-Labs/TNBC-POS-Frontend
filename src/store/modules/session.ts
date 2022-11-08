export const SessionModule = {
	namespaced: true,
	state: () => ({
		bearerToken: ''
	}),
	mutations: {
		UPDATE_BEARER_TOKEN(state: any, payload: string) {
            state.bearerToken = payload
        },
	},
	actions: {
		setBearerToken(context: any, payload: string){
            context.commit('UPDATE_BEARER_TOKEN', payload)
        },
	}
}