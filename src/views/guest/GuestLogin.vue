<template>
    <div class="home">
        <div class="flex flex-row flew-nowrap my-4">
            <img class="pr-4" src="@/assets/TNB_POS_LOGO.png" />
            <h1 class="self-center text-4xl">TNB POS</h1>
        </div>
        <div class="flex flex-col py-2">
            <label class="label" for="email">Email:</label>
            <input 
                class="text-input" 
                type="text" 
                name="email" 
                v-model="email" 
                placeholder="mail@example.com"
            />
        </div>
        <div class="flex flex-col py-2">
            <label class="label" for="password">Password:</label>
            <input 
                class="text-input" 
                type="password" 
                name="password" 
                v-model="password" 
                placeholder="*******************"
            />
        </div>
        <button class="base-btn" @click="logInUser">
            Log In
        </button>
        <div class="pt-4">
            <router-link :to="{ name: 'GuestForgotPassword' }" class="text-blue-500">Reset your password here .</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from "@/services/UserService";
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
        async logInUser(): Promise<void> {
            let data = {
                email: this.email,
                password: this.password,
            }
            await UserService.login(data)
                .then((response: ResponseData) => {
                    this.user = response.data.user
                    let permissions = this.user.role.permissions
                    this.$store.commit('setPermissions', permissions)
                    this.$store.commit('setBearerToken', response.data.token)
                    this.$store.commit('setAuthentication', true)
                    this.$store.commit('setUserEmail', this.email)
                    this.$store.commit('setUserId', response.data.user.id)

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
            let user = this.user
            
            let isVerified = user.email_verified_at
            if (isVerified !== undefined){
                this.$store.commit('setEmailVerification', true)
            }

        }
    },

});
</script>
