<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="email">Email:</label>
      <input 
        class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
        type="text" 
        name="email" 
        v-model="email" 
        placeholder="mail@example.com"
      />
    </div>
    <div class="flex flex-col py-2">
      <label class="mb-2" for="password">Password:</label>
      <input 
        class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
        type="password" 
        name="password" 
        v-model="password" 
        placeholder="*******************"
      />
    </div>
    <button class="base-btn" @click="logInUser">
      Log In
    </button>
    <div>
      <router-link :to="{ name: 'GuestForgotPassword' }" class="hover:underline">Reset your password here</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'GuestLogin',
  data() {
    return {
      email: '',
      password: '',
      user: {} as any
    }
  },
  methods: {
    logInUser(): void {
      let data = {
        email: this.email,
        password: this.password,
      }
      DataService.loginUser(data)
        .then((response: ResponseData) => {
          console.log('response from login', response.data)
          this.user = response.data.user
          let permissions = this.user.role.permissions

          this.$store.commit('setPermissions', permissions)
          this.$store.commit('setBearerToken', response.data.token)
          this.$store.commit('setAuthentication', true)
          this.$store.commit('setUserEmail', this.email)

          this.checkIfUserhasVerifiedEmail()

          this.$router.push('/dashboard')
          this.$toast.open({
            message: `Hello! You've been successfully logged in!`,
            type: "info"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error logging you in.`,
            type: "error"
          })
          console.log(e)
        });
    },
    checkIfUserhasVerifiedEmail():void {
      console.log('Checking if email is verified')
      let user = this.user
      
      let isVerified = user.email_verified_at
      if (isVerified !== undefined){
        console.log('user email has been verified')
        this.$store.commit('setEmailVerification', true)
      } else {
        console.log('user email has not been verified')
      }

    }
  },

});
</script>
