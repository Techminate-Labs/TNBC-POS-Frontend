import Configuration from '@/views/admin/pos/Configuration.vue'

const ConfigurationRoutes = [
    {
        path: '/configuration',
        name: 'Configuration',
        component: Configuration,
        meta: {
            layout: 'AdminLayout',
            auth: true
        }
    },
]

export default ConfigurationRoutes
