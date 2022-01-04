<template>
  <div>
    <div class="flex flex-nowrap justify-between">
      <h1 class="display-h1">User List</h1>
      <router-link 
        v-show="canUserCreate"
        :to="{ name: 'UserCreate' }">
        <button 
			v-show="$store.getters.userCan('create', 'Users')"
			class="base-btn">
			Create User
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
      @handleAddProfile="addUserProfile"
      @handleSearch="searchUser"
      @handleView="viewUser"
      @handleEdit="editUser"
      @handleDelete="showDeleteModal"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" 
      @maxItemsPerPageChange="pageLimitChange" />
    <div class="hidden" :class="isDeleting ? 'active' : ''">
      <DeleteModal @handleConfirmDelete="deleteUser" @close-modal="isDeleting = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from "@/services/users/UserService";
import ResponseData from "@/types/ResponseData";
import DataTable from '@/components/tables/DataTable.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import { User } from '@/types/users/Users'

export default defineComponent({
	name: 'UserList',
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
			type: "Users",
			url: '/userList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isDeleting: false,
			selectedUserId: 0 as number,
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
					attribute: 'roleName',
					name: 'role'
				},
				{
					attribute: 'created_at',
					name: 'registered'
				},
				{
					attribute: 'updated_at',
					name: 'updated'
				},
				{
					attribute: 'email_verified_at',
					name: 'email verified'
				},
			]
		}
	},
	methods: {
		async fetchUsers(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await UserService.list(url, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.data = res.data.map((user: User) => ({
						...user, 
						roleName: user.role, 
						created_at: user.created_at,
						email_verified_at: user.email_verified_at,
						updated_at: user.updated_at
					}))
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
			await this.fetchUsers()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchUsers()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchUsers()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchUsers()
			}
		},
		async searchUser(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = '/userList'

			if (value.length > 2 || value.length == 0) {
				if (value.length > 2)
					url = `/userList/?q=${value}`
				await UserService.list(url, token)
					.then((response: ResponseData) => {
						let res = response.data
						this.data = res.data.map((user: User) => ({
							...user, 
							roleName: user.role, 
							created_at: user.created_at,
							email_verified_at: user.email_verified_at,
							updated_at: user.updated_at
						}))
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
		addUserProfile(item: any): void {
			this.$router.push({name:'ProfileCreate', params: {user_id: item.user_id}})
		},
		viewUser(item: any): void {
			this.$router.push({name:'ProfileDetails', params: {user_id: item.user_id}})
		},
		editUser(item: any): void {
			this.$router.push({name:'UserUpdate', params: {user_id: item.user_id}})
		},
		showDeleteModal(user: any): void {
			this.selectedUserId = user.user_id
			this.isDeleting = true
		},
		async deleteUser(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let id = this.selectedUserId
			await UserService.delete(id, token)
				.then((response: ResponseData) => {
					this.isDeleting = false
					this.fetchUsers()
					this.$toast.open({
						message: `User successfully deleted.`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `Could not delete that user.`,
						type: "error"
					})
					console.log(e)
				});
		}
	},
	computed: {
		canUserCreate():boolean {
			return this.$store.state.user.permissions.Users.create
		}
	},
	async mounted(): Promise<void> {
		await this.fetchUsers()
	},
});
</script>