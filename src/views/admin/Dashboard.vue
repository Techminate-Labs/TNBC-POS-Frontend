<template>
	<div>
		<div class="flex flew-wrap mb-8">
			<ReportCard :title="'Number of sales TNBC'" :data="analytics.salesTnbc" />
			<ReportCard :title="'Number of sales FIAT'" :data="analytics.salesFiat" />
			<ReportCard :title="'Total of items'" :data="analytics.totalItems" />
			<ReportCard :title="'Total of categories'" :data="analytics.totalCategories" />
			<ReportCard :title="'Total of Users'" :data="analytics.totalUsers" />
			<ReportCard :title="'Total of Roles'" :data="analytics.totalRoles" />
		</div>
		<div class="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8 mt-4">
			<div>
				<h2 class="display-h2">Current Month's Sales</h2>
				<SalesChart 
					class="grid-span-1"
					:paymentMethod="'tnbc'"
					:route="'currentMonthSalesChart'" />
			</div>
			<div>
				<h2 class="display-h2">Current Week's Sales</h2>
					<SalesChart 
						class="grid-span-1"
						:paymentMethod="'tnbc'"
						:route="'currentWeekSalesChart'" />

			</div>
		</div>
		<h2 class="display-h2">Current Year's Sales</h2>
		<SalesChart 
			class="grid-span-1"
			:paymentMethod="'tnbc'"
			:route="'currentYearSalesChart'" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardService from '@/services/DashboardService'
import { Analytics } from '@/types/Dashboard'
import ReportCard from '@/components/cards/ReportCard.vue'
import SalesChart from '@/components/charts/SalesChart.vue'

export default defineComponent({
	name: 'Dashboard',
	components: { ReportCard, SalesChart },
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
					this.analytics = res.data
				})
				.catch(err => {
					console.log(err)
				})
		}
	},
	async created() {
	 	await this.fetchTotal()
	}
});
</script>