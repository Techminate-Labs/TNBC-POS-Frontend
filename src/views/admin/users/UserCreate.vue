<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Add User</p>
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
      <div class="flex flex-col py-2">
        <label class="mb-2">Role:</label>
        <select v-model="role" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
          <option :value="null">-- Please select an option --</option>
          <option v-for="(role, index) in roles" :key="index" :value="role.value">{{role.name}}</option>
        </select>
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="password">Password:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="password" 
          name="password" 
          v-model="password" 
          placeholder="*************"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="password-confirmation">Password Confirmation:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="password" 
          name="password-confirmation" 
          v-model="passwordConfirmation" 
          placeholder="**************"
        >
      </div>
    </div>
    <button
      class="base-btn float-right" 
      @click="addUser">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'UserCreate',
  data() {
    return {
      name: '',
      email: '',
      role: '',
      password: '',
      passwordConfirmation: '',
      roles: []
    }
  },
  methods: {
    addUser(): void {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        role_id: Number(this.role),
      }
      let token = this.$store.state.bearerToken
      DataService.addUser(data, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.name} successfully added to database!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error adding that user to the database.`,
            type: "error"
          })
          console.log(e)
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
          console.log(e)
        });
    }
  },
  async mounted() {
    this.fetchRoles()
  },
});
</script>