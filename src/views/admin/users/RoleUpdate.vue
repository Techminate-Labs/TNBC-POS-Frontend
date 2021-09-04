<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p class="mb-2">Breadcrumb</p>
    <div class="mb-4">
      <p class="text-2xl">Role Permission</p>
      <p>Updating <span class="capitalize font-bold">{{ roleName }}</span></p> 
    </div>
    <CheckboxTable :columns="columns" :items="items" :name="roleName" />
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
      roleName: '',
      columns: [
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
      let token = this.$store.state.bearerToken
      DataService.listRoles(token)
        .then((response: ResponseData) => {
          let role_id: number = parseInt(params.id as string)
          const filteredRoles = response.data.roles.filter((role: any) => role.id === role_id)
          this.roleName = filteredRoles[0].name
          let permissions = filteredRoles[0].permissions
          let _items: any = []
          permissions.map((permission: any) => {
            let name = Object.getOwnPropertyNames(permission)[0]
            _items.push({
              name: name,
              permissions: permission[name]
            })
          })
          this.items = _items
        })
        .catch((e: Error) => {
          console.log(e)
        });
    }
  },
  async mounted() {
    this.fetchRoles()
  },
});
</script>