<template>
	<div>
		<div class="flex flex-nowrap space-x-4 pt-6">
			<h1 class="display-h1">
				Reports for
				<select v-model="paymentMethod" @change="fetchReports">
					<option v-for="option in paymentsOptions" :key="option.key" :value="option.key">{{ option.value }}</option>
				</select>
				transactions
			</h1>
		</div>
		
		<div class="flex flew-wrap mb-6">
			<ReportCard :title="'Number of sales'" :data="reports.numberOfSales" />
			<ReportCard :title="'Total of sales'" :data="reports.total" />
			<ReportCard :title="'Total of tax'" :data="reports.tax" />
		</div>
		<div class="flex flex-nowrap space-x-4">
			<p class="text-2xl mb-2">Sales for
				<select v-model="duration" @change="fetchReports">
					<option v-for="option in durationOptions" :key="option.key" :value="option.key">{{ option.value }}</option>
				</select>
			</p>
		</div>
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
import ReportCard from '@/components/cards/ReportCard.vue'
import SalesService from "@/services/sales/SalesService"
import ResponseData from "@/types/ResponseData"

export default defineComponent({
	name: 'InvoiceList',
	components: {
		DataTable,
		ReportCard
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<any>,
			type: 'Users',
			paymentMethod: 'tnbc',
			duration: 'year',
			reports: {},
			url: '/report/',
			maxItemsPerPage: '5' || undefined as unknown as string,
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
			] as Array<Object>,
			durationOptions: [
				{ key: 'today', value: 'Today' }, 
				{ key: 'yesterday', value: 'Yesterday' },
				{ key: 'week', value: 'Week' },
				{ key: 'lastWeek', value: 'Last Week' },
				{ key: 'month', value: 'Month' }, 
				{ key: 'lastMonth', value: 'Last Month' }, 
				{ key: 'year', value: 'Year' },
				{ key: 'lastYear', value: 'Last Year'} 
			] as Array<Object>,
			paymentsOptions: [
				{ key: 'tnbc', value: 'TNBC' }, 
				{ key: 'fiat', value: 'FIAT' }
			] as Array<Object>,
		}
	},
	methods: {
		async fetchReports(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			const url = this.url + `?payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${this.maxItemsPerPage}`

			await SalesService.listReports(url, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.reports = {
						numberOfSales: res.sales.data.length,
						total: res.total,
						tax: res.tax,
						discount: res.discount,
					}
					this.data = res.sales.data
					this.meta = {
						current_page: res.sales.current_page,
						from: res.sales.from,
						last_page: res.sales.last_page,
						links: res.sales.links,
						path: res.sales.path,
						per_page: res.sales.per_page,
						to: res.sales.to,
						total: res.sales.total
					}
					this.prev = res.sales.prev_page_url
					this.next = res.sales.next_page_url
				})
				.catch((e: Error) => {
					console.log(e);
					this.$toast.open({
						message: `There was an error fetching the reports`,
						type: "error"
					})
				});
		},
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}&payment_method=${this.paymentMethod}&duration=${this.duration}`
			await this.fetchReports()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `/report/?payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${limit}`
			await this.fetchReports()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${limit}`
				await this.fetchReports()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${limit}`
				await this.fetchReports()
			}
		},
	},
	async mounted(): Promise<void> {
		await this.fetchReports()
	},
});
</script>