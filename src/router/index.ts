import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import GuestLogin from '../views/guest/GuestLogin.vue'
import GuestForgotPassword from '../views/guest/GuestForgotPassword.vue'
import GuestForgotPasswordEmailSent from '../views/guest/GuestForgotPasswordEmailSent.vue'
import GuestResetPassword from '../views/guest/GuestResetPassword.vue'
import GuestResetPasswordSuccess from '../views/guest/GuestResetPasswordSuccess.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import UserManagement from '../views/admin/users/UserManagement.vue'
import RoleList from '../views/admin/users/RoleList.vue'
import RoleCreate from '../views/admin/users/RoleCreate.vue'
import RoleUpdate from '../views/admin/users/RoleUpdate.vue'
import UserList from '../views/admin/users/UserList.vue'
import UserCreate from '../views/admin/users/UserCreate.vue'
import UserUpdate from '../views/admin/users/UserUpdate.vue'
import ProfileDetails from '../views/admin/users/ProfileDetails.vue'
import ProfileCreate from '../views/admin/users/ProfileCreate.vue'
import ProfileUpdate from '../views/admin/users/ProfileUpdate.vue'
import ProfileSettings from '../views/admin/users/ProfileSettings.vue'
import ItemsIndex from '../views/admin/items/ItemsIndex.vue'
import SupplierList from '../views/admin/items/SupplierList.vue'
import SupplierCreate from '../views/admin/items/SupplierCreate.vue'
import SupplierUpdate from '../views/admin/items/SupplierUpdate.vue'
import UnitList from '../views/admin/items/UnitList.vue'
import CategoryList from '../views/admin/items/CategoryList.vue'
import BrandList from '../views/admin/items/BrandList.vue'
import ItemList from '../views/admin/items/ItemList.vue'
import ItemUpdate from '../views/admin/items/ItemUpdate.vue'
import ItemCreate from '../views/admin/items/ItemCreate.vue'
import ItemDetails from '../views/admin/items/ItemDetails.vue'
import PointOfSale from '../views/admin/pos/PointOfSale.vue'
import Error403 from '../views/errors/Error403.vue'
import Error404 from '../views/errors/Error404.vue'
import Error500 from '../views/errors/Error500.vue'
import VerifyEmailUrl from '../views/VerifyEmailUrl.vue'

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
    path: '/recover-password',
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
    path: '/reset-password',
    name: 'GuestResetPassword',
    component: GuestResetPassword,
    meta: {
      layout: 'GuestLayout'
    }
  },
  {
    path: '/reset-password-success',
    name: 'GuestResetPasswordSuccess',
    component: GuestResetPasswordSuccess,
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
      isAdmin: true
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
        beforeEnter: (to, from, next) => {
          let canListUsers: boolean = store.state.permissions.Users.list
          if (!canListUsers) next('/403')
          else next()
        }
      },
      {
        path: 'user-create',
        name: 'UserCreate',
        component: UserCreate,
        beforeEnter: (to, from, next) => {
          let canCreateUser: boolean = store.state.permissions.Users.create
          if (!canCreateUser) next('/403')
          else next()
        }
      },
      {
        path: 'user-update/:user_id',
        name: 'UserUpdate',
        component: UserUpdate,
        beforeEnter: (to, from, next) => {
          let canEditUser: boolean = store.state.permissions.Users.edit
          if (!canEditUser) next('/403')
          else next()
        }
      },
      {
        path: 'roles-list',
        name: 'RoleList',
        component: RoleList,
        beforeEnter: (to, from, next) => {
          let canListRoles: boolean = store.state.permissions.Roles.list
          if (!canListRoles) next('/403')
          else next()
        }
      },
      {
        path: 'role-create',
        name: 'RoleCreate',
        component: RoleCreate,
        beforeEnter: (to, from, next) => {
          let canCreateRoles: boolean = store.state.permissions.Roles.create
          if (!canCreateRoles) next('/403')
          else next()
        }
      },
      {
        path: 'role-update/:id',
        name: 'RoleUpdate',
        component: RoleUpdate,
        beforeEnter: (to, from, next) => {
          let canEditRoles: boolean = store.state.permissions.Roles.edit
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
  },
  {
    path: '/items',
    name: 'Items',
    component: ItemsIndex,
    meta: {
      layout: 'AdminLayout',
      auth: true
    },
    children: [
      {
        path: 'suppliers-list',
        name: 'SupplierList',
        component: SupplierList,
      },
      {
        path: 'suppliers-create',
        name: 'SupplierCreate',
        component: SupplierCreate,
      },
      {
        path: 'suppliers-update/:id',
        name: 'SupplierUpdate',
        component: SupplierUpdate,
      },
      {
        path: 'units-list',
        name: 'UnitList',
        component: UnitList,
      },
      {
        path: 'categories-list',
        name: 'CategoryList',
        component: CategoryList,
      },
      {
        path: 'brands-list',
        name: 'BrandList',
        component: BrandList,
      },
      {
        path: 'items-list',
        name: 'ItemList',
        component: ItemList,
      },
      {
        path: 'items-create',
        name: 'ItemCreate',
        component: ItemCreate,
      },
      {
        path: 'items-update/:id',
        name: 'ItemUpdate',
        component: ItemUpdate,
      },
      {
        path: 'items-details/:id',
        name: 'ItemDetails',
        component: ItemDetails,
      },

    ]
  },
  {
    path: '/email_verify_url',
    name: 'VerifyEmailUrl',
    component: VerifyEmailUrl
  },
  {
    path: '/403',
    name: 'Error403',
    component: Error403
  },
  {
    path: '/404',
    name: 'Error404',
    component: Error404
  },
  {
    path: '/500',
    name: 'Error500',
    component: Error500
  },
  { path: '/:pathMatch(.*)*', component: Error404 }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.state.isAuthenticated
  let hasToken = store.state.bearerToken.length
  if (to.meta.auth && !isAuthenticated) {
    next('/')
    } else if (to.name === "GuestLogin" && isAuthenticated && hasToken) {
      next('/dashboard')
  } else {
    next()
  }

})

export default router
