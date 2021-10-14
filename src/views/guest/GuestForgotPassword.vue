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
            <label class="label" for="email">Email:</label>
            <input 
                class="text-input" 
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
import UserService from "@/services/UserService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: 'GuestForgotPassword',
    data() {
        return {
            email: ''
        }
    },
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
