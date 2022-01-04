import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import ItemsIndex from '@/views/admin/items/index.vue'
import SupplierList from '@/views/admin/items/SupplierList.vue'
import SupplierCreate from '@/views/admin/items/SupplierCreate.vue'
import SupplierUpdate from '@/views/admin/items/SupplierUpdate.vue'
import UnitList from '@/views/admin/items/UnitList.vue'
import CategoryList from '@/views/admin/items/CategoryList.vue'
import BrandList from '@/views/admin/items/BrandList.vue'
import ItemList from '@/views/admin/items/ItemList.vue'
import ItemUpdate from '@/views/admin/items/ItemUpdate.vue'
import ItemCreate from '@/views/admin/items/ItemCreate.vue'
import ItemDetails from '@/views/admin/items/ItemDetails.vue'
import BarcodeList from '@/views/admin/items/BarcodeList.vue'

function safeGuard(to: any, from: any, next: any) {
    if (!store.getters.userCan(to.meta.action, to.meta.type)) next('/403')
    else next()
}

const ItemsRoutes: Array<RouteRecordRaw> = [
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
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'suppliers-create',
                name: 'SupplierCreate',
                component: SupplierCreate,
                meta: {
                    action: 'create',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'suppliers-update/:id',
                name: 'SupplierUpdate',
                component: SupplierUpdate,
                meta: {
                    action: 'edit',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'units-list',
                name: 'UnitList',
                component: UnitList,
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'categories-list',
                name: 'CategoryList',
                component: CategoryList,
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'brands-list',
                name: 'BrandList',
                component: BrandList,
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'items-list',
                name: 'ItemList',
                component: ItemList,
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'items-create',
                name: 'ItemCreate',
                component: ItemCreate,
                meta: {
                    action: 'create',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'items-update/:id',
                name: 'ItemUpdate',
                component: ItemUpdate,
                meta: {
                    action: 'edit',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'items-details/:id',
                name: 'ItemDetails',
                component: ItemDetails,
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            },
            {
                path: 'barcode-list/:item_id/:inventory/:sku',
                name: 'BarcodeList',
                component: BarcodeList,
                meta: {
                    action: 'list',
                    type: 'Items'
                },
                beforeEnter: [safeGuard]
            }
        ]
    }
]

export default ItemsRoutes
