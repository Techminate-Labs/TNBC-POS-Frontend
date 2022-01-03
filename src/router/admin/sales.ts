import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import SalesIndex from '@/views/admin/sales/index.vue'
import ReportList from '@/views/admin/sales/ReportList.vue'

function safeGuard(to: any, from: any, next: any) {
    if (!store.getters.userCan(to.meta.action, to.meta.type)) next('/403')
    else next()
}

const SalesRoutes: Array<RouteRecordRaw> = [
    {
        path: '/sales',
        name: 'SalesIndex',
        component: SalesIndex,
        meta: {
            layout: 'AdminLayout',
            auth: true
        },
        children: [
            {
                path: 'reports-list',
                name: 'ReportList',
                component: ReportList,
                meta: {
                    action: 'list',
                    type: 'Sales'
                },
                beforeEnter: [safeGuard]
            },
		]
    }
]

export default SalesRoutes
