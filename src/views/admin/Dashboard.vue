<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <router-view></router-view>
    <p class="text-4xl">Hello, this is the dashboard</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard'
});
</script>