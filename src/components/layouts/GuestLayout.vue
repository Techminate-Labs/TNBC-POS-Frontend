<template>
  <div id="guest" class="flex flex-col flex-nowrap h-screen">
    <TopNavigation :links="false" />
    <div class="flex flex-col md:flex-row flex-nowrap w-full flex-grow">
      <div class="md:w-1/3 lg:w-1/5">
        <GuestSideBar />
      </div>
      <div class="relative flex md:mx-auto md:w-2/3">
        <div class="my-16 self-center w-5/6 mx-auto md:w-4/6 lg:w-3/6">
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