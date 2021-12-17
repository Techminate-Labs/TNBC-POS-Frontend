<template>
	<div>
		<button 
			class="base-btn-outline"
			:class="selected == 'date' ? 'payment-selected' : ''"
			@click="fetchByDate()">
			Fetch By Date
		</button>
		<button 
			class="base-btn-outline"
			:class="selected == 'month' ? 'payment-selected' : ''"
			@click="fetchByMonth()">
			Fetch By Month
		</button>
		<highcharts 
			v-if="formatedData.length"
			:options="chartOptions"
			></highcharts>
		<p v-else>No data</p>
	</div>
</template>
<script lang="ts">
import DashboardService from '@/services/DashboardService'
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
	name: 'SalesChart',
	data(){
		return {
			salestype: 'fiat',
			unformatedData: [] as Array<any>,
			selected: 'date'
		}
	},
	methods: {
		async fetchByDate(): Promise<void> {
			const token = this.$store.state.session.bearerToken
			this.selected = 'date'
			
			await DashboardService.salesByDate(token, this.salestype)
				.then((res: any) => {
					let array: Array<any> = []
					for (let x = 0; x < res.data.label.length; x++){
						array.push([res.data.label[x], res.data.total[x]])
					}
					this.unformatedData = array
				})
				.catch(err => console.log(err))
		},
		async fetchByMonth(): Promise<void> {
			const token = this.$store.state.session.bearerToken
			this.selected = 'month'
			
			await DashboardService.salesByMonth(token, this.salestype)
				.then((res: any) => {
					let array: Array<any> = []
					for (let x = 0; x < res.data.label.length; x++){
						array.push([res.data.label[x], res.data.total[x]])
					}
					this.unformatedData = array
				})
				.catch(err => console.log(err))
		},
	},
	computed: {
		formatedData(): Array<any> {
			return this.unformatedData.map((item: any) => {
				console.log(moment(item[0]).valueOf())
				return [ moment(item[0]).valueOf(), item[1] ]
			})
		},
		chartOptions(): Object {
			let options = {
				chart: {
				  type: 'column'
				},
				plotOptions: {
					column: {
						pointWidth: 20,
						borderWidth: 5,
						borderColor: 'transparent'
					}
				},
				title: {
				  text: 'Sin chart'
				},
				xAxis: {
					type: 'datetime'
				},
				series: [{
				  	name: 'Sales',
				  	data: this.formatedData,
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
