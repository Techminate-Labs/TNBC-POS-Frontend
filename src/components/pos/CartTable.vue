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
							<input v-model.lazy="item.quantity" @input="changeItemQuantity($event, item.item_id)" type="number" class="text-lg mt-2 w-20 text-right" />
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
						<td colspan="2" class="px-6 text-right">{{ getSubtotal }} {{ getCurrency }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Discount</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">- {{ getDiscount }} {{ getCurrency }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Tax</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ getTax }} {{ getCurrency }}</td>
					</tr>
					<tr>
						<th class="px-6 py-2">Total</th>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2" class="px-6 text-right">{{ getTotal }} {{ getCurrency }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="bg-red-800 text-white flex flex-nowrap justify-between px-6 py-4 rounded-b-md shadow-md">
			<p>Total Payment</p>
			<p>{{ getTotal }} {{ getCurrency }}</p>
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
		deleteItem(id: number): void {
			this.$store.dispatch('pos/deleteCartItem', id)

		},
		augmentItemQuantity(id: number): void {
			this.$store.dispatch('pos/addQuantityToItem', id)
			
		},		
		reduceItemQuantity(id: number, quantity: number): void {
			this.$store.dispatch('pos/removeQuantityToItem', { id: id, quantity: quantity })

		},
		changeItemQuantity(event: any, id: number): void {
			let quantity = parseInt(event.target.value) as number | null

			// check if input is empty
			// in the case that's it's empty, assign null
			// otherwise assign the same quantity
			quantity = quantity == NaN ? null : quantity
			if (quantity !== 0) {
				this.$store.dispatch('pos/updateQuantityOfItem', { id: id, quantity: quantity })

			// if the quantity is EXACTLY 0, then delete the product
			} else if (quantity === 0) {
				console.log('eq 0')
				this.$store.dispatch('pos/deleteCartItem', id )

			}

		}
	},
	computed: {
		getCurrency(): string {
			return this.$store.getters['settings/currency']
		},
		getSubtotal(): number {
			return this.$store.getters['pos/subtotal']
		},
		getDiscount(): number {
			return this.$store.getters['pos/discount']
		},
		getTax(): number {
			const taxRate = this.$store.state.settings.taxRate
			const subtotal = this.$store.getters['pos/subtotal']
			const discount = this.$store.getters['pos/discount']
		
			return Math.ceil((subtotal - discount) * (taxRate / 100))
		},
		getTotal(): any {
			const subtotal = this.$store.getters['pos/subtotal']
			const taxRate = this.$store.state.settings.taxRate
			const discount = this.$store.getters['pos/discount']

			const tax = Math.ceil((subtotal - discount) * (taxRate / 100))

			return subtotal - discount + tax
		}
	}
})
</script>