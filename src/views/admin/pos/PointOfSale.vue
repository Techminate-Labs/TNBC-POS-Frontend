<template>
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-3">
        <div class="bg-white rounded-md shadow-md col-span-1 lg:col-span-2 xl:col-span-3">
            <div class="flex flex-col flex-nowrap w-full mb-4 p-4">
                <Multiselect
                    v-model="itemId"
                    @select="addItemToCart()"
                    :delay="0"
                    :filterResults="true"
                    :resolveOnLoad="true"
                    :searchable="true"
                    placeholder="Pick an Item"
                    :options="async function(query, $event) {
                        return await fetchItems(query) // check JS block in JSFiddle for implementation
                    }"
                    >
                        <template v-slot:singleLabel="{ value }">
                            <div class="multiselect-single-label">
                            <img class="w-24 h-32 object-cover mr-4" :src="value.img">
                            <span class="text-xl">
                                {{ value.label }}
                            </span>
                            </div>
                        </template>

                        <template v-slot:option="{ option }">
                            <img class="w-24 h-16 object-cover rounded-xl mr-4" :src="option.img">{{ option.label }}
                        </template>
                </Multiselect>
            </div>
            <div class="grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 rounded-xl gap-3 p-4">
                <div v-for="(item, index) in popularItems" :key="index">
                    <ItemCard :item="item" @click="addPopularItemToCart(item)" />
                </div>
            </div>
        </div>
        <div class="bg-white rounded-md col-span-1 lg:col-span-4 lg:col-start-3 xl:col-span-3 xl:col-start-4">
            <div class="flex flex-col flex-nowrap w-full mb-4 p-4">
                <Multiselect
                    v-model="customerID"
                    @select="addCustomerToCart()"
                    :delay="0"
                    :filterResults="true"
                    :resolveOnLoad="true"
                    :searchable="true"
                    placeholder="Pick a Customer"
                    :options="async function(query, $event) {
                        return await fetchCustomers(query) // check JS block in JSFiddle for implementation
                    }"
                />
            </div>
            <div class="w-full rounded-md px-2">
                <ul class="flex flew-row flew-nowrap justify-evenly text-center bg-gray-200">
                    <li 
                        @click="setActive('cart')"
                        class="flex-grow">
                        <div 
                            :class="isActive('cart') ? 'text-white bg-blue-900 rounded-tl-md' : ''"
                            class="px-3 py-2 cursor-pointer">
                            <span>Cart Items</span>
                        </div>
                    </li>
                    <li 
                        @click="setActive('invoice')"
                        class="flex-grow">
                        <div 
                            :class="isActive('invoice') ? 'text-white bg-blue-900 rounded-tl-md' : ''"
                            class="px-3 py-2 cursor-pointer">
                            <span>Invoice</span>
                        </div>
                    </li>
                    <li 
                        @click="setActive('customer')"
                        class="flex-grow">
                        <div 
                            :class="isActive('customer') ? 'text-white bg-blue-900 rounded-tl-md' : ''"
                            class="px-3 py-2 cursor-pointer">
                            <span>Add Customer</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="w-full rounded-xl shadow-md px-2 pt-1">
                <div :class="isActive('cart') ? 'block' : 'hidden'">
                    <CartTable :cart="cart" />
                    <Payments 
                        @discountChange="addCoupon"
                        @printInvoice="printInvoice"
                        @loadExplorer="$router.push({name: 'TransactionExplorer'})"
                        @changePaymentMethod="updatePaymentMethod"
                        @generateQrCode="generateQrCode"/>
                </div>
                <div :class="isActive('invoice') ? 'block' : 'hidden'">
                    <Invoice :invoice="invoice" :cart="cart" />
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

