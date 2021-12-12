<template>
	<div class="rounded-md bg-white">
		<div class="px-6 py-4 shadow text-center">
			<div class="max-w-xl mx-auto">
				<h1 class="display-h1">We Accept TNBC</h1>
				<qrcode-vue :value="publicKeyObject" level="H" class="mx-auto mb-4" />
				<p class="mb-4">Public key: {{ publicKey }}</p>
				<p class="mb-4">To Pay: {{ total }}</p>
				<p class="mb-4">Memo: {{ getInvoiceNumber }}</p>
			</div>
		</div>  
		<div class="w-full bg-gray-200">
			<div class="text-left max-w-xl mx-auto py-4">
				<p class="mb-2 text-lg font-semibold">
					<span class="text-xl font-bold">1 -</span>
					Use the TNBC Mobile Wallet
				</p>

				<p class="mb-2 text-lg font-semibold">
					<span class="text-xl font-bold">2 -</span>
					Scan the QR Code
				</p>
				<p class="mb-2 text-lg font-semibold">
					<span class="text-xl font-bold">3 -</span>
					Complete the Payment
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue'
import ConfigurationService from "@/services/ConfigurationService"
import CartService from "@/services/pos/CartService"

export default defineComponent({
	name: 'GeneratedQrCode',
	components: { QrcodeVue },
	data(){
		return {
			publicKey: '',
			publicKeyObject: '',
			total: 0,
			memo: ''
		}
	},
	methods: {
		async fetchConfigurations(): Promise<any> {
            let token = this.$store.state.session.bearerToken
            await ConfigurationService.list(token)
                .then((res) => {
					this.publicKey = res.data.tnbc_pk 
					const publicKey = { "address": res.data.tnbc_pk }
                    this.publicKeyObject = JSON.stringify(publicKey) 
                })
                .catch(e => {
                    console.log(e)
                })
        },
		async fetchTotal(): Promise<any> {
			const cart = this.$store.state.cart
			if (cart.paymentMethod != 'fiat'){
				const token = this.$store.state.session.bearerToken
				const coupon = cart.coupon ? cart.coupon : ''
				let params = `?coupon=${coupon}&payment_method=tnbc`
				await CartService.listItems(params, token)
					.then((res) => {
						console.log(res)
						this.total = res.data.total
						const publicKey = { 
							"address": this.publicKey, 
							"amount": res.data.total.toString(),
							"memo": this.$store.state.cart.invoiceNumber
						}
						this.publicKeyObject = JSON.stringify(publicKey) 
					})
					.catch(e => {
						console.log(e)
					})
			}
        },
	},
	computed: {
		getInvoiceNumber(): string {
			return this.$store.state.cart.invoiceNumber
		}
	},
	mounted(){
		this.fetchConfigurations()
		this.fetchTotal()
	}
})
</script>

<style>

</style>