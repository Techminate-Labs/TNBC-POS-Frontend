import ActivityLog from '@/views/admin/ActivityLog.vue'

const ActivityLogRoutes = [
    {
        path: '/activity-log',
        name: 'ActivityLog',
        component: ActivityLog,
        meta: {
            layout: 'AdminLayout',
            auth: true
        }
    },
]

export default ActivityLogRoutes
