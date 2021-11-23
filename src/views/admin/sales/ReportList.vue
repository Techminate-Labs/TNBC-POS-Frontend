<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-6">
			<p class="text-2xl mb-6">Reports for <span class="uppercase font-bold">{{paymentMethod}}</span> transactions</p>
		</div>
		<div class="flex flew-wrap mb-6">
			<div class="card mr-2">
				<h2 class="font-semibold uppercase text-sm">Number of sales</h2>
				<p class="font-bold text-xl mt-2 text-blue-900">{{ reports.numberOfSales }}</p>
			</div>
			<div class="card mr-2">
				<h2 class="font-semibold uppercase text-sm">Total of sales</h2>
				<p class="font-bold text-xl mt-2 text-blue-900">{{ reports.total }}</p>
			</div>
			<div class="card mr-2">
				<h2 class="font-semibold uppercase text-sm">Total of tax</h2>
				<p class="font-bold text-xl mt-2 text-blue-900">{{ reports.tax }}</p>
			</div>
		</div>
		<p class="text-2xl mb-2">Sales for this period</p>
		<DataTable
			:columns="columns"
			:next="next"
			:prev="prev"
			:meta="meta"
			:data="data"
			:type="type"
			@handleDelete="null"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange" 
			/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import SalesService from "@/services/sales/SalesService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'InvoiceList',
	components: {
		DataTable
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<any>,
			type: "Users",
			paymentMethod: "tnbc",
			duration: "year",
			reports: {},
			url: "?payment_method=tnbc&duration=year",
			maxItemsPerPage: '' || undefined as unknown as string,
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
		async fetchReports(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			const url = this.url

			await SalesService.listReports(url, token)
				.then((response: ResponseData) => {
					let res = response.data
					console.log(response.data)
					this.reports = {
						numberOfSales: res.sales.length,
						total: res.total,
						tax: res.tax,
						discount: res.discount,
					}
					this.data = res.sales
					this.meta = {}
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
			await this.fetchReports()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchReports()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchReports()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchReports()
			}
		},
	},
	async mounted(): Promise<void> {
		await this.fetchReports()
	},
});
</script>