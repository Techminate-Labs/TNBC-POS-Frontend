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
import CartService from "@/services/CartService"
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'Invoice',
	components: { InvoiceTable },
	data() {
		return {
			invoice: {}
		}
	},
	methods: {
		async fetchInvoice(): Promise<void> {
			const token = this.$store.state.session.bearerToken
			const invoiceNumber = this.$store.state.cart.invoiceNumber
			const cart = this.$store.state.cart
			const params = `?invoice_number=${cart.invoiceNumber}&coupon=${cart.coupon}&payment_method=${cart.paymentMethod}`
			await CartService.prepareInvoice(params, token)
				.then((response: ResponseData) => {
                    let res = response.data
					console.log(res)
                })
                .catch((e: Error) => {
                    console.log(e);
                });
		}
	},
	async mounted() {
		await this.fetchInvoice()
	}
})
</script>