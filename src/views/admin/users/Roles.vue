<template>
  <div class="flex-grow mx-4 md:mx-8 my-10">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/tables/Table.vue'

export default defineComponent({
  name: 'Role'
});
</script>