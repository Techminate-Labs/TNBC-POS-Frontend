<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Edit User</p>
    </div>
    <div class="grid grid-cols-2 gap-8 bg-white p-4 rounded-lg shadow-md">
      <div>
        <h3 class="text-xl text-gray-600 font-light pb-2">User information</h3>
        <hr />
        <div class="flex flex-col py-2">
          <label class="mb-2" for="name">Name:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="name" 
            v-model="name" 
            placeholder="John Doe">
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="email">Email:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="email" 
            name="email" 
            v-model="email" 
            placeholder="mail@example.com">
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2">Role:</label>
          <select v-model="role" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
            <option :value="null">-- Please select an option --</option>
            <option v-for="(role, index) in roles" :key="index" :value="role.value">{{role.name}}</option>
          </select>
        </div>
        <button class="base-btn float-right" @click="updateUser">Save User</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from "@/services/UserService";
import RoleService from "@/services/RoleService";
import ProfileService from "@/services/ProfileService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'UserUpdate',
  data() {
    return {
      name: '',
      email: '',
      role: '',
      id: '',
      roles: [],
    }
  },
  methods: {
    async fetchUser(): Promise<void> {
      let token = this.$store.state.bearerToken
      let params = this.$route.params
      let url = '/userList'
      await UserService.list(url, token)
        .then((response: ResponseData) => {
            let user_id: number = parseInt(params.user_id as string)
            const filteredUser = response.data.data.filter((user: any) => user.user_id === user_id)
            this.name  = filteredUser[0].name
            this.email = filteredUser[0].email
            this.role  = filteredUser[0].role
            this.id    = filteredUser[0].id
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async fetchRoles(): Promise<void> {
      let token = this.$store.state.bearerToken
      RoleService.list(token)
        .then((response: ResponseData) => {
            let _data: any = []
            response.data.data.map((role: any) => {
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
    async updateUser(): Promise<void> {
      let params = this.$route.params
      let user_id: number = parseInt(params.user_id as string)
      let data = {
        name: this.name,
        email: this.email,
        role_id: this.role
      }
      console.log(data)
      let token = this.$store.state.bearerToken
      await UserService.update(data, user_id, token)
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