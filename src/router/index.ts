import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import GuestLogin from '../views/guest/GuestLogin.vue'
import GuestForgotPassword from '../views/guest/GuestForgotPassword.vue'
import GuestForgotPasswordEmailSent from '../views/guest/GuestForgotPasswordEmailSent.vue'
import GuestRecoverPassword from '../views/guest/GuestRecoverPassword.vue'
import GuestRecoverPasswordSuccess from '../views/guest/GuestRecoverPasswordSuccess.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import UserManagement from '../views/admin/users/UserManagement.vue'
import RolesList from '../views/admin/users/RolesList.vue'
import RoleCreate from '../views/admin/users/RoleCreate.vue'
import RoleUpdate from '../views/admin/users/RoleUpdate.vue'
import UserList from '../views/admin/users/UserList.vue'
import UserCreate from '../views/admin/users/UserCreate.vue'
import UserUpdate from '../views/admin/users/UserUpdate.vue'
import ProfileSingle from '../views/admin/users/ProfileSingle.vue'
import ProfileCreate from '../views/admin/users/ProfileCreate.vue'
import ProfileUpdate from '../views/admin/users/ProfileUpdate.vue'
import PointOfSale from '../views/admin/pos/PointOfSale.vue'
import Error403 from '../views/errors/Error403.vue'
import Error404 from '../views/errors/Error404.vue'
import Error500 from '../views/errors/Error500.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'GuestLogin',
    component: GuestLogin,
    meta: {
      layout: 'GuestLayout',
      isHome: true
    }
  },
  {
    path: '/password-reset',
    name: 'GuestForgotPassword',
    component: GuestForgotPassword,
    meta: {
      layout: 'GuestLayout'
    }
  },
  {
    path: '/password-reset-sent',
    name: 'GuestForgotPasswordEmailSent',
    component: GuestForgotPasswordEmailSent,
    meta: {
      layout: 'GuestLayout'
    }
  },
  {
    path: '/recover-password',
    name: 'GuestRecoverPassword',
    component: GuestRecoverPassword,
    meta: {
      layout: 'GuestLayout'
    }
  },
  {
    path: '/recover-password-success',
    name: 'GuestRecoverPasswordSuccess',
    component: GuestRecoverPasswordSuccess,
    meta: {
      layout: 'GuestLayout'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      layout: 'AdminLayout',
      auth: true
    }
  },
  {
    path: '/point-of-sale',
    name: 'PointOfSale',
    component: PointOfSale,
    meta: {
      layout: 'AdminLayout',
      auth: true
    }
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
    meta: {
      layout: 'AdminLayout',
      auth: true
    },
    children: [
      {
        path: 'user-list',
        name: 'UserList',
        component: UserList,
      },
      {
        path: 'user-create',
        name: 'UserCreate',
        component: UserCreate,
      },
      {
        path: 'user-update/:id',
        name: 'UserUpdate',
        component: UserUpdate,
      },
      {
        path: 'roles-list',
        name: 'RolesList',
        component: RolesList,
      },
      {
        path: 'role-create',
        name: 'RoleCreate',
        component: RoleCreate
      },
      {
        path: 'role-update/:id',
        name: 'RoleUpdate',
        component: RoleUpdate
      },
      {
        path: 'profile',
        name: 'ProfileSingle',
        component: ProfileSingle
      },
      {
        path: 'profile-create/:id',
        name: 'ProfileCreate',
        component: ProfileCreate
      },
      {
        path: 'profile-update/:id',
        name: 'ProfileUpdate',
        component: ProfileUpdate
      },
    ]
  },
  {
    path: '/403',
    component: Error403
  },
  {
    path: '/404',
    component: Error404
  },
  {
    path: '/500',
    component: Error500
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.state.isAuthenticated
  let hasToken = store.state.bearerToken
  if (to.meta.auth && !isAuthenticated && !hasToken) {
    next('/')
  } else if (to.name === "GuestLogin" && isAuthenticated && hasToken) {
    next('/dashboard')
  } else {
    next()
  }

})

export default router
