<template>
	<div>
		<table class="divide-y divide-gray-200 border-collapse w-full text-left">
			<thead>
				<tr>
					<th class="text-sm pr-6">Item</th>
					<th class="text-sm pr-6">Price</th>
					<th class="text-sm pr-6">Qty</th>
					<th class="text-sm">Total</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<tr v-for="(item) in getItem" :key="item.id">
					<td class="w-full lg:w-auto py-4 whitespace-nowrap text-sm">{{ item.item_name }}</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap text-sm">{{ item.unit_price }}</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap text-sm">{{ item.qty }}</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap text-sm">{{ item.total }}</td>
				</tr>
			</tbody>
			<tfoot class="text-left">
				<tr>
					<th class="pb-1 pt-4 text-sm">Subtotal</th>
					<td></td>
					<td colspan="2" class="text-right pt-4 text-sm">{{ getMeta.subTotal }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Discount</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ getMeta.discount }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Tax</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ getMeta.tax }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Total</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ getMeta.total }} {{ getPaymentMethod }}</td>
				</tr>
			</tfoot>
		</table>
		<p class="text-center italic text-sm">Thank You</p>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Cart } from '@/types/pos/Cart'
import EmptyCheck from '@/mixins/EmptyCheck'

export default defineComponent({
	name: 'InvoiceTable',
	props: {
		invoice: {
            type: Object as PropType<Cart>,
            required: true
        },
		cart: {
            type: Object as PropType<Cart>,
            required: true
        },
	},
	computed: {
		getItem(): any {
			if (!EmptyCheck(this.cart)){
				return this.cart.cartItems
			} else if (!EmptyCheck(this.invoice)){
				return this.invoice.cartItems
			} else {
				return []
			}
		},
		getPaymentMethod(): any {
			let data: Cart | null = null
			if (!EmptyCheck(this.cart)){
				data = this.cart
			} else if (!EmptyCheck(this.invoice)){
				data = this.invoice
			}
			if (data && !EmptyCheck(data as Cart)){
				return this.$store.getters.cartCurrency(data.payment_method)
			}
		},
		getMeta(): Object {
			if (!EmptyCheck(this.cart)){
				return {
					subTotal: this.cart.subTotal,
					discount: this.cart.discount,
					tax: this.cart.tax,
					total: this.cart.total,
				}
			} else if (!EmptyCheck(this.invoice)){
				return {
					subTotal: this.invoice.subTotal,
					discount: this.invoice.discount,
					tax: this.invoice.tax,
					total: this.invoice.total,
				}
			} else {
				return {}
			}
		}
	}
})
</script>