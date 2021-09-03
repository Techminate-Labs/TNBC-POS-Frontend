<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <p>Guest's email</p>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="new-email">Your new password:</label>
      <input 
        class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
        type="password" 
        name="new-email" 
        v-model="password" 
        placeholder="*******************">
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="new-password">Repeat the password:</label>
      <input 
        class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
        type="password" 
        name="new-password" 
        v-model="repeatPassword" 
        placeholder="*******************">
    </div>
    <button class="base-btn" @click="confirmResetPassword">
      Reset your password
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
  name: 'GuestResetPassword',
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      token: ''
    }
  },
  methods: {
    confirmResetPassword(): void {
      if (this.$route.query.token){
        let _token: string = this.$route.query.token.toString()
        this.token = _token
        let data = {
          token: this.token,
          email: this.$store.state.userEmail,
          password: this.password,
          password_confirmation: this.repeatPassword,
        }
        DataService.resetPassword(data)
          .then((res: ResponseData) => {
              console.log('password reset!')
              DataService.loginUser(data)
                .then((response: ResponseData) => {
                    console.log('logged in!')
                    this.$store.commit('setBearerToken', response.data.token)
                    this.$store.commit('setAuthentication', true)
                    this.$router.push('/dashboard')
                })
                .catch((e: Error) => {
                  console.log(e);
                });
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    }
  }
});
</script>
