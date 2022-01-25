<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-4">
			<h1 class="display-h1">Brand List</h1>
			<button
				@click="showBrandCreateModal"
				v-show="$store.getters.userCan('create', 'Items')"
				class="base-btn mb-2">
				Create Brand
			</button>
		</div>
		<DataTable 
			:columns="columns"
			:data="data"
			:meta="meta"
			:next="next"
			:prev="prev"
			:type="type"
			@handleSearch="searchBrand"
			@handleView="viewBrand"
			@handleEdit="showBrandEditModal"
			@handleDelete="showDeleteModal"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage"
			@maxItemsPerPageChange="pageLimitChange" 
			/>
		<div class="hidden" :class="isCreating ? 'active' : ''">
			<BrandModalCreate @handleSave="createBrand" @close-modal="isCreating = false" />
		</div>
		<div class="hidden" :class="isEditing ? 'active' : ''">
			<BrandModalUpdate :id="selectedBrand.name" @handleSave="editBrand" @close-modal="isEditing = false" />
		</div>
		<div class="hidden" :class="isDeleting ? 'active' : ''">
			<DeleteModal @handleConfirmDelete="deleteBrand" @close-modal="isDeleting = false" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import BrandModalCreate from '@/components/modals/BrandModalCreate.vue'
import BrandModalUpdate from '@/components/modals/BrandModalUpdate.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import BrandService from "@/services/items/BrandService"
import { Brand } from "@/types/items/Brands"

export default defineComponent({
	name: 'BrandList',
	components: {
		DataTable,
		BrandModalCreate,
		BrandModalUpdate,
		DeleteModal
	},
	data() {
		return {
			items: [],
			next: '',
			prev: '',
			meta: {},
			data: [],
			url: '/brandList',
			maxItemsPerPage: '' || undefined as unknown as string,
			type: 'Users',
			isCreating: false,
			isEditing: false,
			isDeleting: false,
			selectedBrand: { created_at: '', id: 0, name: '', slug: '', updated_at: '' } as Brand,
			selectedBrandId: 0 as number,
			columns: [
				{
					attribute: 'name',
					name: 'name'
				},
				{
					attribute: 'slug',
					name: 'slug'
				},
				{
					attribute: 'item_count',
					name: 'number of products'
				}
			]
		}
	},
	methods: {
		async fetchBrands(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await BrandService.list(url, token)
				.then((response) => {
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
		showBrandCreateModal(): void {
			this.isCreating = true
		},
		showBrandEditModal(item: any): void {
			this.selectedBrand = item
			this.isEditing = true
		},
		viewBrand(): void {},
		async editBrand(brandName: string): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let data = { name: brandName }
			let brandId = this.selectedBrand.id
			await BrandService.edit(data, brandId, token)
				.then((response) => {
					this.$toast.open({
						message: `Brand ${brandName} has been successfully updated!`,
						type: "success"
					})
					this.isEditing = false
					this.fetchBrands()
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that category.`,
						type: "error"
					})
					console.log(e)
				});
		},
		showDeleteModal(item: any): void {
			this.selectedBrandId = item.id
			this.isDeleting = true
		},
		async deleteBrand(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let brandId = this.selectedBrandId
			await BrandService.delete(brandId, token)
				.then((response) => {
					this.$toast.open({
						message: `Brand has been successfully deleted.`,
						type: "success"
					})
					this.isDeleting = false
					this.fetchBrands()
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that brand.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async searchBrand(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = '/brandList'

			if (value.length > 2 || value.length == 0) {
				if (value.length > 2)
					url = `/brandList/?q=${value}`
				await BrandService.list(url, token)
					.then((response) => {
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
		},
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}`
			await this.fetchBrands()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			this.fetchBrands()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchBrands()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchBrands()
			}
		},
		async createBrand(name: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let data = { name: name }
			await BrandService.create(data, token)
				.then((response) => {
					this.isCreating = false
					this.fetchBrands()
					this.$toast.open({
						message: `Brand ${name} has been successfully created!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that brand.`,
						type: "error"
					})
					console.log(e)
				});
		}
	},
	async mounted(): Promise<void> {
		await this.fetchBrands()
	},
});
</script>