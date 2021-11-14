<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-4">
			<p class="text-2xl mb-4">Invoices List</p>
		</div>
		<DataTable
			:columns="columns"
			:next="next"
			:prev="prev"
			:meta="meta"
			:data="data"
			:type="type"
			@handleSearch="searchItem"
			@handleView="viewItem"
			@handleEdit="editItem"
			@handleDelete="showDeleteModal"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange" 
			/>
		<div class="hidden" :class="isDeleting ? 'active' : ''">
			<DeleteModal @handleConfirmDelete="deleteItem" @close-modal="isDeleting = false" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import SalesService from "@/services/SalesService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'InvoiceList',
	components: {
		DataTable,
		DeleteModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<any>,
			type: "Users",
			url: '/itemList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isDeleting: false,
			selectedItemId: 0 as number,
			columns: [
				{
					attribute: 'Invoice No.',
					name: 'image'
				},
				{
					attribute: 'name',
					name: 'name'
				},
				{
					attribute: 'category',
					name: 'category'
				},
				{
					attribute: 'price',
					name: 'price'
				},
				{
					attribute: 'inventory',
					name: 'stock'
				},
				{
					attribute: 'available',
					name: 'availability'
				},
			]
		}
	},
	methods: {
		async fetchItems(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await SalesService.list(url, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.data = res.data
					this.meta = {
						current_page: res.current_page,
						from: res.from,
						last_page: res.last_page,
						links: res.links,
						path: res.path,
						per_page: res.per_page,
						to: res.to,
						total: res.total
					}
					this.prev = res.prev_page_url
					this.next = res.next_page_url
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}`
			await this.fetchItems()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchItems()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchItems()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchItems()
			}
		},
		viewItem(item: any): void {
			this.$router.push({name:'ItemDetails', params: {id: item.item_id}})
		},
		editItem(item: any): void {
			this.$router.push({name:'ItemUpdate', params: {id: item.item_id}})
		},
		showDeleteModal(item: any){
			this.isDeleting = true
			this.selectedItemId = item.id
		},
	},
	async mounted(): Promise<void> {
		await this.fetchItems()
	},
});
</script>