import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        user: {
            isAuthenticated: false,
            userEmail: '',
            userId: null,
            isEmailVerified: false,
            permissions: undefined as any
        },
        session: {
            bearerToken: '',
        },
        cart: {
            paymentMethod: 'fiat',
            coupon: '0',
        }
        // setup permissions for components
    },
    mutations: {
        initializeStore(state) {
        },
        setBearerToken(state, bearerToken) {
            state.session.bearerToken = bearerToken
        },
        setAuthentication(state, authentication) {
            state.user.isAuthenticated = authentication
        },
        setUserEmail(state, email) {
            state.user.userEmail = email
        },
        setUserId(state, user_id) {
            state.user.userId = user_id
        },
        setEmailVerification(state, verification) {
            state.user.isEmailVerified = verification
        },
        setPermissions(state, permissions) {
            state.user.permissions = permissions
        },
        setPaymentMethod(state, method){
            state.cart.paymentMethod = method
        },
        setCoupon(state, coupon){
            state.cart.coupon = coupon
        }
    },
    actions: {
    },
    modules: {
    },
    plugins: [createPersistedState({
        paths: ['user', 'session', 'cart'],
    })]
})
