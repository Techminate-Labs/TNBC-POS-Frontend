<template>
	<div>
		<div
			v-if="invoice"
			name="invoice"
			id="invoice-to-print" 
			class="bg-white shadow-md rounded-md hover:shadow-lg max-w-min my-4 mx-auto py-2 px-8 text-left">

			<div class="my-4">
				<p class="font-semibold text-sm text-center">Techminate</p>
				<p class="font-semibold text-sm text-center">Dhaka, Bangladesh</p>
				<p class="font-semibold text-sm text-center mb-2">01680800810</p>
				<p class="text-sm">Date : {{ invoice.date }}</p>
				<p class="text-sm">Memo : {{ getInvoiceNumber }}</p>
				<p class="text-sm">Paid with : {{ invoice.payment_method }}</p>
				<p class="text-sm">Cashier : {{ invoice.cashier }}</p>
			</div>
			<InvoiceTable :invoice="invoice" />
		</div>
		<div v-else class="my-4 mx-auto py-16 px-8 text-center">
			The invoice is not available at the moment.
		</div>
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
			required: true
		}
	},
	computed: {
		getInvoiceNumber(): string {
			return this.$store.state.cart.invoiceNumber
		}
	}
})
</script>