<template>
	<div>
		<div class="flex flew-wrap mb-6">
			<ReportCard :title="'Number of sales TNBC'" :data="analytics.salesTnbc" />
			<ReportCard :title="'Number of sales FIAT'" :data="analytics.salesFiat" />
			<ReportCard :title="'Total of items'" :data="analytics.totalItems" />
			<ReportCard :title="'Total of categories'" :data="analytics.totalCategories" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardService from '@/services/DashboardService'
import { Analytics } from '@/types/Dashboard'
import ReportCard from '@/components/cards/ReportCard.vue'

export default defineComponent({
	name: 'Dashboard',
	components: { ReportCard },
	data() {
		return {
			analytics: {} as Analytics
		}
	},
	methods: {
		async fetchTotal(): Promise<any> {
			const token = this.$store.state.session.bearerToken
			DashboardService.listTotal(token)
				.then((res) => {
					// console.log(res)
					this.analytics = res.data
				})
				.catch(err => {
					console.log(err)
				})
		}
	},
	async mounted() {
	 	await this.fetchTotal()
	}
});
</script>