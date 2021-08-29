<template>
  <div class="flex-grow mx-4 md:mx-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Add User</p>
    </div>
    <div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="name">Name:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="text" 
          name="name" 
          :value="name" 
          placeholder="John Doe"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="email">Email:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="email" 
          name="email" 
          :value="email" 
          placeholder="mail@example.com"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2">Role:</label>
        <select class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
          <option :value="null">-- Please select an option --</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="password">Password:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="password" 
          name="password" 
          :value="paswword" 
          placeholder="*************"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="password-confirmation">Password Confirmation:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="password" 
          name="password-confirmation" 
          :value="passwordConfirmation" 
          placeholder="**************"
        >
      </div>
      <button class="base-btn float-right">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddUser',
  data() {
    return {
      name: null,
      email: null,
      role: null,
      password: null,
      passwordConfirmation: null,
    }
  }
});
</script>