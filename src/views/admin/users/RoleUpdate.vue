<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumbb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Role Permission</p>
      <p>Update</p>
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
  name: 'RoleUpdate',
  components: {
    CheckboxTable
  },
  data() {
    return {
      items: [],
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
    fetchRoles(): void {
      let params = this.$route.params
      console.log('fetching roles!')
      DataService.listRoles()
        .then((response: ResponseData) => {
            let role_id: number = parseInt(params.id as string)
            const filteredRoles = response.data.roles.filter((role: any) => role.id === role_id)
            let permissions = filteredRoles[0].permissions
            let _items: any = []
            permissions.map((permission: any) => {
              let name = Object.getOwnPropertyNames(permission)[0]
              // console.log('name', name)
              // console.log('permission', permission[name])
              _items.push({
                name: name,
                permissions: permission[name]
              })
            })
            console.log(_items)
            // console.log(permissions[0].Users)
            this.items = _items
          })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  async created () {
    this.fetchRoles()
  },
});
</script>