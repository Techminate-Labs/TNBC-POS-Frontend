import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { UserModule } from './modules/user'
import { SessionModule } from './modules/session'
import { PosModule } from './modules/pos'
import { SettingsModule } from './modules/settings'

export default createStore({
    state: {},
    mutations: {
        initializeStore(state) {}
    },
    actions: {},
    getters: {},
    modules: {
        user: UserModule,
        session: SessionModule,
        pos: PosModule,
        settings: SettingsModule,
    },
    plugins: [createPersistedState({
        paths: ['user', 'session', 'pos', 'settings'],
    })]
})
