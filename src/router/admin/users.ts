import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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

const UserManagementRoutes: Array<RouteRecordRaw> = [
    {
        path: '/user-management',
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
                beforeEnter: (to, from, next) => {
                let canListUsers: boolean = store.state.user.permissions.Users.list
                if (!canListUsers) next('/403')
                else next()
                }
            },
            {
                path: 'user-create',
                name: 'UserCreate',
                component: UserCreate,
                beforeEnter: (to, from, next) => {
                let canCreateUser: boolean = store.state.user.permissions.Users.create
                if (!canCreateUser) next('/403')
                else next()
                }
            },
            {
                path: 'user-update/:user_id',
                name: 'UserUpdate',
                component: UserUpdate,
                beforeEnter: (to, from, next) => {
                let canEditUser: boolean = store.state.user.permissions.Users.edit
                if (!canEditUser) next('/403')
                else next()
                }
            },
            {
                path: 'roles-list',
                name: 'RoleList',
                component: RoleList,
                beforeEnter: (to, from, next) => {
                let canListRoles: boolean = store.state.user.permissions.Roles.list
                if (!canListRoles) next('/403')
                else next()
                }
            },
            {
                path: 'role-create',
                name: 'RoleCreate',
                component: RoleCreate,
                beforeEnter: (to, from, next) => {
                let canCreateRoles: boolean = store.state.user.permissions.Roles.create
                if (!canCreateRoles) next('/403')
                else next()
                }
            },
            {
                path: 'role-update/:id',
                name: 'RoleUpdate',
                component: RoleUpdate,
                beforeEnter: (to, from, next) => {
                let canEditRoles: boolean = store.state.user.permissions.Roles.edit
                if (!canEditRoles) next('/403')
                else next()
                }
            },
            {
                path: 'profile/:user_id',
                name: 'ProfileDetails',
                component: ProfileDetails
            },
            {
                path: 'profile-create/:user_id',
                name: 'ProfileCreate',
                component: ProfileCreate
            },
            {
                path: 'profile-update/:user_id',
                name: 'ProfileUpdate',
                component: ProfileUpdate
            },
            {
                path: 'profile-settings/:user_id',
                name: 'ProfileSettings',
                component: ProfileSettings
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
