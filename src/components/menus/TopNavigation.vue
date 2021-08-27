<template>
  <nav class="h-16 flex px-8 shadow-md relative z-30 bg-white">
    <div v-if="links" class="self-center">
      <!-- Menu Icon -->
      <div @click="$emit('toogleActivate')" class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/components/menus/SideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'

export default defineComponent({
  name: 'AdminLayout',
  props: {
    links: false
  }
});
</script>