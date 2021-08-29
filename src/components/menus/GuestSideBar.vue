<template>
  <div class="relative">
    <img 
      class="absolute object-cover h-32 md:h-screen w-full"
      src="@/assets/guest_sidebar_bg.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GuestSideBar'
});
</script>