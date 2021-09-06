<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="mb-4">
      <p class="text-2xl">Role Permission</p>
      <p>Creating <span class="capitalize font-bold">{{ roleName }}</span></p> 
    </div>
    <div>
      <input
        type="text"
        v-model="roleName" />
    </div>
    <RoleUpdateTable :columns="columns" :items="items" :name="roleName" />
    <button class="base-btn float-right" @click="createRole">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RoleUpdateTable from '@/components/tables/RoleUpdateTable.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'RoleCreate',
  components: {
    RoleUpdateTable
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
            const filteredRoles = response.data.roles[0]
            let permissions = filteredRoles.permissions
            let _items: any = []
            permissions.map((permission: any) => {
              let name = Object.getOwnPropertyNames(permission)[0]
              _items.push({
                name: name,
                permissions: {
                  create: false,
                  delete: false,
                  edit: false,
                  view: false,
                  list: false
                }
              })
            })
            this.items = _items
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    createRole(): void {
      let params = this.$route.params
      let _permissions: any = []
      this.items.map((item: any) => {
        let name = item.name

        _permissions.push({
          [item.name]: item.permissions
        })
      })
      let data = {
        name: this.roleName,
        permissions: _permissions
      }
      DataService.addRole(data)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.roleName} has been successfully created!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that role.`,
            type: "error"
          })
          console.log(e)
        });
    },
  },
  async mounted() {
    this.fetchRoles()
  },
});
</script>