<template>
    <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-md shadow-md col-span-1 p-4">
            <div class="flex flex-col flex-nowrap w-full mb-4 rounded-md shadow-md">
                <input
                    @input="$emit('handleSearch', $event)"
                    class="p-3 m-4 rounded-md border-solid border-2 border-gray-200"
                    name="role-name"
                    type="text"
                    placeholder="Search products..." />
            </div>
            <div class="grid grid-cols-3 gap-3">
                <div v-for="(item, index) in data" :key="index">
                    <ItemCard :item="item" />
                </div>
            </div>
        </div>
        <div class="bg-white rounded-md shadow-md col-span-1 col-start-2 p-4">
            <div class="flex flex-col flex-nowrap w-full mb-4 rounded-md shadow-md">
                <input
                    @input="$emit('handleSearch', $event)"
                    class="p-3 m-4 rounded-md border-solid border-2 border-gray-200"
                    name="role-name"
                    type="text"
                    placeholder="Search customers..." />
            </div>
            <div class="shadow-md">
                <ul class="flex flew-row flew-nowrap justify-evenly text-center divide-x-2 divide-gray-200 border-b-2 border-gray-100">
                    <li 
                        @click="setActive('cart')"
                        class="flex-grow hover:bg-gray-100 rounded-tl-md">
                        <div 
                            :class="isActive('cart') ? 'border-b-4 border-blue-900 bg-gray-100 rounded-tl-md' : ''"
                            class="px-3 py-2 cursor-pointer text-gray-900">
                            <span>Cart Items</span>
                        </div>
                    </li>
                    <li 
                        @click="setActive('invoice')"
                        class="flex-grow hover:bg-gray-100">
                        <div 
                            :class="isActive('invoice') ? 'border-b-4 border-blue-900 bg-gray-100' : ''"
                            class="px-3 py-2 cursor-pointer text-gray-900">
                            <span>Invoice</span>
                        </div>
                    </li>
                    <li 
                        @click="setActive('customer')"
                        class="flex-grow hover:bg-gray-100 rounded-tr-md">
                        <div 
                            :class="isActive('customer') ? 'border-b-4 border-blue-900 bg-gray-100 rounded-tr-md' : ''"
                            class="px-3 py-2 cursor-pointer text-gray-900">
                            <span>Add Customer</span>
                        </div>
                    </li>
                </ul>
                <div :class="isActive('cart') ? 'block' : 'hidden'">
                    <CartTable />
                    <Payments />
                </div>
                <div :class="isActive('invoice') ? 'block' : 'hidden'">
                    <Invoice />
                </div>
                <div :class="isActive('customer') ? 'block' : 'hidden'">
                    <CustomerForm />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ItemCard from "@/components/pos/ItemCard.vue"
import CartTable from "@/components/pos/CartTable.vue"
import Payments from "@/components/pos/Payments.vue"
import Invoice from "@/components/pos/Invoice.vue"
import CustomerForm from "@/components/pos/CustomerForm.vue"
import ResponseData from "@/types/ResponseData";
import ItemService from "@/services/ItemService";
import { ItemObject } from '@/types/Items'

export default defineComponent({
    name: 'PointOfSale',
    components: { ItemCard, CartTable, Payments, Invoice, CustomerForm },
    data(){
        return {
            data: [] as Array<ItemObject>,
            activeItem: 'cart'
        }
    },
    methods: {
        async fetchItems(): Promise<void> {
        let token = this.$store.state.bearerToken
        let url = '/itemList'
        await ItemService.list(url, token)
            .then((response: ResponseData) => {
            let res = response.data
            this.data = res.data
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        setActive(tabItem: string): void {
            this.activeItem = tabItem
        },
        isActive(tabItem: string): boolean {
            return this.activeItem === tabItem
        },
    },
    mounted() {
        this.fetchItems()
    }
});
</script>