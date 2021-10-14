import Dashboard from '@/views/admin/Dashboard.vue'

const DashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            layout: 'AdminLayout',
            isAdmin: true
        }
    },
]

export default DashboardRoutes
