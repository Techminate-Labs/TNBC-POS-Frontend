<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-4">
			<h1 class="display-h1">Category List</h1>
			<button
				@click="showCategoryCreateModal"
				class="base-btn mb-2">
				Create Category
			</button>
		</div>
		<DataTable 
			:columns="columns"
			:data="data"
			:meta="meta"
			:next="next"
			:prev="prev"
			:type="type"
			@handleSearch="searchCategory"
			@handleView="viewCategory"
			@handleEdit="showCategoryEditModal"
			@handleDelete="showDeleteModal"
			@pageChange="pageChange"
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange" 
			/>
		<div class="hidden" :class="isCreating ? 'active' : ''">
			<CategoryModalCreate @handleSave="createCategory" @close-modal="isCreating = false" />
		</div>
		<div class="hidden" :class="isEditing ? 'active' : ''">
			<CategoryModalUpdate :id="selectedCategory.name" @handleSave="editCategory" @close-modal="isEditing = false" />
		</div>
		<div class="hidden" :class="isDeleting ? 'active' : ''">
			<DeleteModal @handleConfirmDelete="deleteCategory" @close-modal="isDeleting = false" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryService from "@/services/items/CategoryService";
import DataTable from '@/components/tables/DataTable.vue';
import CategoryModalCreate from '@/components/modals/CategoryModalCreate.vue';
import CategoryModalUpdate from '@/components/modals/CategoryModalUpdate.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import ResponseData from "@/types/ResponseData";
import { Category } from "@/types/items/Categories";

export default defineComponent({
	name: 'CategoryList',
	components: {
		DataTable,
		CategoryModalCreate,
		CategoryModalUpdate,
		DeleteModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [],
			url: '/categoryList',
			maxItemsPerPage: '' || undefined as unknown as string,
			type: 'Users',
			isCreating: false,
			isEditing: false,
			isDeleting: false,
			selectedCategory: { created_at: '', id: 0, name: '', slug: '', updated_at: '' } as Category,
			selectedCategoryId: 0 as number,
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
		async fetchCategories(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await CategoryService.list(url, token)
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
		showCategoryCreateModal(): void {
			this.isCreating = true
		},
		showCategoryEditModal(item: any): void {
			this.selectedCategory = item
			this.isEditing = true
		},
		viewCategory(): void {},
		async editCategory(categoryName: string): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let data = { name: categoryName }
			let categoryId = this.selectedCategory.id
			await CategoryService.edit(data, categoryId, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `Category ${categoryName} has been successfully updated!`,
						type: "success"
					})
					this.isEditing = false
					this.fetchCategories()
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
			this.isDeleting = true
			this.selectedCategoryId = item.id
		},
		async deleteCategory(item: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let categoryId = this.selectedCategoryId
			await CategoryService.delete(categoryId, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `Category has been successfully deleted.`,
						type: "success"
					})
					this.isDeleting = false
					this.fetchCategories()
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that category.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async searchCategory(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = '/categoryList'

			if (value.length > 2 || value.length == 0) {
				if (value.length > 2)
					url = `/categoryList/?q=${value}`
				await CategoryService.list(url, token)
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
		},
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}`
			await this.fetchCategories()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchCategories()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchCategories()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchCategories()
			}
		},
		async createCategory(name: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let data = { name: name }
			await CategoryService.create(data, token)
				.then((response: ResponseData) => {
					this.isCreating = false
					this.fetchCategories()
					this.$toast.open({
						message: `Category ${name} has been successfully created!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that category.`,
						type: "error"
					})
					console.log(e)
				});
		}
	},
	async mounted() {
		this.fetchCategories()
	},
});
</script>