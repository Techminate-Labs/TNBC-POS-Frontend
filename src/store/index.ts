import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isAuthenticated: false,
    bearerToken: '',
    userEmail: '',
    isEmailVerified: false,
    // setup permissions for components
    permissions: [] as any
  },
  mutations: {
    initializeStore(state) {
    },
    setBearerToken(state, bearerToken) {
      state.bearerToken = bearerToken
    },
    setAuthentication(state, authentication) {
      state.isAuthenticated = authentication
    },
    setUserEmail(state, email) {
      state.userEmail = email
    },
    setEmailVerification(state, verification) {
      state.isEmailVerified = verification
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['isAuthenticated', 'bearerToken', 'userEmail', 'isEmailVerified', 'permissions'],
  })]
})
