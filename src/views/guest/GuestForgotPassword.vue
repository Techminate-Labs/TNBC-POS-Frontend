<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <h2 class="text-xl">Forgot your password ?</h2>
    <div class="my-4 text-gray-600">
      <p>No problem!</p>
      <p>Enter your email on this page and we'll send you a magic link!</p>
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="email">Email:</label>
      <input 
        class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
        type="text" 
        name="email"
        v-model="email" placeholder="mail@example.com">
    </div>
    <button class="base-btn" @click="sendRecoverLink">
      Submit
    </button>
    <div>
      <router-link to="/" class="hover:underline">Nevermind, I just remembered it!</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'GuestForgotPassword',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    sendRecoverLink(): void {
      console.log('sent revocer link!');
      let data = {
        email: this.email
      }
      DataService.forgotPassword(data)
        .then((response: ResponseData) => {
            console.log(response)
            this.$store.commit('setUserEmail', this.email)
            this.$router.push('/password-reset-sent')
          })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
});
</script>
