<template>
	<div class="card">
		<label class="pr-8">
			Select the payment method type		
			<select @change="changeSalesType" v-model="salesType">
				<option value="tnbc">TNBC</option>
				<option value="fiat">FIAT</option>
			</select>
		</label>
		<!-- <label class="pr-8">
			Select a period		
			<select @change="changeSalesPeriod">
				<option value='testData1'>Test Data 1</option>
				<option value='dateViewChart'>Date</option>
				<option value='dayViewChart'>by day</option>
				<option value='monthViewChart'>by month</option>
			</select>
		</label> -->
		{{ formatedData }}
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
	data(){
		return {
			salesType: 'fiat',
			unformatedData: [] as Array<any>,
			selected: 'date',
			selectedRoute: 'testData1'
		}
	},
	methods: {
		async fetchBy(_route: string | null): Promise<void> {
			const token = this.$store.state.session.bearerToken
			const route = _route ? _route : this.selectedRoute
			
			await DashboardService.salesBy(token, route, this.salesType)
				.then((res: any) => {
					let array: Array<any> = []
					for (let x = 0; x < res.data.label.length; x++){
						array.push([res.data.label[x], res.data.total[x]])
					}
					this.unformatedData = array
				})
				.catch(err => console.log(err))
		},
		changeSalesType(e: any): void {
			this.salesType = e.target.value
			this.fetchBy(null)
		},
		changeSalesPeriod(e: any): void {
			this.selectedRoute = e.target.value
			this.fetchBy(e.target.value)
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
					}
				},
				title: {
				  text: `${this.salesType.toUpperCase()} Sales`
				},
				xAxis: {
					type: 'datetime'
				},
				series: [{
				  	name: 'Sales',
				  	data: this.formatedData,
					dataGrouping: {
					  approximation: 'average',
					  enabled: true,
					  groupAll: true,
					  forced: true,
					  start: this.formatedData[0][0],
					  last: this.formatedData[this.formatedData.length - 1][0],
					  anchor: false,
					  units: [[
					    'day', // unit name
					    [1] // allowed multiples
					  ]]
					},
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
