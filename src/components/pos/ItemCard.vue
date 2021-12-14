<template>
	<div
		class="text-center bg-white shadow-md rounded-2xl gap-8 cursor-pointer hover:shadow-lg">
		<img class="h-32 rounded-t-2xl object-cover w-80" :src="item.image" />
		<div class="py-4 text-blue-900">
			<p class="mb-2 font-semibold">{{ item.name }}</p>
			<p>
				<span>{{ $store.getters.currency }}</span>
				{{ item.price }}</p>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ItemObject } from '@/types/items/Items'

export default defineComponent({
	name: 'ProductCard',
	props: {
		item: {
			type: Object as PropType<ItemObject>,
			required: true
		}
	}
})
</script>