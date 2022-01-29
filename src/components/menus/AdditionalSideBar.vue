<template>
    <div class="bg-white overflow-hidden z-10 relative shadow-lg hidden w-2/12">
        <nav class="m-4 relative z-10">
            <div class="text-lg text-gray-500 pb-6">{{ singleMenu.name }}</div>
            <div v-for="(item, index) in singleMenu.submenus" :key="index" class="pb-3">
                <router-link :to="singleMenu.url + item.url" class="cursor-pointer text-gray-600 font-light" @click="$emit('closeAdditionalSidebar')">
                    <div class="flex pt-2 flex-nowrap">
                        <img :src="singleMenu.icon" class="dashboard-submenu-icon mr-4" />
                        {{ item.name }}
                    </div>
                </router-link>
            </div>
        </nav>
        <div class="hidden md:block md:absolute w-full h-full top-0 z-0 bg-white shadow-lg"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MenuItem } from '@/types/SideBar'

export default defineComponent({
    name: 'AdditionalSideBar',
    props: {
        singleMenu: {
            type: Object as PropType<MenuItem>,
            required: true
        },
    }
});
</script>