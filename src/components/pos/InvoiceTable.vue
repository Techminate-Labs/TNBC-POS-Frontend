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
				<tr v-for="(item) in invoice.cartItems" :key="item.id">
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
					<td colspan="2" class="text-right pt-4 text-sm">{{ invoice.subTotal }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Discount</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ invoice.discount }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Tax</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ invoice.tax }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1 text-sm">Total</th>
					<td></td>
					<td colspan="2" class="text-right text-sm">{{ invoice.total }} {{ getPaymentMethod }}</td>
				</tr>
			</tfoot>
		</table>
		<p class="text-center italic text-sm">Thank You</p>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'InvoiceTable',
	props: {
		invoice: {
            type: Object,
            required: true
        },
	},
		computed: {
		getPaymentMethod(): string {
			switch (this.invoice.payment_method) {
				case 'fiat':
					return '$'
				case 'tnbc':
					return 'TNBC'
				default:
					return ''
			}
		}
	}
})
</script>