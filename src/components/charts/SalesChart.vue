<template>
	<div class="card">
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

export default defineComponent({
	name: 'SalesChart',
	props: {
		paymentMethod: {
			required: true,
			type: String
		}
	},
	data(){
		return {
			unformatedData: [] as Array<any>
		}
	},
	methods: {
		async fetchBy(_route: string | null): Promise<void> {
			const token = this.$store.state.session.bearerToken
			
			await DashboardService.salesBy(token, 'dateViewChart', this.paymentMethod)
				.then((res: any) => {
					let array: Array<any> = []
					for (let x = 0; x < res.data.label.length; x++){
						array.push([res.data.label[x], res.data.total[x]])
					}
					this.unformatedData = array
				})
				.catch(err => console.log(err))
		}
	},
	computed: {
		formatedData(): Array<any> {
			return this.unformatedData.map((item: any) => {
				// return [ moment(item[0]).valueOf(), item[1] ]
				return [ item[0], item[1] ]
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
					},
					series: {
						pointStart: 2021
					}
				},
				title: {
				  text: `${this.paymentMethod.toUpperCase()} Sales`
				},
				xAxis: {
					// type: 'datetime'
				},
				series: [{
				  	name: 'Sales',
				  	data: this.formatedData,
					// dataGrouping: {
					//   approximation: 'average',
					//   enabled: true,
					//   groupAll: true,
					//   forced: true,
					//   start: this.formatedData[0][0],
					//   last: this.formatedData[this.formatedData.length - 1][0],
					//   anchor: false,
					//   units: [[
					//     'day', // unit name
					//     [1] // allowed multiples
					//   ]]
					// },
				  	color: '#6fcd98'
				}]
			}
			return options
		}
	},
	created() {
		this.fetchBy(null)
	}

})
</script>
