<template>
  <div class="home">
    <div class="flex flex-row flew-nowrap my-4">
      <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
      <h1 class="self-center text-4xl">TNB POS</h1>
    </div>
    <h2 class="text-xl">Recover your password</h2>
    <div class="my-4 text-gray-600">
      <p>A password recovery link has been sent to your email. Click on the link to change your password.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GuestForgotPasswordEmailSent'
});
</script>
