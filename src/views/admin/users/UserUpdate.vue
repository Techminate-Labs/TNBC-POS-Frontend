<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Edit User</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex flex-col py-2">
        <label class="mb-2" for="name">Name:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="text" 
          name="name" 
          v-model="name" 
          placeholder="John Doe"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="email">Email:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="email" 
          name="email" 
          v-model="email" 
          placeholder="mail@example.com"
        >
      </div>
      {{ role }}
      <div class="flex flex-col py-2">
        <label class="mb-2">Role:</label>
        <select v-model="role" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
          <option :value="null">-- Please select an option --</option>
          <option v-for="(role, index) in roles" :key="index" :value="role.value">{{role.name}}</option>
        </select>
      </div>
    </div>
    <button class="base-btn float-right" @click="updateUser">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'UserUpdate',
  data() {
    return {
      name: '',
      email: '',
      role: '',
      id: '',
      roles: []
    }
  },
  methods: {
    fetchUser(): void {
      let token = this.$store.state.bearerToken
      let params = this.$route.params
      DataService.listUsers(token)
        .then((response: ResponseData) => {
            let user_id: number = parseInt(params.id as string)
            const filteredUsers = response.data.users.filter((user: any) => user.id === user_id)
            this.name  = filteredUsers[0].name
            this.email = filteredUsers[0].email
            this.role  = filteredUsers[0].role_id
            this.id    = filteredUsers[0].id
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    fetchRoles(): void {
      let params = this.$route.params
      let token = this.$store.state.bearerToken
      DataService.listRoles(token)
        .then((response: ResponseData) => {
            let role_id: number = parseInt(params.id as string)
            let _data: any = []
            response.data.roles.map((role: any) => {
              _data.push({
                value: role.id,
                name: role.name
              })
            })
            this.roles = _data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    updateUser(): void {
      let data = {
        name: this.name,
        email: this.email,
        role_id: this.role,
      }
      let id = parseInt(this.id)
      DataService.updateUser(data, id)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.name} successfully updated!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error updating that user.`,
            type: "error"
          })
          console.log(e)
        });
    }
  },
  async mounted () {
    this.fetchUser()
    this.fetchRoles()
  }
});
</script>