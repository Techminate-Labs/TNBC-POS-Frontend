import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import session from './modules/session'
import pos from './modules/pos.js'
import settings from './modules/settings'

export default createStore({
    modules: {
        user,
        session,
        pos,
        settings
    },
    plugins: [createPersistedState({
        paths: ['user', 'session', 'pos', 'settings'],
    })]
})
