<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <h2 class="text-xl">Congratulations!</h2>
    <div class="my-4 text-gray-600">
      <p>Your password has been reset successfully.</p>
    </div>
    <router-link to="/" class="base-btn">
      Login
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GuestResetPasswordSuccess',
  methods: {
    sendRecoverLink(): void {
      console.log('sent revocer link!');
    }
  }
});
</script>
