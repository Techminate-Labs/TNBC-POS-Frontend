import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Configuration from '@/views/admin/pos/Configuration.vue'

function safeGuard(to: any, from: any, next: any) {
    if (!store.getters.userCan(to.meta.action, to.meta.type)) next('/403')
    else next()
}

const ConfigurationRoutes: Array<RouteRecordRaw> = [
    {
        path: '/configuration',
        name: 'Configuration',
        component: Configuration,
        meta: {
            layout: 'AdminLayout',
            auth: true,
            action: 'list',
            type: 'Config'
        },
        beforeEnter: [safeGuard]
    },
]

export default ConfigurationRoutes
