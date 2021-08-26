<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <p>Guest's email</p>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="new-email">New email:</label>
      <input class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" type="text" name="new-email" :value="newEmail" placeholder="mail@example.com">
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="new-password">New password:</label>
      <input class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" type="password" name="new-password" :value="newPassword" placeholder="*******************">
    </div>
    <button class="bg-blue-900 hover:bg-blue-800 shadow-md px-12 py-2 my-3 text-white rounded-md" @click="logInUser">
      Resert your password
    </button>
    <div>
      <router-link to="/" class="hover:underline">Nevermind, I just remembered it!</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GuestRecoverPassword',
  data() {
    return {
      newEmail: '',
      newPassword: ''
    }
  },
  methods: {
    logInUser(): void {
      console.log('password reset!');
    }
  }
});
</script>
