<template>
    <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-md shadow-md col-span-1">
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
            <div class="grid grid-cols-3 rounded-xl gap-3 p-4">
                <div v-for="(item, index) in popularItems" :key="index">
                    <ItemCard :item="item" @click="addPopularItemToCart(item.item_id)" />
                </div>
            </div>
        </div>
        <div class="bg-white rounded-md col-span-1 col-start-2">
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
                        @discountChange="setDiscount" 
                        @prepareInvoice="prepareInvoice"
                        @loadExplorer="$router.push({name: 'TransactionExplorer'})"
                        @changePaymentMethod="updateCartMethod" />
                </div>
                <div :class="isActive('invoice') ? 'block' : 'hidden'">
                    <Invoice :invoice="cart "/>
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
import ItemService from "@/services/items/ItemService";
import CartService from "@/services/pos/CartService";
import CustomerService from "@/services/pos/CustomerService";
import { ItemObject } from '@/types/items/Items'
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: 'PointOfSale',
    components: { ItemCard, CartTable, Payments, Invoice, CustomerForm, Multiselect },
    data(){
        return {
            popularItems: [] as Array<ItemObject>,
            activeItem: 'cart',
            cart: [],
            invoice: {},
            itemId: '',
            customerId: '',
            discountCode: '',
            paymentMethod: 'fiat'
        }
    },
    methods: {
        async fetchPopularItems(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let url = `/itemList?limit=0`
            await ItemService.list(url, token)
                .then((response: ResponseData) => {
                    let res = response.data
                    this.popularItems = res.data
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        async updateCartMethod(method: string): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let params = `?discount=${this.discountCode}&payment_method=${method}`
            await CartService.listItems(params, token)
                .then((response: ResponseData) => {
                    let res = response.data
                    this.cart = res
                    this.paymentMethod = res.payment_method
                    this.$store.commit('setPaymentMethod', res.payment_method)
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        async fetchCartItems(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let params = `?discount=${this.discountCode}&payment_method=${this.paymentMethod}`
            await CartService.listItems(params, token)
                .then((response: ResponseData) => {
                    let res = response.data
                    this.cart = res
                    this.paymentMethod = res.payment_method
                    this.$store.commit('setPaymentMethod', res.payment_method)
                    this.$store.commit('setInvoiceNumber', res.invoice_number)
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
                    .then((response: ResponseData) => {
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
                    .then((response: ResponseData) => {
                        let res = response.data
                        return res.data.map((item: any) => {
                            return { value: item.id, label: item.name }
                        })
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
                console.log(results)
                return results
            }
        },
        async prepareInvoice(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            let cart = this.$store.state.cart
            let params = `?invoice_number=${cart.invoiceNumber}&coupon=${this.discountCode}&payment_method=${this.paymentMethod}`
            console.log('test')
            await CartService.prepareInvoice(params, token)
                .then((response: ResponseData) => {
                    this.$toast.open({
                        message: `The invoice has been prepared.`,
                        type: "success"
                    })
                    this.fetchInvoice()
                    this.activeItem = 'invoice'
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        async fetchInvoice(): Promise<void> {
			const token = this.$store.state.session.bearerToken
			const cart = this.$store.state.cart
			const params = `?invoice_number=${cart.invoiceNumber}&coupon=${cart.coupon}&payment_method=${cart.paymentMethod}`
			await CartService.prepareInvoice(params, token)
				.then((response: ResponseData) => {
                    let res = response.data
					console.log('fetchInvoice response', res)
                    this.invoice = res
                })
                .catch((e: Error) => {
                    console.log(e);
                });
		},
        setDiscount(e: any): void {
            this.discountCode = e.target.value.toString()
            this.$store.commit('setCoupon', e.target.value.toString())
        },
        setActive(tabItem: string): void {
            this.activeItem = tabItem
        },
        isActive(tabItem: string): boolean {
            return this.activeItem === tabItem
        },
        customLabel ({ title, desc }: any) {
            return `${title} – ${desc}`
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
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async addItemToCart(): Promise<void>{
            let item = this.itemId as string
            let token = this.$store.state.session.bearerToken

            let fd = new FormData()
            fd.append('item_id', item)
            console.log(fd)
            await CartService.addItem(fd, token)
                .then((response) => {
                    this.$toast.open({
                        message: `Item has been added to the cart!`,
                        type: "success"
                    })
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
            console.log(fd)
            await CartService.addItem(fd, token)
                .then((response) => {
                    this.$toast.open({
                        message: `Item has been added to the cart!`,
                        type: "success"
                    })
                    this.fetchCartItems()
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
    mounted() {
        this.fetchPopularItems()
        this.fetchCartItems()
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