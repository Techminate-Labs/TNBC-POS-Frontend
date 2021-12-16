<template>
	<highcharts class="chart" :options="chartOptions"></highcharts>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TestChart',
	data(){
		return {
			chartOptions: {
				chart: {
				  type: 'spline'
				},
				title: {
				  text: 'Sin chart'
				},
				series: [{
				  data: [10, 0, 8, 2, 6, 4, 5, 5],
				  color: '#6fcd98'
				}]
			  }
		}
	}

})
</script>
