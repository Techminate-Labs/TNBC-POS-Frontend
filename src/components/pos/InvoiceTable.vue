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
				<tr>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">American Jersey</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">18.50</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">1</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">18.50</td>
				</tr>
				<tr>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">American Jersey</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">18.50</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">1</td>
					<td class="w-full lg:w-auto py-4 whitespace-nowrap">18.50</td>
				</tr>
			</tbody>
			<tfoot class="text-left">
				<tr>
					<th class="pb-1 pt-4">Subtotal</th>
					<td></td>
					<td colspan="2" class="text-right pt-4">17.50 TNBC</td>
				</tr>
				<tr>
					<th class="py-1">Discount</th>
					<td></td>
					<td colspan="2" class="text-right">1.50 TNBC</td>
				</tr>
				<tr>
					<th class="py-1">Total</th>
					<td></td>
					<td colspan="2" class="text-right">21 TNBC</td>
				</tr>
				<tr>
					<th class="py-1">Tax</th>
					<td></td>
					<td colspan="2" class="text-right">2 TNBC</td>
				</tr>
				<tr>
					<th class="py-1">Payment</th>
					<td></td>
					<td colspan="2" class="text-right">2 TNBC</td>
				</tr>
			</tfoot>
		</table>
		<div class="flex flex-nowrap justify-between border-t border-dashed border-gray-300 my-2 pt-4">
			<p>Change</p>
			<p>0 TNBC</p>
		</div>
		<p class="text-right italic">Paid with TNBC</p>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'InvoiceTable'
})
</script>