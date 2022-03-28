// @ts-nocheck

import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import GuestRoutes from './guest/guest'
import DashboardRoutes from './admin/dashboard'
import { UserManagementRoutes, VerifyRoutes } from './admin/users'
import ItemsRoutes from './admin/items'
import PointOfSaleRoutes from './admin/point-of-sale'
import ErrorsRoutes from './errors'
import ConfigurationRoutes from './admin/configuration'
import SalesRoutes from './admin/sales'
import ActivityLogRoutes from './admin/activity-log'


const routes = [
    ...GuestRoutes, 
    ...DashboardRoutes, 
    ...UserManagementRoutes,
    ...VerifyRoutes, 
    ...ItemsRoutes,
    ...PointOfSaleRoutes,
    ...ConfigurationRoutes,
    ...SalesRoutes,
    ...ActivityLogRoutes,
    ...ErrorsRoutes
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.user.isAuthenticated
    const hasToken = store.state.session.bearerToken
    const userId = store.state.user.userId
    console.log({isAuthenticated}, {hasToken}, {userId} )

    if (to.meta.auth && !isAuthenticated) {
  	  next('/')
    } else if (to.name === "GuestLogin" && isAuthenticated && hasToken && userId !== 2) {
        next({ name:'Dashboard' })
    } else if (to.name === "GuestLogin" && isAuthenticated && hasToken && userId == 2) {
        next({ name: 'PointOfSale' } )
    } else if (to.name === "Dashboard" && isAuthenticated && hasToken && userId == 2) {
        next({ name: 'PointOfSale' } )
    } else {
	    next()
    }

})

export default router