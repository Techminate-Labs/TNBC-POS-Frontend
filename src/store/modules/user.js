const state = () => ({
	isAuthenticated: false,
	userEmail: '',
	userId: null,
	roleId: null,
	isAdmin: false,
	isEmailVerified: false,
	permissions: undefined
})
const mutations = {
	UPDATE_AUTHENTICATION(state, payload) {
		state.isAuthenticated = payload
	},
	UPDATE_USER_EMAIL(state, payload) {
		state.userEmail = payload
	},
	UPDATE_USER_ID(state, payload) {
		state.userId = payload
	},
	SET_IS_ADMIN(state) {
		state.isAdmin = true
	},
	UPDATE_ROLE_ID(state, payload) {
		state.roleId = payload
	},
	UPDATE_PERMISSIONS(state, payload) {
		state.permissions = payload
	},
	UPDATE_EMAIL_VERIFICATION(state, payload) {
		state.isEmailVerified = payload
	},
}

const actions = {
	setAuthentication(context, payload) {
		context.commit('UPDATE_AUTHENTICATION', payload)
	},
	setUserEmail(context, payload) {
		context.commit('UPDATE_USER_EMAIL', payload)
	},
	setUserId(context, payload) {
		context.commit('UPDATE_USER_ID', payload)
	},
	setRoleId(context, payload) {
		context.commit('UPDATE_ROLE_ID', payload)
	},
	setIsAdmin(context) {
		context.commit('SET_IS_ADMIN')
	},
	setPermissions(context, payload) {
		context.commit('UPDATE_PERMISSIONS', payload)
	},
	setEmailVerification(context, payload) {
		context.commit('UPDATE_EMAIL_VERIFICATION', payload)
	},
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}