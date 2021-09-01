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
        <select 
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          v-model="role">
          <option :value="null">-- Please select an option --</option>
          <option value="1">Admin</option>
          <option value="2">Editor</option>
          <option value="3">Customer</option>
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
    <button class="base-btn float-right" @click="addUser">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'AddUser',
  data() {
    return {
      name: '',
      email: '',
      role: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  methods: {
    addUser(): void {
      console.log('add user!');
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        role_id: Number(this.role),
      }
      DataService.addUser(data)
        .then((response: ResponseData) => {
            console.log(response)
            console.log('added user to db!')
          })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
});
</script>