<template>
  <div class="w-full h-full md:w-1/6 lg:w-2/12 xl:w-1/12 bg-white overflow-hidden z-20 relative shadow-lg">
    <nav class="block relative mx-auto justify-between text-gray-700 z-20" aria-label="Side Bar Navigation">
      <ul class="flex flex-wrap md:flex-col md:flex-nowrap justify-evenly lg:grid lg:grid-cols-1 md:divide-x-0 md:divide-y-2 divide-gray-200 text-center text-lg">
        <li v-for="(item, index) in menu" :key="index" class="py-8">
          <div v-if="item.submenus" @click="$emit('toogleAdditionalSidebar', item)">
            <router-link :to="item.url">
              <div class="flex flex-col" aria-label="home icon">
                <img class="dashboard-icon" :src="item.icon" />
                <h2>{{item.name}}</h2>
              </div>
            </router-link>
          </div>
          <div v-else>
            <router-link :to="item.url">
              <div class="flex flex-col" aria-label="home icon" >
                <img class="dashboard-icon" :src="item.icon" />
                <h2>{{item.name}}</h2>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
    <div class="hidden md:block md:fixed w-full h-full top-0 z-0 md:w-1/6 lg:w-2/12 xl:w-1/12 bg-white"></div>
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

<style scoped>
.dashboard-icon {
  @apply text-gray-400 self-center h-12 w-12;
}
.nuxt-link-exact-active, .nuxt-link-exact-active svg {
  @apply text-blue-600;
}
</style>