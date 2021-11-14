import SalesIndex from '@/views/admin/sales/index.vue'
import InvoiceList from '@/views/admin/sales/InvoiceList.vue'

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
		]
    }
]

export default SalesRoutes
