<template>
	<div>
		<div class="flex flex-nowrap justify-between">
			<h1 class="display-h1">Customer List</h1>
			<router-link :to="{ name: 'CustomerCreate' }">
				<button 
					v-show="$store.getters.userCan('create', 'POS')"
					class="base-btn">
					Create Customer
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
			@handleSearch="searchCustomer"
			@handleAddProfile="addCustomerProfile"
			@handleView="viewCustomer"
			@handleEdit="editCustomer"
			@handleDelete="showDeleteModal"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange" 
			/>
		<div class="hidden" :class="isDeleting ? 'active' : ''">
			<DeleteModal @handleConfirmDelete="deleteCustomer" @close-modal="isDeleting = false" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import CustomerService from "@/services/pos/CustomerService";
import { CustomerItem } from '@/types/pos/Customers'


export default defineComponent({
	name: 'CustomerList',
	components: {
		DataTable,
		DeleteModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<CustomerItem>,
			type: "Users",
			url: '/customerList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isDeleting: false,
			selectedCustomerId: 0 as number,
			columns: [
				{
					attribute: 'name',
					name: 'name'
				},
				{
					attribute: 'phone',
					name: 'phone'
				},
				{
					attribute: 'email',
					name: 'email'
				},
				{
					attribute: 'address',
					name: 'address'
				},
				{
					attribute: 'point',
					name: 'point'
				}
			]
		}
	},
	methods: {
		async fetchCustomers(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await CustomerService.list(url, token)
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
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}`
			await this.fetchCustomers()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchCustomers()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchCustomers()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchCustomers()
			}
		},
		addCustomerProfile(item: any): void {
			this.$router.push({name:'ProfileCreate', params: {id: item.id}})
		},
		viewCustomer(item: any): void {
			this.$router.push({name:'ProfileDetails', params: {id: item.id}})
		},
		editCustomer(item: any): void {
			this.$router.push({name:'CustomerUpdate', params: {id: item.id}})
		},
		showDeleteModal(item: any): any {
			this.isDeleting = true
			this.selectedCustomerId = item.id
		},
		async deleteCustomer(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let id = this.selectedCustomerId
			await CustomerService.delete(id, token)
				.then((response) => {
					this.isDeleting = false
					this.fetchCustomers()
					this.$toast.open({
						message: `Customer successfully deleted.`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `Could not delete that customer.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async searchCustomer(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = `/customerList/?q=${value}`
			if (value.length > 2 || value.length === 0){
				await CustomerService.list(url, token)
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
		}
	},
	async mounted(): Promise<void> {
		await this.fetchCustomers()
	},
});
</script>