<template>
  <div class="w-full h-full md:w-max bg-white z-20 relative shadow-lg">
    <nav class="block relative mx-auto justify-between text-gray-700 z-20" aria-label="Side Bar Navigation">
      <ul class="flex flex-wrap md:flex-col md:flex-nowrap justify-evenly lg:grid lg:grid-cols-1 md:divide-x-0 md:divide-y-2 divide-gray-200 text-center text-lg">
        <li v-for="(item, index) in menu" :key="index" class="px-2 py-4 md:px-4">
          <div v-if="item.submenus" @click="$emit('openAdditionalSidebar', item)">
            <router-link :to="item.url">
              <div class="flex flex-col" aria-label="home icon">
                <img class="dashboard-icon" :src="item.icon" />
                <h2 class="text-base">{{item.name}}</h2>
              </div>
            </router-link>
          </div>
          <div v-else>
            <router-link :to="item.url">
              <div class="flex flex-col" aria-label="home icon" >
                <img class="dashboard-icon" :src="item.icon" />
                <h2 class="text-base">{{item.name}}</h2>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
    <div class="hidden md:block md:absolute z-10 w-full h-full top-0 z-0 h-screen bg-white shadow-lg"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MenuItem } from '@/types/SideBar'

export default defineComponent({
  name: 'SideBar',
  props: {
    menu: {
      type: Array as PropType<Array<MenuItem>>,
      required: true
    },
  }
});
</script>