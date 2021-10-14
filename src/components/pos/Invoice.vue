<template>
	<div class="bg-white shadow-md rounded-md hover:shadow-lg max-w-min my-4 mx-auto py-2 px-8 text-left">
		<div class="my-4">
			<p class="text-center font-semibold text-lg mb-2">Nike Sports</p>
			<p>No. 146-152 Fuk Wah St.</p>
			<p>Shmashuipo, Kowloon, Hong Kong</p>
			<p>Tel: 880 2386 3245</p>
		</div>
		<div class="my-4">
			<p class="text-center font-semibold text-lg mb-2">Cash Invoice</p>
			<div class="flex flex-nowrap justify-between">
				<p>Date: 1 August, 6.35 AM</p>
				<p>6458712812</p>
			</div>
		</div>
		<InvoiceTable />
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InvoiceTable from "@/components/pos/InvoiceTable.vue"

export default defineComponent({
	name: 'Invoice',
	components: { InvoiceTable }
})
</script>