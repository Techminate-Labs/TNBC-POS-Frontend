export const UserModule = {
    namespaced: true,
    state: () => ({
        isAuthenticated: false,
        userEmail: '',
        userId: null,
        roleId: null,
        isAdmin: false,
        isEmailVerified: false,
        permissions: undefined as any
    }),
    mutations: {
        UPDATE_AUTHENTICATION(state: any, payload: any) {
            state.isAuthenticated = payload
        },
        UPDATE_USER_EMAIL(state: any, payload: any) {
            state.userEmail = payload
        },
        UPDATE_USER_ID(state: any, payload: any) {
            state.userId = payload
        },
        SET_IS_ADMIN(state: any) {
            state.isAdmin = true
        },
        UPDATE_ROLE_ID(state: any, payload: any) {
            state.roleId = payload
        },
        UPDATE_PERMISSIONS(state: any, payload: any) {
            state.permissions = payload
        },
        UPDATE_EMAIL_VERIFICATION(state: any, payload: any) {
            state.isEmailVerified = payload
        }
    },
    actions: {
        setAuthentication(context: any, payload: any) {
            context.commit('UPDATE_AUTHENTICATION', payload)
        },
        setUserEmail(context: any, payload: any) {
            context.commit('UPDATE_USER_EMAIL', payload)
        },
        setUserId(context: any, payload: any) {
            context.commit('UPDATE_USER_ID', payload)
        },
        setRoleId(context: any, payload: any) {
            context.commit('UPDATE_ROLE_ID', payload)
        },
        setIsAdmin(context: any) {
            context.commit('SET_IS_ADMIN')
        },
        setPermissions(context: any, payload: any) {
            context.commit('UPDATE_PERMISSIONS', payload)
        },
        setEmailVerification(context: any, payload: any) {
            context.commit('UPDATE_EMAIL_VERIFICATION', payload)
        }
    },
    getters: {
        userCan: (state: any) => (action: string, type: string): boolean => {
            if (state.permissions[type][action]) {
                return state.permissions[type][action]
            } else {
                return false
            }
        }
    }
}