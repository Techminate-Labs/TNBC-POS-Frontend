<template>
    <div class="home">
        <div class="flex flex-row flew-nowrap my-4">
            <LogoIcon class="h-24" />
        </div>
        <p class="text-xl font-semibold">Please enter your new password.</p>
        <div class="flex flex-col py-2">
            <label class="label" for="new-email">Your new password:</label>
            <input 
                class="text-input" 
                type="password" 
                id="new-email" 
                v-model="password" 
                placeholder="*******************">
        </div>
        <div class="flex flex-col py-2">
            <label class="label" for="new-password">Repeat the password:</label>
            <input 
                class="text-input" 
                type="password" 
                id="new-password" 
                v-model="repeatPassword" 
                placeholder="*******************">
        </div>
        <button class="base-btn" @click="confirmResetPassword">
            Reset your password
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
    name: 'GuestResetPassword',
    components: { LogoIcon },
    data() {
        return {
            email: '',
            password: '',
            repeatPassword: '',
            token: ''
        }
    },
    methods: {
        async confirmResetPassword(): Promise<void> {
            if (this.$route.query.token){
                let _token: string = this.$route.query.token.toString()
                this.token = _token
                let data = {
                    token: this.token,
                    email: this.$store.state.user.userEmail,
                    password: this.password,
                    password_confirmation: this.repeatPassword,
                }
                await UserService.resetPassword(data)
                    .then((res: ResponseData) => {
                        this.$toast.open({
                            message: `Your password has been changed.`,
                            type: "success"
                        })
                        UserService.login(data)
                            .then((response: ResponseData) => {
                                const res = response.data
                                this.$store.dispatch('setBearerToken', res.token)
                                this.$store.dispatch('setAuthentication', true)
                                this.$router.push('/dashboard')
                                this.$toast.open({
                                    message: `You are now successfully connected.`,
                                    type: "info"
                                })
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
