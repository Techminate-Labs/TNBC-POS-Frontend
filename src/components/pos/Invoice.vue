<template>
	<div>
		<div
			v-if="cart || invoice"
			name="invoice"
			id="invoice-to-print" 
			class="bg-white shadow-md rounded-md hover:shadow-lg max-w-min my-4 mx-auto py-2 px-8 text-left">

			<div class="my-4">
				<p class="font-semibold text-sm text-center">Techminate</p>
				<p class="font-semibold text-sm text-center">Dhaka, Bangladesh</p>
				<p class="font-semibold text-sm text-center mb-2">01680800810</p>
				<p class="text-sm">Date : {{ getDate }}</p>
				<p class="text-sm">Memo : {{ getInvoiceNumber }}</p>
				<p class="text-sm">Paid with : {{ getPaymentMethod }}</p>
				<p class="text-sm">Cashier : {{ getCashier }}</p>
			</div>
			<InvoiceTable :invoice="invoice" :cart="cart" />
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
			type: Object
		},
		cart: {
			type: Object
		}
	},
	computed: {
		getDate(): string {
			if (this.cart){
				return this.cart.date
			} else if (this.invoice){
				return this.invoice.date
			} else {
				return ''
			}
		},
		getInvoiceNumber(): string {
			if (this.cart){
				return this.cart.invoice_number
			} else if (this.invoice){
				return this.invoice.invoice_number
			} else {
				return ''
			}
		},
		getPaymentMethod(): string {
			if (this.cart){
				return this.cart.payment_method
			} else if (this.invoice){
				return this.invoice.payment_method
			} else {
				return ''
			}
		},
		getCashier(): string {
			if (this.cart){
				return this.cart.cashier
			} else if (this.invoice){
				return this.invoice.cashier
			} else {
				return ''
			}
		},
	}
})
</script>