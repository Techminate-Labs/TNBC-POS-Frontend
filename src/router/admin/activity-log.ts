import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import ActivityLog from '@/views/admin/ActivityLog.vue'

function safeGuard(to: any, from: any, next: any) {
    if (!store.getters.userCan(to.meta.action, to.meta.type)) next('/403')
    else next()
}

const ActivityLogRoutes: Array<RouteRecordRaw> = [
    {
        path: '/activity-log',
        name: 'ActivityLog',
        component: ActivityLog,
        meta: {
            layout: 'AdminLayout',
            auth: true,
            action: 'list',
            type: 'Config'
        },
        beforeEnter: [safeGuard]
    },
]

export default ActivityLogRoutes
