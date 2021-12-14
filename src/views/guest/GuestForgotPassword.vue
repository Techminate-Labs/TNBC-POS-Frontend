<template>
    <div class="home">
        <div class="flex flex-row flew-nowrap my-4">
            <LogoIcon class="h-24" />
        </div>
        <h2 class="text-xl font-bold">Forgot your password ?</h2>
        <div class="my-4 text-gray-700">
            <p>No problem! Enter your email on this page and we'll send you a magic link!</p>
        </div>
        <div class="flex flex-col py-2">
            <label class="label" for="email">Email:</label>
            <input 
                class="text-input" 
                type="text" 
                id="email"
                v-model="email" placeholder="mail@example.com">
        </div>
        <button class="base-btn" @click="sendRecoverLink">
            Submit
        </button>
        <div class="pt-4">
            <router-link to="/" class="text-blue-500">Nevermind, I just remembered it!</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserService from "@/services/users/UserService"
import ResponseData from "@/types/ResponseData"
import LogoIcon from '@/components/icons/LogoIcon.vue'

export default defineComponent({
    name: 'GuestForgotPassword',
    data() {
        return {
            email: ''
        }
    },
    components: { LogoIcon },
    methods: {
        async sendRecoverLink(): Promise<void> {
            this.$toast.open({
                message: `Please wait, we are processing that information.`,
                type: "info"
            })
            let data = {
                email: this.email
            }
            await UserService.forgotPassword(data)
                .then((response: ResponseData) => {
                    this.$toast.open({
                        message: `Great! The email has been sent to your mailbox. Go open it!`,
                        type: "success"
                    })
                    this.$store.dispatch('setUserEmail', this.email)
                    this.$router.push('/password-reset-sent')
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }
});
</script>
