import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        user: {
            isAuthenticated: false,
            userEmail: '',
            userId: null,
            roleId: null,
            isEmailVerified: false,
            permissions: undefined as any
        },
        session: {
            bearerToken: '',
        },
        cart: {
            invoiceNumber: '',
            paymentMethod: 'fiat',
            coupon: '',
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
        setRoleId(state, role_id) {
            state.user.roleId = role_id
        },
        setEmailVerification(state, verification) {
            state.user.isEmailVerified = verification
        },
        setPermissions(state, permissions) {
            state.user.permissions = permissions
        },
        setInvoiceNumber(state, invoiceNumber){
            state.cart.invoiceNumber = invoiceNumber
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
