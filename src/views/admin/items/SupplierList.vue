<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-4">
			<p class="text-2xl mb-4">Supplier List</p>
			<router-link :to="{ name: 'SupplierCreate' }">
				<button class="base-btn mb-2">Create Supplier</button>
			</router-link>
		</div>
		<DataTable
			:columns="columns"
			:next="next"
			:prev="prev"
			:meta="meta"
			:data="data"
			:type="type"
			@handleSearch="searchSupplier"
			@handleAddProfile="addSupplierProfile"
			@handleView="viewSupplier"
			@handleEdit="editSupplier"
			@handleDelete="showDeleteModal"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange"
			/>
		<div class="hidden" :class="isDeleting ? 'active' : ''">
			<DeleteModal @handleConfirmDelete="deleteSupplier" @close-modal="isDeleting = false" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import SupplierService from "@/services/SupplierService";
import { SupplierItem } from '@/types/Suppliers'
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'SupplierList',
	components: {
		DataTable,
		DeleteModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<SupplierItem>,
			type: "Users",
			url: '/supplierList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isDeleting: false,
			selectedSupplierId: 0 as number,
			columns: [
				{
					attribute: 'name',
					name: 'name'
				},
				{
					attribute: 'email',
					name: 'email'
				},
				{
					attribute: 'phone',
					name: 'phone'
				},
				{
					attribute: 'company',
					name: 'company name'
				},
				{
					attribute: 'item_count',
					name: 'number of products'
				}
			]
		}
	},
	methods: {
		async fetchSuppliers(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await SupplierService.list(url, token)
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
			await this.fetchSuppliers()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchSuppliers()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchSuppliers()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchSuppliers()
			}
		},
		addSupplierProfile(item: any): void {
			this.$router.push({name:'ProfileCreate', params: {id: item.id}})
		},
		viewSupplier(item: any): void {
			this.$router.push({name:'ProfileDetails', params: {id: item.id}})
		},
		editSupplier(item: any): void {
			this.$router.push({name:'SupplierUpdate', params: {id: item.id}})
		},
		showDeleteModal(item: any): any {
			this.isDeleting = true
			this.selectedSupplierId = item.id
		},
		async deleteSupplier(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let id = this.selectedSupplierId
			await SupplierService.delete(id, token)
				.then((response: ResponseData) => {
					this.isDeleting = false
					this.fetchSuppliers()
					this.$toast.open({
						message: `Supplier successfully deleted.`,
						type: "success"
					})
					})
				.catch((e: Error) => {
					this.$toast.open({
						message: `Could not delete that supplier.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async searchSupplier(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = '/supplierList'

			if (value.length > 2 || value.length == 0) {
				if (value.length > 2)
					url = `/supplierList/?q=${value}`
				await SupplierService.list(url, token)
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
			}
		}
	},
	async mounted(): Promise<void> {
		await this.fetchSuppliers()
	},
});
</script>