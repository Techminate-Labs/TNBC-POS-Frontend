<template>
  <div id="guest" class="h-screen overflow-hidden">
    <TopNavigation />
    <div class="flex flex-col md:flex-row flex-nowrap w-full">
      <div class="md:w-1/3 lg:w-1/5">
        <GuestSideBar />
      </div>
      <div class="relative flex md:mx-auto md:w-2/3 mt-20 md:mt-10">
        <div class="my-16 mx-auto self-center w-5/6 md:w-4/6 lg:w-3/6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GuestSideBar from '@/components/menus/GuestSideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'

export default defineComponent({
  name: 'GuestLayout',
  components: {
    GuestSideBar,
    TopNavigation
  }
});
</script>