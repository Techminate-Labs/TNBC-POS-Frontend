<template>
    <div class="home">
        <div class="flex flex-row flew-nowrap my-4">
            <LogoIcon class="h-24" />
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
import { defineComponent } from 'vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'

export default defineComponent({
    name: 'GuestResetPasswordSuccess',
    components: { LogoIcon }
});
</script>
