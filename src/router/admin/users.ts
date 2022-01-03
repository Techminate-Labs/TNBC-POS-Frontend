import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import UserIndex from '@/views/admin/users/index.vue'
import RoleList from '@/views/admin/users/RoleList.vue'
import RoleCreate from '@/views/admin/users/RoleCreate.vue'
import RoleUpdate from '@/views/admin/users/RoleUpdate.vue'
import UserList from '@/views/admin/users/UserList.vue'
import UserCreate from '@/views/admin/users/UserCreate.vue'
import UserUpdate from '@/views/admin/users/UserUpdate.vue'
import ProfileDetails from '@/views/admin/users/ProfileDetails.vue'
import ProfileCreate from '@/views/admin/users/ProfileCreate.vue'
import ProfileUpdate from '@/views/admin/users/ProfileUpdate.vue'
import ProfileSettings from '@/views/admin/users/ProfileSettings.vue'
import VerifyEmailUrl from '@/views/VerifyEmailUrl.vue'

function safeGuard(to: any, from: any, next: any) {
    if (!store.getters.userCan(to.meta.action, to.meta.type)) next('/403')
    else next()
}

const UserManagementRoutes: Array<RouteRecordRaw> = [
    {
        path: '/users',
        name: 'UserIndex',
        component: UserIndex,
        meta: {
            layout: 'AdminLayout',
            auth: true
        },
        children: [
            {
                path: 'user-list',
                name: 'UserList',
                component: UserList,
                meta: {
                    action: 'list',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'user-create',
                name: 'UserCreate',
                component: UserCreate,
                meta: {
                    action: 'create',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'user-update/:user_id',
                name: 'UserUpdate',
                component: UserUpdate,
                meta: {
                    action: 'edit',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'roles-list',
                name: 'RoleList',
                component: RoleList,
                meta: {
                    action: 'list',
                    type: 'Roles'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'role-create',
                name: 'RoleCreate',
                component: RoleCreate,
                meta: {
                    action: 'create',
                    type: 'Roles'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'role-update/:id',
                name: 'RoleUpdate',
                component: RoleUpdate,
                meta: {
                    action: 'edit',
                    type: 'Roles'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'profile/:user_id',
                name: 'ProfileDetails',
                component: ProfileDetails,
                meta: {
                    action: 'list',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'profile-create/:user_id',
                name: 'ProfileCreate',
                component: ProfileCreate,
                meta: {
                    action: 'create',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'profile-update/:user_id',
                name: 'ProfileUpdate',
                component: ProfileUpdate,
                meta: {
                    action: 'edit',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'profile-settings/:user_id',
                name: 'ProfileSettings',
                component: ProfileSettings,
                meta: {
                    action: 'list',
                    type: 'Users'
                },
                beforeEnter: [safeGuard]
            },
        ]
    }
]

const VerifyRoutes: Array<RouteRecordRaw> = [
    {
    path: '/email_verify_url',
    name: 'VerifyEmailUrl',
    component: VerifyEmailUrl
    },
]

export { UserManagementRoutes, VerifyRoutes }
