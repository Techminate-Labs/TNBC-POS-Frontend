<template>
    <div id="pos-sidebar" class="bg-white z-20 relative shadow-lg">
        <nav class="block pt-10 mt-10 relative mx-auto justify-between text-gray-700 z-20" aria-label="Side Bar Navigation">
            <ul class="flex flex-wrap pt-10 md:flex-col md:flex-nowrap justify-evenly lg:grid lg:grid-cols-1 md:divide-x-0 md:divide-y-4 divide-gray-200 text-center text-lg">
                <li 
                    v-for="(item, index) in menuPOS" 
                    :key="index"
                    class="cursor-pointer bg-blue-900 text-white">
                    <div 
                        :class="selectedMenu === item ? 'selected-posmenu-item' : ''"
                        @click="handleSubmenuSidebar(item)">
                        <router-link :to="item.url">
                            <div class="px-1 py-6 md:px-2 flex flex-col flex-nowrap" aria-label="home icon">
                                <h2 class="text-sm">{{item.name}}</h2>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
            <div class="h-1 bg-gray-200" ></div>
            <ul class="flex flex-wrap md:flex-col md:flex-nowrap justify-evenly lg:grid lg:grid-cols-1 md:divide-x-0 md:divide-y-4 divide-gray-200 text-center text-lg">
                <li 
                    v-for="(item, index) in menuActions" 
                    :key="index"
                    class="cursor-pointer bg-blue-900 text-white">
                    <div 
                        :class="selectedMenu === item ? 'selected-posmenu-item' : ''"
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
            this.selectedMenu = item
        },
        handleSidebar(item: MenuItem): void {
            this.selectedMenu = item
        }
    }
});
</script>