import ItemService from "@/services/items/ItemService";
import CartService from "@/services/pos/CartService";
import CustomerService from "@/services/pos/CustomerService";
import { ItemObject } from '@/types/items/Items'
import { Cart } from '@/types/pos/Cart'
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: 'PointOfSale',
    components: { ItemCard, CartTable, Payments, Invoice, CustomerForm, Multiselect },
    data(){
        return {
            popularItems: [] as Array<ItemObject>,
            activeItem: 'cart',
            itemId: '',
            cart: this.$store.getters['pos/cart'],
            invoice: this.$store.state.pos.cart,
            customerID: '',
            discountCode: '',
            paymentMethod: this.$store.state.pos.cart.payment_method ? this.$store.state.pos.cart.payment_method : 'fiat',
            isGeneratingInvoice: false
        }
    },
    methods: {
        async fetchPopularItems(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let url = `/itemList?limit=0`
            await ItemService.list(url, token)
                .then((response) => {
                    let res = response.data
                    this.popularItems = res.data
                })
                .catch(({response}) => {
                    this.$toast.open({
						message: `${response.data.message}`,
						type: "error"
					})
                });
        },
        async updatePaymentMethod(method: string): Promise<void> {
            console.log('updatePaymentMethod')
            this.$store.dispatch('pos/setPaymentMethod', method)
        },
        async fetchItems(query: any): Promise<void> {
            if (query){
                let token = this.$store.state.session.bearerToken
                let url = `/itemList?q=${query}`
                let results = await ItemService.list(url, token)
                    .then((response) => {
                        let res = response.data
                        return res.data.map((item: any) => {
                            return { value: item.item_id, label: item.name, img: item.image }
                        })
                    })
                    .catch(({response}) => {
                        this.$toast.open({
						    message: `${response.data.message}`,
						    type: "error"
					    })
                    });
                return results
            }
        },
        async fetchCustomers(query: any): Promise<void> {
            if (query){
                let token = this.$store.state.session.bearerToken
                let url = `/customerList?q=${query}`
                let results = await CustomerService.list(url, token)
                    .then((response) => {
                        let res = response.data
                        return res.data.map((item: any) => {
                            return { value: item.id, label: item.name }
                        })
                    })
                    .catch(({response}) => {
                        this.$toast.open({
                            message: `${response.data.message}`,
                            type: "error"
                        })
                    });
                return results
            }
        },
        async printInvoice(): Promise<void> {
            if (this.isGeneratingInvoice === true){
                this.$toast.open({
                    message: 'An invoice is already being generated.',
                    type: "info"
                })
                return
            }
            
            console.log('printInvoice')
                       
        },
        async addCoupon(discount: any): Promise<void> {
            this.discountCode = discount.toString()
            this.$store.dispatch('pos/setCoupon', discount.toString())
        },
        
        setActive(tabItem: string): void {
            this.activeItem = tabItem
        },
        
        isActive(tabItem: string): boolean {
            return this.activeItem === tabItem
        },
        
        async addCustomerToCart(): Promise<void>{
            let customer = this.customerID as string
            this.$store.dispatch('pos/addCustomerToCart', customer)
        },
        
        async addItemToCart(): Promise<void>{
            this.$store.dispatch('pos/setIsProcessingPayment', false)

            console.log('addItemToCart')
        },
        
        async addPopularItemToCart(item: Object): Promise<void>{
            this.$store.dispatch('pos/setIsProcessingPayment', false)

            this.$store.dispatch('pos/addItemToCart', item)
        },
        
        generateQrCode(): void {
            console.log('generateQrCode')
            this.$store.dispatch('pos/setIsProcessingPayment', true)
            const routeData = this.$router.resolve({ name: 'GeneratedQrCode' })
            window.open(routeData.href, '_blank')
        }
    },
    created() {
        this.fetchPopularItems()

        if (this.$store.getters['cart/isProcessingPayment']) {
            this.cart = this.$store.state.pos.cart
        }
    }
});
</script>
<style scoped>

li.flex-grow {
  position: relative;
  display: block;
  outline: none;
  cursor: pointer;
  overflow: hidden;
}
li.flex-grow:after {
  position: absolute;
  content: '';
  left: 60px;
  top: 0;
  height: 490%;
  width: 160%;  
  height: 50px;
  background: #fff;
  bottom: 0px;
  right: -150px;
  transform: rotate(45deg);
}
</style>