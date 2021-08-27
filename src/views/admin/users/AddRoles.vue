<template>
  <div class="flex-grow mx-4 md:mx-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Role Permission</p>
      <button class="base-btn">Create Role</button>
    </div>
    <Table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/tables/Table.vue'

export default defineComponent({
  name: 'UserRoles',
  components: {
    Table
  },
  data() {
    return {
      columns: [
        {
          name: 'section',
          attribute: 'section'
        },
        {
          name: 'create',
          attribute: 'create'
        },
        {
          name: 'edit',
          attribute: 'edit'
        },
        {
          name: 'delete',
          attribute: 'delete'
        },
        {
          name: 'view',
          attribute: 'view'
        },
        {
          name: 'list',
          attribute: 'list'
        }
      ]
    }
  }
});
</script>