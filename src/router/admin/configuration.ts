// @ts-nocheck

import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Configuration from '@/views/admin/Configuration.vue'

function safeGuard(to: any, from: any, next: any) {
    if (!store.state.user.permissions[to.meta.type][to.meta.action]) next('/403')
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
