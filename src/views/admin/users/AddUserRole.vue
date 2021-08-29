<template>
  <div class="flex-grow mx-4 md:mx-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Role Permission</p>
    </div>
    <CheckboxTable :columns="columns" :items="items" />
    <button class="base-btn float-right">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxTable from '@/components/tables/CheckboxTable.vue'

export default defineComponent({
  name: 'AddUserRole',
  components: {
    CheckboxTable
  },
  data() {
    return {
      items: [
        { section: 'POS', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'Users', create: true, edit: true, delete: true, view: true, list: false},
        { section: 'Role', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'Customer', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'Category', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'Product', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'Report', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'TNBC_Transaction', create: false, edit: false, delete: false, view: false, list: false},
      ],
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