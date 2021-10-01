<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p class="mb-2">Breadcrumb</p>
    <div class="mb-4">
      <p class="text-2xl">Role Permission</p>
      <p>Updating <span class="capitalize font-bold">{{ roleName }}</span></p> 
    </div>
    <CheckboxTable
      @handleNameChange="changeName"
      @handleSave="updateRole"
      @handleSaveAndRedirect="updateRoleAndRedirect"
      :columns="columns" 
      :items="items" 
      :name="roleName" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxTable from '@/components/tables/CheckboxTable.vue'
import RoleService from "@/services/RoleService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'RoleUpdate',
  components: {
    CheckboxTable
  },
  data() {
    return {
      items: {},
      roleName: '',
      url: 'roleList',
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
    async fetchRoles(): Promise<void> {
      let params = this.$route.params
      let token = this.$store.state.bearerToken
      let url = this.url
      await RoleService.list(url, token)
        .then((response: ResponseData) => {
          let role_id: number = parseInt(params.id as string)
          const filteredRoles = response.data.data.filter((role: any) => role.id === role_id)
          this.roleName = filteredRoles[0].name
          let permissions = filteredRoles[0].permissions
          this.items = permissions
        })
        .catch((e: Error) => {
          console.log(e)
        });
    },
    async updateRole(items: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let _permissions: any = []
      items.map((item: any) => {
        let name = item.name
        _permissions.push({
          [item.name]: item.permissions
        })
      })
      let role_id: number = parseInt(this.$route.params.id as string)
      let data = {
        name: this.roleName,
        permissions: items
      }
      console.log('clicked on save')
      await RoleService.update(data as any, role_id as number, token as any)
        .then((response: ResponseData) => {
            this.$toast.open({
              message: `${this.roleName} has been successfully updated!`,
              type: "success"
            })
          })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error updating that role.`,
            type: "error"
          })
          console.log(e)
        });
    },
    async updateRoleAndRedirect(items: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let role_id: number = parseInt(this.$route.params.id as string)
      let data = {
        name: this.roleName,
        permissions: items
      }
      await RoleService.update(data as any, role_id as number, token as any)
        .then((response: ResponseData) => {
            this.$toast.open({
              message: `${this.roleName} has been successfully updated!`,
              type: "success"
            })
            this.$router.push({name:'RoleList'})
          })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error updating that role.`,
            type: "error"
          })
          console.log(e)
        });
    },
    changeName(event: any): void {
      let value = event.target.value
      this.roleName = value
    }
  },
  async mounted() {
    this.fetchRoles()
  },
});
</script>