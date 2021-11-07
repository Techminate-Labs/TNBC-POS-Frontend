<template>
    <div class="bg-white z-20 relative shadow-lg">
        <nav class="block relative mx-auto justify-between text-gray-700 z-20" aria-label="Side Bar Navigation">
            <ul class="flex flex-wrap md:flex-col md:flex-nowrap justify-evenly lg:grid lg:grid-cols-1 md:divide-x-0 md:divide-y-2 divide-gray-200 text-center text-lg">
                <li 
                    v-for="(item, index) in menuPOS" 
                    :key="index"
                    class="cursor-pointer hover:bg-gray-100">
                    <div 
                        :class="selectedMenu === item ? 'selected-menu-item' : ''"
                        @click="handleSubmenuSidebar(item)">
                        <router-link :to="item.url">
                            <div class="px-1 py-6 md:px-2 flex flex-col flex-nowrap" aria-label="home icon">
                                <h2 class="text-sm">{{item.name}}</h2>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
            <div class="h-2 bg-gray-200" ></div>
            <ul class="flex flex-wrap md:flex-col md:flex-nowrap justify-evenly lg:grid lg:grid-cols-1 md:divide-x-0 md:divide-y-2 divide-gray-200 text-center text-lg">
                <li 
                    v-for="(item, index) in menuActions" 
                    :key="index"
                    class="cursor-pointer hover:bg-gray-100">
                    <div 
                        :class="selectedMenu === item ? 'selected-menu-item' : ''"
                        @click="handleSubmenuSidebar(item)">
                        <div class="px-1 py-6 md:px-2 flex flex-col flex-nowrap" aria-label="home icon">
                            <h2 class="text-sm">{{item.name}}</h2>
                        </div>
                    </div>
                </li>
            </ul>
            
        </nav>
        <div class="hidden md:block md:absolute w-full h-full top-0 z-0 bg-white shadow-lg"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MenuItem } from '@/types/SideBar'

export default defineComponent({
    name: 'PosSideBar',
    data(){
        return {
            selectedMenu: {} as MenuItem
        }
    },
    props: {
        menuPOS: {
            type: Array as any,
            // type: Array as PropType<Array<MenuItem>>,
            required: true
        },
        menuActions: {
            type: Array as any,
            // type: Array as PropType<Array<MenuItem>>,
            required: true
        },
    },
    methods:{
        handleSubmenuSidebar(item: MenuItem): void {
            if (item.name === 'Generate QR Code') this.$router.push({name: 'GeneratedQrCode'})
            this.selectedMenu = item
        },
        handleSidebar(item: MenuItem): void {
            this.selectedMenu = item
        }
    }
});
</script>