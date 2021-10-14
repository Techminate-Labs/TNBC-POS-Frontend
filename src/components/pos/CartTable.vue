<template>
	<div class="text-center bg-white my-4 rounded-md">
		<table class="divide-y divide-gray-200 border-collapse w-full text-left">
			<thead>
				<tr>
					<th class="px-6 text-sm">Item</th>
					<th class="px-6 text-sm">Unit</th>
					<th class="px-6 text-sm">Unit Price</th>
					<th class="px-6 text-sm">Quantity</th>
					<th class="px-6 text-sm">Total</th>
					<th class="px-6 text-sm"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<tr>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">American Jersey</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">2 pcs</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">18.50</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">Quantity</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">37.00</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap"><DeleteIcon class="cursor-pointer hover:text-red-700 w-5 h-5" /></td>
				</tr>
				<tr>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">American Jersey</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">2 pcs</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">18.50</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">Quantity</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">37.00</td>
					<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap"><DeleteIcon class="cursor-pointer hover:text-red-700 w-5 h-5" /></td>
				</tr>
			</tbody>
			<tfoot class="text-left bg-blue-900 text-white shadow-md">
				<tr>
					<th class="px-6 py-2">Subtotal</th>
					<td></td>
					<td></td>
					<td></td>
					<td colspan="2" class="px-6 text-right">17.50 TNBC</td>
				</tr>
				<tr>
					<th class="px-6 py-2">Discount</th>
					<td></td>
					<td></td>
					<td></td>
					<td colspan="2" class="px-6 text-right">1.50 TNBC</td>
				</tr>
				<tr>
					<th class="px-6 py-2">Tax</th>
					<td></td>
					<td></td>
					<td></td>
					<td colspan="2" class="px-6 text-right">2 TNBC</td>
				</tr>
				<tr>
					<th class="px-6 py-2">Total</th>
					<td></td>
					<td></td>
					<td></td>
					<td colspan="2" class="px-6 text-right">21 TNBC</td>
				</tr>
			</tfoot>
		</table>
		<div class="bg-red-800 text-white flex flex-nowrap justify-between px-6 py-4 rounded-b-md shadow-md">
			<p>Total Payment</p>
			<p>21 TNBC</p>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DeleteIcon from "@/components/icons/DeleteIcon.vue"

export default defineComponent({
	name: 'CartTable',
	components: { DeleteIcon }
})
</script>