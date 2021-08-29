<template>
  <div class="flex-grow px-4 md:px-8">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserManagement'
});
</script>