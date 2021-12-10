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
					<td colspan="2" class="text-right pt-4 text-sm">{{ getSubtotal }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Discount</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ getDiscount }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Tax</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ getTax }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Total</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ getTotal }} {{ getPaymentMethod }}</td>
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
				switch (data.payment_method) {
					case 'fiat':
						return '$'
					case 'tnbc':
						return 'TNBC'
					default:
						return ''
				}
			}
		},
		getSubtotal(): number {
			if (!EmptyCheck(this.cart)){
				console.log(this.cart)
				return this.cart.subTotal
			} else if (!EmptyCheck(this.invoice)){
				console.log(this.invoice)
				return this.invoice.subTotal
			} else {
				return 0
			}
		},
		getDiscount(): number {
			if (!EmptyCheck(this.cart)){
				return this.cart.discount
			} else if (!EmptyCheck(this.invoice)){
				return this.invoice.discount
			} else {
				return 0
			}
		},
		getTax(): number {
			if (!EmptyCheck(this.cart)){
				return this.cart.tax
			} else if (!EmptyCheck(this.invoice)){
				return this.invoice.tax
			} else {
				return 0
			}
		},
		getTotal(): number {
			if (!EmptyCheck(this.cart)){
				return this.cart.total
			} else if (!EmptyCheck(this.invoice)){
				return this.invoice.total
			} else {
				return 0
			}
		},
	}
})
</script>