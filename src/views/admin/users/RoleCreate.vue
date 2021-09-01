<template>
  <div class="flex-grow px-4 md:px-8 my-10">
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
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'RoleCreate',
  components: {
    CheckboxTable
  },
  data() {
    return {
      items: [
        { section: 'role', create: false, edit: false, delete: false, view: false, list: false},
        { section: 'product', create: false, edit: false, delete: false, view: false, list: false}
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
  },
  methods: {
    addUserProfile(): void {
      console.log('add user profile!');
      // DataService.addUserProfile(data)
      //   .then((response: ResponseData) => {
           
      //     })
      //   .catch((e: Error) => {
      //     console.log(e);
      //   });
    }
  }
});
</script>