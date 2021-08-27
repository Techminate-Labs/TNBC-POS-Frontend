<template>
  <div id="admin" class="bg-gray-100">
    <TopNavigation :links="true" @toogle-activate="active = !active" />
    <div class="flex flex-col md:flex-row flex-nowrap">
      <SideBar class="hidden" :class="active ? 'active' : ''" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/components/menus/SideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    SideBar,
    TopNavigation
  },
  data() {
    return {
      active: true as boolean
    }
  }
});
</script>