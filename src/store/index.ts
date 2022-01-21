import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
        },
        pos: {
            cart: {},
            coupon: '',
            isProcessingPayment: false
        },
        settings: {
            currency: '',
            currencySign: ''
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
        },
        UPDATE_CART(state, payload){
            state.pos.cart = payload
        },
        UPDATE_INVOICE_NUMBER(state, payload){
            state.pos.cart = {...state.pos.cart, ...payload}
        },
        UPDATE_PAYMENT_METHOD(state, payload){
            state.pos.cart = {...state.pos.cart, ...payload}
        },
        UPDATE_COUPON(state, payload){
            state.pos.coupon = payload
        },
        UPDATE_IS_PROCESSING_PAYMENT(state, payload){
            state.pos.isProcessingPayment = payload
        },
        UPDATE_CURRENCY(state, payload){
            state.settings.currency = payload
        },
        UPDATE_CURRENCY_SIGN(state, payload){
            state.settings.currencySign = payload
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
        },
        setCart(context, payload){
            context.commit('UPDATE_CART', payload)
        },
        setInvoiceNumber(context, payload){
            context.commit('UPDATE_INVOICE_NUMBER', payload)
        },
        setPaymentMethod(context, payload){
            context.commit('UPDATE_PAYMENT_METHOD', payload)
        },
        setCoupon(context, payload){
            context.commit('UPDATE_COUPON', payload)
        },
        setIsProcessingPayment(context, payload){
            context.commit('UPDATE_IS_PROCESSING_PAYMENT', payload)
        },
        setCurrency(context, payload){
            context.commit('UPDATE_CURRENCY', payload.currency)
            context.commit('UPDATE_CURRENCY_SIGN', payload.currencySign)
        }
    },
    getters: {
        currency: (state): string => {
            return `${state.settings.currencySign}${state.settings.currency}`
        },
        cartCurrency: (state) => (payment_method: string): string => {
            if (payment_method !== 'tnbc'){
                return state.settings.currency
            } else return payment_method.toUpperCase()
        },
        isProcessingPayment: (state): boolean => {
            return state.pos.isProcessingPayment
        },
        userCan: (state) => (action: string, type: string): boolean => {
            if (state.user.permissions[type][action]) {
                return state.user.permissions[type][action]
            } else {
                return false
            }
        }
    },
    modules: {
    },
    plugins: [createPersistedState({
        paths: ['user', 'session', 'pos', 'settings'],
    })]
})
