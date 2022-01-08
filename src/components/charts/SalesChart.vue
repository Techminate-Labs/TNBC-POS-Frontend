<template>
	<div class="card">
		<select 
			v-model="salesType" 
			@change="salesTypeChange"
			class="px-4 py-2 bg-gray-100 text-sm font-bold">
			<option value="fiat">FIAT</option>
			<option value="tnbc">TNBC</option>
		</select>
		<highcharts 
			v-if="values.length"
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
		},
		route: {
			required: true,
			type: String
		}
	},
	data(){
		return {
			unformatedData: [] as Array<any>,
			dates: [] as Array<any>,
			values: [] as Array<any>,
			salesType: this.paymentMethod
		}
	},
	methods: {
		async fetchBy(_route: string | null): Promise<void> {
			console.log('fetched', _route)
			const token = this.$store.state.session.bearerToken
			
			await DashboardService.salesBy(token, this.route, this.salesType)
				.then((res: any) => {
					this.dates = []
					this.values = []
					
					for (let x = 0; x < res.data.label.length; x++){
						this.dates.push(res.data.label[x])
						this.values.push(res.data.total[x])
					}
				})
				.catch(err => console.log(err))
		},
		salesTypeChange(e: any): void {
			this.fetchBy(e.target.value)
		}
	},
	computed: {
		formatedData(): Array<any> {
			return this.unformatedData.map((item: any) => {
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
						borderColor: 'transparent'
					}
				},
				title: {
				  text: `${this.salesType.toUpperCase()} Sales`
				},
				xAxis: {
					categories: this.dates,
					crosshair: true
				},
				series: [{
				  	name: 'Sales',
				  	data: this.values,
				  	color: '#6fcd98'
				}]
			}
			return options
		}
	},
	created() {
		if (this.route){
			this.fetchBy(null)
		}
	}

})
</script>
