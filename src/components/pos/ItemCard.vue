<template>
    <div class="text-center bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg">
        <div class="h-24 overflow-hidden">
            <img class="rounded-md" :src="item.image" />
        </div>
        <div class="py-4 text-blue-900">
            <p class="mb-2 font-semibold">{{ item.name }}</p>
            <p>$USD {{ item.price }}</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ItemObject } from '@/types/Items'

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