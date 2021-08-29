<template>
  <div class="w-full h-screen md:w-2/6 lg:w-1/5 bg-white overflow-hidden z-20 relative shadow-lg">
    <div class="m-8">
      <div class="text-2xl pb-6">{{ singleMenu.name }}</div>
      <div v-for="(item, index) in singleMenu.submenus" :key="index" class="pb-3">
        <router-link :to="singleMenu.url + item.url" class="cursor-pointer text-blue-800" @click="$emit('closeAdditionalSidebar')">
          <div class="flex flex-nowrap">
            <img :src="singleMenu.icon" class="dashboard-submenu-icon mr-4" />
            {{ item.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MenuItem } from '@/types/SideBar'

export default defineComponent({
  name: 'AdditionalSideBar',
  props: {
    singleMenu: {
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
.dashboard-submenu-icon {
  @apply text-gray-400 self-center h-6 w-6;
}
.nuxt-link-exact-active, .nuxt-link-exact-active svg {
  @apply text-blue-600;
}
</style>