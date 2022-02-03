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
                    <ItemCard :item="item" @click="addPopularItemToCart(item.item_id)" />
                </div>
            </div>
        </div>
        <div class="bg-white rounded-md col-span-1 lg:col-span-4 lg:col-start-3 xl:col-span-3 xl:col-start-4">
            <div class="flex flex-col flex-nowrap w-full mb-4 p-4">
                <Multiselect
                    v-model="customerId"
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
                    <CartTable :cart="cart" @fetchCart="fetchCartItems" />
                    <Payments 
                        @discountChange="addCoupon"
                        @printInvoice="printInvoice"
                        @loadExplorer="$router.push({name: 'TransactionExplorer'})"
                        @changePaymentMethod="updateCartMethod"
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
            cart: {} as Cart,
            invoice: this.$store.state.pos.cart,
            customerId: '',
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
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        async updateCartMethod(method: string): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let params = `?coupon=${this.discountCode}&payment_method=${method}`
            await CartService.listItems(params, token)
                .then((response) => {
                    let res = response.data
                    this.cart = res
                    this.$store.dispatch('setCart', res)
                    this.paymentMethod = res.payment_method
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        async fetchCartItems(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let params = new URLSearchParams({
                coupon: this.discountCode,
                payment_method: this.paymentMethod
            })
            await CartService.listItems(params, token)
                .then((response) => {
                    let res = response.data

                    if (!this.$store.getters.isProccessingPayment){
                        this.cart = res
                        this.$store.dispatch('setCart', res)
                        this.paymentMethod = res.payment_method
                    } else {
                        this.$toast.open({
                            message: 'Payment is on process',
                            type: "info"
                        })
                        console.log('Payment is on process')
                    }
                    
                })
                .catch((e: Error) => {
                    console.log(e);
                });
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
                    .catch((e: Error) => {
                        console.log(e);
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
                    .catch((e: Error) => {
                        console.log(e);
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
            
            this.isGeneratingInvoice = true
            this.$store.dispatch('setIsProcessingPayment', true)

            const token = this.$store.state.session.bearerToken
			const cart = this.$store.state.pos.cart
            const coupon = this.$store.state.pos.coupon
            this.invoice = cart
			const params = `?invoice_number=${cart.invoice_number}&payment_method=${cart.payment_method}&coupon=${coupon}`

			await CartService.printInvoice(params, token)
				.then((response) => {
                    let res = response.data
                    this.$toast.open({
                        message: res.done,
                        type: "success"
                    })
                    this.activeItem = 'invoice'
                    this.cart = {} as Cart
                    this.discountCode = ''

                    this.$store.dispatch('setCart', this.cart)
                    this.$store.dispatch('setCoupon', '')
                    
                    this.isGeneratingInvoice = false
                })
                .catch((e: Error) => {
                    console.log(e);
                });
           
        },
        async addCoupon(discount: any): Promise<void> {
            this.discountCode = discount.toString()
            this.$store.dispatch('setCoupon', discount.toString())
            const token = this.$store.state.session.bearerToken
            const cart = this.$store.state.pos.cart
            const params = `?invoice_number=${cart.invoice_number}&coupon=${this.discountCode}&payment_method=${cart.payment_method}`

            await CartService.listItems(params, token)
                .then(response => {
                    let res = response.data
                    console.log(res)
                    this.cart = res
                    this.$store.dispatch('setCart', this.cart)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        setActive(tabItem: string): void {
            this.activeItem = tabItem
        },
        isActive(tabItem: string): boolean {
            return this.activeItem === tabItem
        },
        async addCustomerToCart(): Promise<void>{
            let item = this.customerId as string
            let token = this.$store.state.session.bearerToken
            
            let fd = new FormData()
            fd.append('customer_id', item)
            await CartService.addCustomer(fd, token)
                .then((response) => {
                    this.$toast.open({
                        message: `A customer has been linked to the cart!`,
                        type: "success"
                    })
                    this.customerId = ''
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async addItemToCart(): Promise<void>{
            this.$store.dispatch('setIsProcessingPayment', false)

            let token = this.$store.state.session.bearerToken

            let data = new FormData()
            data.append('item_id', this.itemId)
            // const data = new URLSearchParams({
            //     item_id: this.itemId
            // })
            
            await CartService.addItem(data, token)
                .then((response) => {
                    this.$toast.open({
                        message: `Item has been added to the cart!`,
                        type: "success"
                    })

                    this.itemId = ''
                    this.fetchCartItems()
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async addPopularItemToCart(id: number): Promise<void>{
            let token = this.$store.state.session.bearerToken

            let fd = new FormData()
            fd.append('item_id', id.toString())
            await CartService.addItem(fd, token)
                .then((response) => {
                    if (response.data.failed) {
                        this.$toast.open({
                            message: response.data.failed,
                            type: "error"
                        })
                    } else if (response.data.done) {
                        this.$toast.open({
                            message: response.data.done,
                            type: "success"
                        })
                    }
                    this.fetchCartItems()
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        generateQrCode(): void {
            this.$store.dispatch('setIsProcessingPayment', true)
            const routeData = this.$router.resolve({ name: 'GeneratedQrCode' })
            window.open(routeData.href, '_blank')
        }
    },
    created() {
        this.fetchPopularItems()
        console.log('isProcessingPayment', this.$store.getters.isProcessingPayment)
        if (!this.$store.getters.isProcessingPayment) this.fetchCartItems()
        if (this.$store.getters.isProcessingPayment) this.cart = this.$store.state.pos.cart
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