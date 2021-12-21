<template>
	<li>
		<img :id="'barcode-' + $route.params.item_id" />
	</li>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Barcode',
	props: {
		itemId: {
			required: true,
			type: Number
		}
	}
})
</script>