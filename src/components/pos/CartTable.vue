<template>
	<div>
		<div class="bg-white rounded-md">
			<table class="divide-y divide-gray-200 border-collapse w-full text-left">
				<thead class="bg-blue-900 text-white">
					<tr>
						<th class="px-6 py-3 text-sm">Item</th>
						<th class="px-6 py-3 text-sm">Unit</th>
						<th class="px-6 py-3 text-sm">Unit Price</th>
						<th class="px-6 py-3 text-sm">Quantity</th>
						<th class="px-6 py-3 text-sm">Total</th>
						<th class="px-6 py-3 text-sm"></th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					<tr v-for="(item) in cart.cartItems" :key="item.item_id">
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.item_name }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit_price }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap flex justify-around">
							<button 
								@click="reduceItemQuantity(item.qty, item.item_id)" 
								class="text-4xl self-center font-mono bg-blue-900 hover:bg-blue-500 text-white rounded-full mr-2">
								<MinusIcon class="w-6 h-6" />
							</button>
							<span class="text-lg mt-2">{{ item.qty }}</span>
							<button 
								@click="augmentItemQuantity(item.qty, item.item_id)" 
								class="text-4xl self-center font-mono bg-blue-900 hover:bg-blue-500 text-white rounded-full ml-2">
								<PlusIcon class="w-6 h-6" />
							</button>
						</td>
						<td class="w-full lg:w-auto px-6  whitespace-nowrap">{{ item.unit_price * item.qty }}</td>
						<td class="w-full lg:w-auto p-3 whitespace-nowrap bg-red-800 text-center">
							<DeleteIcon @click="deleteItem(item.item_id)" class="cursor-pointer text-white hover:text-blue-700 w-5 h-5" />
						</td>
					</tr>
				</tbody>
				<tfoot class="text-left bg-blue-900 text-white shadow-md">
					<tr>
						<th class="px-6 py-2">Subtotal</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ getCartSubtotal }} {{ $store.getters.cartCurrency(cart.payment_method) }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Discount</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ cart.discount }} {{ $store.getters.cartCurrency(cart.payment_method) }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Tax</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ getCartTax }} {{ $store.getters.cartCurrency(cart.payment_method) }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Total</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ getCartTotal }} {{ $store.getters.cartCurrency(cart.payment_method) }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="bg-red-800 text-white flex flex-nowrap justify-between px-6 py-4 rounded-b-md shadow-md">
			<p>Total Payment</p>
			<p>{{ getCartTotal }} {{ $store.getters.cartCurrency('tnbc') }}</p>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/** Components */
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
import CartService from '@/services/pos/CartService';
import PlusIcon from "@/components/icons/PlusIcon.vue"
import MinusIcon from "@/components/icons/MinusIcon.vue"

/** Types */
import { Cart } from '@/types/pos/Cart'

export default defineComponent({
	name: 'CartTable',
	components: { DeleteIcon, PlusIcon, MinusIcon },
	data(){
        return {
            cart: this.$store.state.pos.cart as Cart
        }
    },
	methods: {
		async deleteItem(item_id: number): Promise<any> {
			this.$store.dispatch('pos/removeItemFromCart', item_id)
		},
		async reduceItemQuantity(qty: number, id: number): Promise<any> {
			
			if (qty > 1) {
				this.$store.dispatch('pos/removeQuantityFromCartItem', id)
			} else if (qty = 1) {
				this.deleteItem(id)
			}
		},
		async augmentItemQuantity(qty: number, id: number): Promise<any> {
			if (qty > 0) {
				this.$store.dispatch('pos/addQuantityToCartItem', id)
			}
			
		}
	},
	computed: {
		getCartSubtotal() {
			return this.$store.getters['pos/cartSubtotal']
		},
		getCartTax() {
			return this.$store.getters['pos/cartTax']
		},
		getCartTotal() {
			return this.$store.getters['pos/cartTotal']
		},
		
	}
})
</script>