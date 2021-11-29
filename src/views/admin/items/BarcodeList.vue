<template>
	<div class="mt-6">
		<div class="flex flex-nowrap justify-between pt-4">
			<p class="text-2xl mb-4">Barcodes</p>
			<button
				class="base-btn mb-2">
				Print
			</button>
		</div>
		<ul class="flex flex-wrap my-2">
			<img v-for="item in items" :key="item.item_id" :id="'barcode-' + item.item_id" />
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JsBarcode from 'jsbarcode'
import ItemService from '@/services/items/ItemService'

export default defineComponent({
	name: 'BarcodeList',
	data (){
		return {
			items: []
		}
	},
	methods: {
		async fetchItems(): Promise<any> {
			const token = this.$store.state.session.bearerToken
			await ItemService.list('itemList', token)
				.then(res => {
					this.items = res.data.data
				})
				.catch(err => {
					console.log(err)
				})
		},
		getBarcodes(): void {
			this.items.map((item: any) => JsBarcode(`#barcode-${item.item_id}`, item.sku, {background: 'transparent'})) as any
		}
	},
	computed: {
	},
	async mounted(){
		await this.fetchItems()
	},
	updated() {
		this.getBarcodes()
	}
})
</script>

<style>

</style>