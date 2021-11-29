<template>
	<div>
		<div class="flex flex-nowrap justify-between pt-6">
			<p class="display-h1">Activity Log</p>
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
import { defineComponent } from 'vue'
import DataTable from '@/components/tables/DataTable.vue'
import ActivityService from "@/services/ActivityService"
import ResponseData from "@/types/ResponseData"

export default defineComponent({
	name: 'ActivityLogList',
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
			url: "/logList/",
			maxItemsPerPage: '5' || undefined as unknown as string,
			columns: [
				{
					attribute: 'subject',
					name: 'Activity'
				},
				{
					attribute: 'url',
					name: 'url'
				},
				{
					attribute: 'method',
					name: 'method'
				},
				{
					attribute: 'ip',
					name: 'ip address'
				},
				{
					attribute: 'user_id',
					name: 'user id'
				}
			]
		}
	},
	methods: {
		async fetchActivity(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			const url = this.url + `?limit=${this.maxItemsPerPage}`

			await ActivityService.list(url, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.data = res.data
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
				});
		},
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}&payment_method=${this.paymentMethod}&duration=${this.duration}`
			await this.fetchActivity()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `/report/?payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${limit}`
			await this.fetchActivity()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${limit}`
				await this.fetchActivity()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&payment_method=${this.paymentMethod}&duration=${this.duration}&limit=${limit}`
				await this.fetchActivity()
			}
		},
	},
	async mounted(): Promise<void> {
		await this.fetchActivity()
	},
});
</script>