<template>
  <div>
    <div class="flex flex-nowrap justify-between">
      <h1 class="display-h1">User Roles</h1>
      <router-link
        v-show="$store.getters.userCan('create', 'Roles')"
        :to="{ name: 'RoleCreate' }">
        <button class="base-btn">
          Create Role
        </button>
      </router-link>
    </div>
    <DataTable
      :columns="columns"
      :next="next"
      :prev="prev"
      :meta="meta"
      :data="data"
      :type="type"
      @handleSearch="searchRole"
      @handleView="viewRole"
      @handleEdit="editRole"
      @handleDelete="showDeleteModal"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" 
      @maxItemsPerPageChange="pageLimitChange" />
      <div class="hidden" :class="isDeleting ? 'active' : ''">
        <DeleteModal @handleConfirmDelete="deleteRole" @close-modal="isDeleting = false" />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue';
import RoleService from "@/services/users/RoleService";
import ResponseData from "@/types/ResponseData";
import DeleteModal from '@/components/modals/DeleteModal.vue'
import { RoleObject } from '@/types/users/Roles'

export default defineComponent({
	name: 'RoleList',
	components: {
		DataTable,
		DeleteModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [],
			type: "Roles",
			url: '/roleList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isDeleting: false,
			selectedRoleId: 0 as number,
			columns: [
				{
					name: 'name',
					attribute: 'name'
				},
				{
					name: 'Created At',
					attribute: 'created_at'
				},
				{
					name: 'Updated At',
					attribute: 'updated_at'
				}
			]
		}
	},
	methods: {
		async fetchRoles(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await RoleService.list(url, token)
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
			await this.fetchRoles()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchRoles()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchRoles()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchRoles()
			}
		},
		async searchRole(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = '/roleList'
	
			if (value.length > 2 || value.length == 0) {
				if (value.length > 2)
				url = `/roleList/?q=${value}`
				await RoleService.list(url, token)
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
		viewRole(item: any): void {
			console.log('waiting for roleView component')
		},
		editRole(item: any): void {
			this.$router.push({name: 'RoleUpdate', params: {id: item.id}})
		},
		showDeleteModal(role: any): void {
			this.selectedRoleId = role.id
			this.isDeleting = true
		},
		async deleteRole(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let id = this.selectedRoleId
			await RoleService.delete(id, token)
				.then((response: ResponseData) => {
					this.isDeleting = false
					this.fetchRoles()
					this.$toast.open({
						message: `This role has been successfully deleted.`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `Could not delete that role.`,
						type: "error"
					})
					console.log(e)
				});
		}
	},
	async mounted() {
		this.fetchRoles()
	},
});
</script>