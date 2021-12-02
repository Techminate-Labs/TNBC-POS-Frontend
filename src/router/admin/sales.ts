import SalesIndex from '@/views/admin/sales/index.vue'
import ReportList from '@/views/admin/sales/ReportList.vue'

const SalesRoutes = [
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
            },
		]
    }
]

export default SalesRoutes
