<template>
	<div>
		<highcharts 
			v-if="graphData.length"
			:options="chartOptions"
			></highcharts>
		<p v-else>No data</p>
	</div>
</template>
<script lang="ts">
import DashboardService from '@/services/DashboardService'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SalesChart',
	data(){
		return {
			salestype: 'fiat',
			graphData: [],
		}
	},
	methods: {
		async fetchByDate(): Promise<void> {
			const token = this.$store.state.session.bearerToken
			
			await DashboardService.salesByDate(token, this.salestype)
				.then(res => this.graphData = res.data.total)
				.catch(err => console.log(err))
			
		},
	},
	computed: {
		chartOptions(): Object {
			let options = {
				chart: {
				  type: 'spline'
				},
				title: {
				  text: 'Sin chart'
				},
				series: [{
				  data: this.graphData,
				  color: '#6fcd98'
				}]
			}
			return options
		}
	},
	created() {
		this.fetchByDate()
	}

})
</script>
