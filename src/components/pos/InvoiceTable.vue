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
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">{{ item.item_name }}</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">{{ item.unit_price }}</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">{{ item.qty }}</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">{{ item.total }}</td>
				</tr>
			</tbody>
			<tfoot class="text-left">
				<tr>
					<th class="pb-1 pt-4">Subtotal</th>
					<td></td>
					<td colspan="2" class="text-right pt-4">{{ invoice.subTotal }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1">Discount</th>
					<td></td>
					<td colspan="2" class="text-right">{{ invoice.discount }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1">Total</th>
					<td></td>
					<td colspan="2" class="text-right">{{ invoice.total }} {{ getPaymentMethod }}</td>
				</tr>
				<tr>
					<th class="py-1">Tax</th>
					<td></td>
					<td colspan="2" class="text-right">{{ invoice.tax }} {{ getPaymentMethod }}</td>
				</tr>
			</tfoot>
		</table>
		<p class="text-right italic">Paid with {{ invoice.payment_method }}</p>
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