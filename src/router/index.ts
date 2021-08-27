import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GuestLogin from '../views/guest/GuestLogin.vue'
import GuestForgotPassword from '../views/guest/GuestForgotPassword.vue'
import GuestForgotPasswordEmailSent from '../views/guest/GuestForgotPasswordEmailSent.vue'
import GuestRecoverPassword from '../views/guest/GuestRecoverPassword.vue'
import GuestRecoverPasswordSuccess from '../views/guest/GuestRecoverPasswordSuccess.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Roles from '../views/admin/users/Roles.vue'
import AddRole from '../views/admin/users/AddRole.vue'
import UserRoles from '../views/admin/users/UserRoles.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'GuestLogin',
    component: GuestLogin,
    meta: {
      layout: 'GuestLayout'
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
      layout: 'AdminLayout'
    }
  },
  {
    path: '/roles',
    name: 'UserRoles',
    component: Roles,
    meta: {
      layout: 'AdminLayout'
    },
    children: [
      { path: '', component: UserRoles },

      // UserProfile will be rendered inside User's <router-view>
      // when /users/:username/profile is matched
      { path: 'add-role', component: AddRole },

      // UserPosts will be rendered inside User's <router-view>
      // when /users/:username/posts is matched
      // { path: 'edit-role', component: EditRole }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
