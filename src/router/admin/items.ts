import ItemsIndex from '@/views/admin/items/ItemsIndex.vue'
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

const ItemsRoutes = [
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
            {
                path: 'barcode-list',
                name: 'BarcodeList',
                component: BarcodeList,
            }
        ]
    }
]

export default ItemsRoutes
