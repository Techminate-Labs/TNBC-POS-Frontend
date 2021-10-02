<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-2">
      <p class="text-2xl">Role Permission</p>
      <div class="text-right">
        <button
          class="base-btn-outline" 
          @click="$router.go(-1)">
          Back
        </button>
      </div>
    </div>
    <CheckboxTable 
      @handleNameChange="changeName"
      @handleSave="createRole"
      @handleSaveAndRedirect="createRoleAndRedirect"
      :columns="columns"
      :items="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxTable from '@/components/tables/CheckboxTable.vue'
import RoleService from "@/services/RoleService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'RoleCreate',
  components: {
    CheckboxTable
  },
  data() {
    return {
      items: [],
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
            const filteredRoles = response.data.data
            let permissions = filteredRoles[0].permissions
            this.items = permissions
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    createRole(items: any): void {
      let token = this.$store.state.bearerToken
      let data = {
        name: this.roleName,
        permissions: items
      }
      RoleService.create(data, token)
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
    createRoleAndRedirect(items: any): void {
      let token = this.$store.state.bearerToken
      let data = {
        name: this.roleName,
        permissions: items
      }
      RoleService.create(data, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.roleName} has been successfully created!`,
            type: "success"
          })
          this.$router.push({name: 'RoleList'})
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that role.`,
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