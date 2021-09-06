import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isAuthenticated: false,
    bearerToken: '',
    userEmail: '',
    isEmailVerified: false,
    // setup permissions for components
    permission: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      list: false
    }
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
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['isAuthenticated', 'bearerToken', 'userEmail', 'isEmailVerified'],
  })]
})
