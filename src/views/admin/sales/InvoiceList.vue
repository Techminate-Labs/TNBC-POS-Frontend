<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-4">
			<h1 class="display-h1">Invoices List</h1>
		</div>
		<DataTable
			:columns="columns"
			:next="next"
			:prev="prev"
			:meta="meta"
			:data="data"
			:type="type"
			@handleView="viewItem"
			@handleDelete="null"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange" 
			/>
		<div class="hidden" :class="isViewing ? 'active' : ''">
			<InvoiceModal
				@close-modal="closeModal"
				:propInvoice="singleInvoice"
				 />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import InvoiceModal from '@/components/modals/InvoiceModal.vue'
import SalesService from "@/services/sales/SalesService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'InvoiceList',
	components: {
		DataTable,
		InvoiceModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<any>,
			type: "Users",
			url: '/invoiceList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isViewing: false,
			singleInvoice: {},
			columns: [
				{
					attribute: 'invoice_number',
					name: 'Invoice No.'
				},
				{
					attribute: 'date',
					name: 'date'
				},
				{
					attribute: 'user_id',
					name: 'sales by'
				},
				{
					attribute: 'customer_id',
					name: 'customer'
				},
				{
					attribute: 'total',
					name: 'amount'
				},
				{
					attribute: 'payment_method',
					name: 'payment type'
				}
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
		async viewItem(item: any): Promise<void> {
			this.isViewing = true
            const token = this.$store.state.session.bearerToken
            
            await SalesService.getById(item.id, token)
                .then(res => {
					this.singleInvoice = res.data
                })
                .catch(err => {
                    console.log(err)
                })
		},
		closeModal(): void {
			this.isViewing = false
		},
	},
	async mounted(): Promise<void> {
		await this.fetchItems()
	},
});
</script>