<template>
  <nav class="h-16 flex px-8 shadow-md relative z-30 bg-white">
    <div v-if="links" class="self-center flex flex-nowrap justify-between w-full">
      <!-- Menu Icon -->
      <div @click="$emit('toogleSidebar')" class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <NavigationLinks />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from '@/components/menus/SideBar.vue'
import NavigationLinks from '@/components/menus/NavigationLinks.vue'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    NavigationLinks
  },
  props: {
    links: {
      type: Boolean,
      required: false
    }
  }
});
</script>