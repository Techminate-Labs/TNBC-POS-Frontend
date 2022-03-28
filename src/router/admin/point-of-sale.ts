// @ts-nocheck

import { NavigationGuardNext, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import POSIndex from '@/views/admin/pos/index.vue'
import CustomerList from '@/views/admin/pos/CustomerList.vue'
import CustomerCreate from '@/views/admin/pos/CustomerCreate.vue'
import CustomerUpdate from '@/views/admin/pos/CustomerUpdate.vue'
import CouponList from '@/views/admin/pos/CouponList.vue'
import CouponCreate from '@/views/admin/pos/CouponCreate.vue'
import CouponUpdate from '@/views/admin/pos/CouponUpdate.vue'
import PointOfSale from '@/views/admin/pos/PointOfSale.vue'
import InvoiceList from '@/views/admin/sales/InvoiceList.vue'
import GeneratedQrCode from '@/views/admin/pos/GeneratedQrCode.vue'
import TransactionExplorer from '@/views/admin/pos/TransactionExplorer.vue'

function selectLayout(to: any, from: any, next: any) {
    const fromLayout = from.meta.layout
    if (to.meta && fromLayout) { 
        to.meta.layout = fromLayout
        next()
    } else {
        next()
    }
}

function safeGuard(to: any, from: any, next: any) {
    if (!store.state.user.permissions[to.meta.type][to.meta.action]) next('/403')
    else next()
}

const PointOfSaleRoutes: Array<RouteRecordRaw> = [
    {
        path: '/point-of-sale',
        name: 'POSIndex',
        component: POSIndex,
        meta: {
            layout: 'POSLayout',
            auth: true
        },
        children: [
            {
                path: 'customers-list',
                name: 'CustomerList',
                component: CustomerList,
                meta: {
                    action: 'list',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'customers-create',
                name: 'CustomerCreate',
                component: CustomerCreate,
                meta: {
                    action: 'create',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'customers-update/:id',
                name: 'CustomerUpdate',
                component: CustomerUpdate,
                meta: {
                    action: 'edit',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'coupons-list',
                name: 'CouponList',
                component: CouponList,
                meta: {
                    action: 'list',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'coupons-create',
                name: 'CouponCreate',
                component: CouponCreate,
                meta: {
                    action: 'create',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'coupons-update/:id',
                name: 'CouponUpdate',
                component: CouponUpdate,
                meta: {
                    action: 'edit',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'point-of-sale',
                name: 'PointOfSale',
                component: PointOfSale,
                meta: {
                    action: 'list',
                    type: 'POS'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'invoices-list',
                name: 'InvoiceList',
                component: InvoiceList,
                meta: {
                    action: 'list',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'generated-qr-code',
                name: 'GeneratedQrCode',
                component: GeneratedQrCode,
                meta: {
                    layout: 'MinimalLayout',
                    action: 'list',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
            {
                path: 'transaction-explorer',
                name: 'TransactionExplorer',
                component: TransactionExplorer,
                meta: {
                    action: 'list',
                    type: 'POS'
                },
                beforeEnter: [safeGuard, selectLayout]
            },
        ]
    },
]

export default PointOfSaleRoutes
