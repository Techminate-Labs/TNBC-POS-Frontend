<template>
	<div>
		<div class="bg-white rounded-md">
			<table class="divide-y divide-gray-200 border-collapse w-full text-left">
				<thead class="bg-blue-800 text-white">
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
					<tr v-for="(item) in cart.items" :key="item.item_id">
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.price }}</td>
						<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap flex justify-start">
							<button 
								@click="reduceItemQuantity(item.item_id, item.quantity)" 
								class="text-4xl self-center font-mono bg-blue-800 hover:bg-blue-900 text-white rounded m-0 mr-4">
								<MinusIcon class="w-8 h-8 m-2" />
							</button>
							<span class="text-lg mt-2">{{ item.quantity }}</span>
							<button 
								@click="augmentItemQuantity(item.item_id)" 
								class="text-4xl self-center font-mono bg-blue-800 hover:bg-blue-900 text-white rounded m-0 ml-4">
								<PlusIcon class="w-8 h-8 m-2" />
							</button>
						</td>
						<td class="w-full lg:w-auto px-6  whitespace-nowrap">{{ item.price * item.quantity }}</td>
						<td class="w-full lg:w-auto p-3 whitespace-nowrap bg-red-800 text-center">
							<DeleteIcon @click="deleteItem(item.item_id)" class="cursor-pointer text-white transform hover:scale-125 w-full h-5" />
						</td>
					</tr>
				</tbody>
				<tfoot class="text-left bg-blue-800 text-white shadow-md">
					<tr>
						<th class="px-6 py-2">Subtotal</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ $store.getters['pos/subtotal'] }} {{ getCurrency }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Discount</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ null }} {{ getCurrency }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Tax</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ null }} {{ getCurrency }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Total</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ null }} {{ getCurrency }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="bg-red-800 text-white flex flex-nowrap justify-between px-6 py-4 rounded-b-md shadow-md">
			<p>Total Payment</p>
			<p>{{ null }} {{ getCurrency }}</p>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
import CartService from '@/services/pos/CartService';
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
			this.$store.dispatch('pos/deleteCartItem', id)

		},
		async augmentItemQuantity(id: number): Promise<any> {
			this.$store.dispatch('pos/addQuantityToItem', id)
			
		},		
		async reduceItemQuantity(id: number, quantity: number): Promise<any> {
			this.$store.dispatch('pos/removeQuantityToItem', { id: id, quantity: quantity })
			
		}
	},
	computed: {
		getCurrency(): string {
			return this.$store.getters['settings/currency']
		}
	}
})
</script>