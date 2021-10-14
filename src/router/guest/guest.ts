import GuestLogin from '@/views/guest/GuestLogin.vue'
import GuestForgotPassword from '@/views/guest/GuestForgotPassword.vue'
import GuestForgotPasswordEmailSent from '@/views/guest/GuestForgotPasswordEmailSent.vue'
import GuestResetPassword from '@/views/guest/GuestResetPassword.vue'
import GuestResetPasswordSuccess from '@/views/guest/GuestResetPasswordSuccess.vue'

const GuestRoutes = [
    {

        path: '/',
        name: 'GuestLogin',
        component: GuestLogin,
        meta: {
            layout: 'GuestLayout',
            isHome: true
        }
    },
    {
        path: '/recover-password',
        name: 'GuestForgotPassword',
        component: GuestForgotPassword,
        meta: {
            layout: 'GuestLayout'
        }
        },
        {
        path: '/password-reset-sent',
        name: 'GuestForgotPasswordEmailSent',
        component: GuestForgotPasswordEmailSent,
        meta: {
            layout: 'GuestLayout'
        }
        },
        {
        path: '/reset-password',
        name: 'GuestResetPassword',
        component: GuestResetPassword,
        meta: {
            layout: 'GuestLayout'
        }
        },
        {
        path: '/reset-password-success',
        name: 'GuestResetPasswordSuccess',
        component: GuestResetPasswordSuccess,
        meta: {
            layout: 'GuestLayout'
        }
    }
]

export default GuestRoutes
