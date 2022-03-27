const state = () => ({
	bearerToken: ''
})
const mutations = {
	UPDATE_BEARER_TOKEN(state, payload) {
		state.bearerToken = payload
	}
}
const actions = {
	setBearerToken(context, payload){
		context.commit('UPDATE_BEARER_TOKEN', payload)
	},
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}