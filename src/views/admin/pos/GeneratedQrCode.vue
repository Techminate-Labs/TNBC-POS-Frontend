<template>
	<div class="rounded-md bg-white">
		<div class="px-6 py-4 shadow text-center">
			<div class="max-w-xl mx-auto">
				<h1 class="text-3xl mb-4">We Accept TNBC</h1>
				<qrcode-vue :value="publicKeyObject" :size="size" level="H" class="mx-auto mb-4" />
				<p class="mb-4">Public key: {{ publicKey }}</p>
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
					Use the TNBC Mobile Wallet
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

export default defineComponent({
	name: 'GeneratedQrCode',
	components: { QrcodeVue },
	data(){
		return {
			publicKey: '',
			publicKeyObject: ''
		}
	},
	methods: {
		async fetchConfigurations(): Promise<any> {
            let token = this.$store.state.bearerToken
            await ConfigurationService.listConfigurations(token)
                .then((res) => {
					const publicKey = {"address": res.data.tnbc_pk}
                    this.publicKey = res.data.tnbc_pk 
                    this.publicKeyObject = JSON.stringify(publicKey) 
                })
                .catch(e => {
                    console.log(e)
                })
        },
	},
	mounted(){
		this.fetchConfigurations()
	}
})
</script>

<style>

</style>