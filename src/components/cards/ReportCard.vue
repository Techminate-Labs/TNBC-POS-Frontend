<template>
	<div class="card mr-2">
		<h2 class="font-semibold uppercase text-sm">{{ title }}</h2>
		<p class="font-bold text-xl mt-2 text-blue-900">{{ data }}</p>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportCard',
	props: {
		title: {
			type: String,
			required: true
		},
		data: {
			required: true
		}
	}
})
</script>