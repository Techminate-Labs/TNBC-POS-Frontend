<template>
  <div class="flex-grow mx-4 md:mx-8 my-10">
    <h3>User Management</h3>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserManagement'
});
</script>