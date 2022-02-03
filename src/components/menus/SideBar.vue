<template>
    <div class="bg-white z-20 relative shadow-md">
        <nav class="block relative mx-auto justify-between text-gray-700 z-20" aria-label="Side Bar Navigation">
            <ul class="flex flex-row flex-wrap space-x-3 lg:flex-col lg:flex-nowrap lg:space-x-0 justify-evenly lg:grid lg:grid-cols-1 lg:divide-x-0 lg:divide-y-2 divide-gray-200 text-center text-lg">
                <li 
                    v-for="(item, index) in menu" 
                    :key="index"
                    class="cursor-pointer hover:bg-gray-100">
                    <div 
                        v-if="item.submenus"
                        :class="selectedMenu === item ? 'selected-menu-item' : ''"
                        @click="handleSubmenuSidebar(item)">
                        <div class="px-6 py-6 lg:px-2 flex flex-col flex-nowrap" aria-label="home icon">
                            <img class="dashboard-icon" :src="item.icon" />
                            <h2 class="text-sm">{{item.name}}</h2>
                        </div>
                    </div>
                    <div v-else
                        :class="selectedMenu === item ? 'selected-menu-item' : ''"
                        @click="closeSidebar(item)">
                        <router-link :to="item.url">
                            <div class="px-6 py-6 lg:px-2 flex flex-col flex-nowrap" aria-label="home icon" >
                                <img class="dashboard-icon" :src="item.icon" />
                                <h2 class="text-sm">{{item.name}}</h2>
                            </div>
                        </router-link>
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
    name: 'SideBar',
    data(){
        return {
            selectedMenu: {} as MenuItem
        }
    },
    props: {
        menu: {
            type: Array as PropType<Array<MenuItem>>,
            required: true
        },
    },
    methods:{
        handleSubmenuSidebar(item: MenuItem): void {
            this.$emit('handleAdditionalSidebar', item)
            this.selectedMenu = item
        },
        closeSidebar(item: MenuItem): void {
            this.$emit('closeAdditionalSidebar', item)
            this.selectedMenu = item
        }
    }
});
</script>