import SalesIndex from '@/views/admin/sales/index.vue'
import InvoiceList from '@/views/admin/sales/InvoiceList.vue'
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
                path: 'invoices-list',
                name: 'InvoiceList',
                component: InvoiceList,
            },
            {
                path: 'reports-list',
                name: 'ReportList',
                component: ReportList,
            },
		]
    }
]

export default SalesRoutes
