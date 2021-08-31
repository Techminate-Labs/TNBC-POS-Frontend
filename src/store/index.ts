import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isAuthenticated: false,
    bearerToken: ''
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('bearerToken') !== '') {
        const token = localStorage.getItem('bearerToken') as string
        state.bearerToken = token
        state.isAuthenticated = true
      } else {
        state.bearerToken = ''
        state.isAuthenticated = false
      }
    },
    setBearerToken(state, bearerToken) {
      state.bearerToken = bearerToken
    },
    setAuthentication(state, authentication) {
      state.isAuthenticated = authentication
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['isAuthenticated', 'bearerToken']
  })]
})
