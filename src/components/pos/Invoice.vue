<template>
	<div class="bg-white shadow-md rounded-md hover:shadow-lg max-w-min my-4 mx-auto py-2 px-8 text-left">
		<div class="my-4">
			<p class="text-center font-semibold text-lg mb-2">SHOP'S NAME</p>
			<p>SHOP'S ADDRESS</p>
			<p>SHOP'S ADDRESS</p>
			<p>SHOP'S PHONE NUMBER</p>
		</div>
		<div class="my-4">
			<p class="text-center font-semibold text-lg mb-2">Cash Invoice</p>
			<div class="flex flex-nowrap justify-between">
				<p>Date: {{ invoice.date }}</p>
				<p>{{ invoice.invoice_number }}</p>
			</div>
		</div>
		<InvoiceTable :invoice="invoice" />
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InvoiceTable from "@/components/pos/InvoiceTable.vue"

export default defineComponent({
	name: 'Invoice',
	components: { InvoiceTable },
	props: {
		invoice: {
            // type: Object as PropType<any>,
            required: true
        },
	}
})
</script>