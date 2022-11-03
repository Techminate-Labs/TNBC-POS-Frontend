import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { UserModule } from './modules/user'
import { SessionModule } from './modules/session'
import { PosModule } from './modules/pos'
import { SettingsModule } from './modules/settings'

export default createStore({
    state: {
        user: {
            isAuthenticated: false,
            userEmail: '',
            userId: null,
            roleId: null,
            isAdmin: false,
            isEmailVerified: false,
            permissions: undefined as any
        },
        session: {
            bearerToken: '',
        }
    },
    mutations: {
        initializeStore(state) {
        },
        UPDATE_BEARER_TOKEN(state, payload) {
            state.session.bearerToken = payload
        },
        UPDATE_AUTHENTICATION(state, payload) {
            state.user.isAuthenticated = payload
        },
        UPDATE_USER_EMAIL(state, payload) {
            state.user.userEmail = payload
        },
        UPDATE_USER_ID(state, payload) {
            state.user.userId = payload
        },
        SET_IS_ADMIN(state) {
            state.user.isAdmin = true
        },
        UPDATE_ROLE_ID(state, payload) {
            state.user.roleId = payload
        },
        UPDATE_PERMISSIONS(state, payload) {
            state.user.permissions = payload
        },
        UPDATE_EMAIL_VERIFICATION(state, payload) {
            state.user.isEmailVerified = payload
        }
    },
    actions: {
        setBearerToken(context, payload){
            context.commit('UPDATE_BEARER_TOKEN', payload)
        },
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
        }
    },
    getters: {
        userCan: (state) => (action: string, type: string): boolean => {
            if (state.user.permissions[type][action]) {
                return state.user.permissions[type][action]
            } else {
                return false
            }
        }
    },
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
