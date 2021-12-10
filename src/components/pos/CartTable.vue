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
					<tr v-for="(item) in cart.cartItems" :key="item.id">
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.item_name }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit_price }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap flex justify-around">
							<button 
								@click="reduceItemQuantity(item.qty, item.id)" 
								class="text-4xl self-center font-mono bg-blue-900 hover:bg-blue-500 text-white rounded-full mr-2">
								<MinusIcon class="w-6 h-6" />
							</button>
							<span class="text-lg">{{ item.qty }}</span>
							<button 
								@click="augmentItemQuantity(item.qty, item.id)" 
								class="text-4xl self-center font-mono bg-blue-900 hover:bg-blue-500 text-white rounded-full ml-2">
								<PlusIcon class="w-6 h-6" />
							</button>
						</td>
						<td class="w-full lg:w-auto px-6  whitespace-nowrap">{{ item.total }}</td>
						<td class="w-full lg:w-auto p-3 whitespace-nowrap bg-red-800 text-center">
							<DeleteIcon @click="deleteItem(item.id)" class="cursor-pointer text-white hover:text-blue-700 w-5 h-5" />
						</td>
					</tr>
				</tbody>
				<tfoot class="text-left bg-blue-900 text-white shadow-md">
					<tr>
						<th class="px-6 py-2">Subtotal</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ cart.subTotal }} {{ getPaymentMethod }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Discount</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ cart.discount }} {{ getPaymentMethod }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Tax</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ cart.tax }} {{ getPaymentMethod }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Total</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ cart.total }} {{ getPaymentMethod }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="bg-red-800 text-white flex flex-nowrap justify-between px-6 py-4 rounded-b-md shadow-md">
			<p>Total Payment</p>
			<p>{{ cart.total }} {{ getPaymentMethod }}</p>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
import CartService from '@/services/pos/CartService';
import ResponseData from "@/types/ResponseData";
import PlusIcon from "@/components/icons/PlusIcon.vue"
import MinusIcon from "@/components/icons/MinusIcon.vue"

export default defineComponent({
	name: 'CartTable',
	components: { DeleteIcon, PlusIcon, MinusIcon },
	props: {
		cart: {
			required: false,
			type: Object
        },
	},
	methods: {
		async deleteItem(id: number): Promise<any> {
			let token = this.$store.state.session.bearerToken
			await CartService.deleteItem(id, token)
				.then((res: ResponseData) => {
					this.$emit('fetchCart')
				})
				.catch((e: Error) => {
                    console.log(e);
                });
		},
		async reduceItemQuantity(qty: number, id: number): Promise<any> {
			let token = this.$store.state.session.bearerToken
			if (qty > 1) {
				qty -= 1
				let body = {
					qty: qty,
					'_method': 'PUT'
				}
				await CartService.updateItem(body, id, token)
					.then((res: ResponseData) => {
						this.$emit('fetchCart')
					})
					.catch((e: Error) => {
						console.log(e);
					});
			
			} else if (qty = 1) {
				this.deleteItem(id)
			}
		},
		async augmentItemQuantity(qty: number, id: number): Promise<any> {
			let token = this.$store.state.session.bearerToken
			if (qty > 0) {
				qty += 1
				let body = {
					qty: qty,
					'_method': 'PUT'
				}
				await CartService.updateItem(body, id, token)
					.then((res: ResponseData) => {
						this.$emit('fetchCart')
					})
					.catch((e: Error) => {
						console.log(e);
					});
			
			}
			
		}
	},
	computed: {
		getPaymentMethod(): string {
			if (this.cart){
				switch (this.cart.payment_method) {
					case 'fiat':
						return '$'
					case 'tnbc':
						return 'TNBC'
					default:
						return ''
				}
			} else {
				return ''
			}
		}
	}
})
</script>