<template>
	<div class="mt-6">
		<div class="flex flex-nowrap justify-between pt-4">
			<h1 class="display-h1">Barcodes</h1>
			<button
				class="base-btn mb-2">
				Print
			</button>
		</div>
		<h2 class="display-h2">Inventory: {{ iteration }}</h2>
		<h2 class="display-h2">Product: {{ item.name }}</h2>
		<ul class="flex flex-wrap my-2">
			<li v-for="(index) in iteration" :key="index">
				<Barcode />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Barcode from '@/components/Barcode.vue'
import ItemService from '@/services/items/ItemService'
import JsBarcode from 'jsbarcode'

export default defineComponent({
	name: 'BarcodeList',
	components: { Barcode },
	data (){
		return {
			iteration: Number(this.$route.params.inventory),
			item: {}
		}
	},
	methods: {
		getBarcodes(): void {
			const params = this.$route.params
			let array = []

			for (let x = 0; x < Number(params.inventory); x++){
				array.push(JsBarcode(`#barcode-${params.item_id}`, params.sku.toString(), {background: 'transparent'})) as any
			}
		},
		async getItem(): Promise<void> {
			const token = this.$store.state.session.bearerToken
			await ItemService.getById(Number(this.$route.params.item_id), token)
			.then(res => this.item = res.data)
			.catch(err => console.log(err))
		}
	},
	async mounted(){
		await this.getBarcodes()
		await this.getItem()
	}
})
</script>

<style>

</style>