import Error403 from '@/views/errors/Error403.vue'
import Error404 from '@/views/errors/Error404.vue'
import Error500 from '@/views/errors/Error500.vue'

const ErrorsRoutes = [
    {
        path: '/403',
        name: 'Error403',
        component: Error403
    },
    {
        path: '/404',
        name: 'Error404',
        component: Error404
    },
    {
        path: '/500',
        name: 'Error500',
        component: Error500
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: Error404
    }
]

export default ErrorsRoutes
