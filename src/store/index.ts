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
        UPDATE_ROLE_ID(state, payload) {
            state.user.roleId = payload
        },
        UPDATE_PERMISSIONS(state, payload) {
            state.user.permissions = payload
        },
        UPDATE_EMAIL_VERIFICATION(state, payload) {
            state.user.isEmailVerified = payload
        },
        UPDATE_INVOICE_NUMBER(state, payload){
            state.cart.invoiceNumber = payload
        },
        UPDATE_PAYMENT_METHOD(state, payload){
            state.cart.paymentMethod = payload
        },
        UPDATE_COUPON(state, payload){
            state.cart.coupon = payload
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
        setPermissions(context, payload) {
            context.commit('UPDATE_PERMISSIONS', payload)
        },
        setEmailVerification(context, payload) {
            context.commit('UPDATE_EMAIL_VERIFICATION', payload)
        },
        setInvoiceNumber(context, payload){
            context.commit('UPDATE_INVOICE_NUMBER', payload)
        },
        setPaymentMethod(context, payload){
            context.commit('UPDATE_PAYMENT_METHOD', payload)
        },
        setCoupon(context, payload){
            context.commit('UPDATE_COUPON', payload)
        }
    },
    modules: {
    },
    plugins: [createPersistedState({
        paths: ['user', 'session', 'cart'],
    })]
})
