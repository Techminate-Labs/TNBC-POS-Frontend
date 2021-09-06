<template>
  <div class="relative">
    <router-link to="/" @click="logOutUser">Log out</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'NavigationLinks',
  methods: {
    logOutUser(): void {
      let token = this.$store.state.bearerToken
      DataService.logoutUser(token)
        .then((response: ResponseData) => {
          localStorage.setItem('bearerToken', '')
          this.$store.commit('setBearerToken', '')
          this.$store.commit('setAuthentication', false)
          this.$store.commit('setPermissions', [])
          this.$router.push('/')
          this.$toast.open({
            message: `You've been successfully logged out. Bye!`,
            type: "info"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error logging you out.`,
            type: "error"
          })
          console.log(e)
        });
    }
  }
});
</script>