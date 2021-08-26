<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="email">Email:</label>
      <input class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" type="text" name="email" :value="email" placeholder="mail@example.com">
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="password">Password:</label>
      <input class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" type="password" name="password" :value="password" placeholder="*******************">
    </div>
    <button class="bg-blue-900 hover:bg-blue-800 shadow-md px-12 py-2 my-3 text-white rounded-md" @click="logInUser">
      Log In
    </button>
    <div>
      <router-link to="/password-reset" class="hover:underline">Reset your password here</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GuestLogin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logInUser(): void {
      console.log('log in!');
    }
  }
});
</script>
