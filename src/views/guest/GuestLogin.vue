<template>
    <div class="home">
        <div class="flex flex-row flew-nowrap my-4">
            <LogoIcon class="h-24" />
        </div>
        <form class="flex flex-col py-2" @submit.prevent="logInUser">
            <label class="label" for="email">
                <span>Email:</span>
            </label>
            <input 
                class="text-input" 
                type="text" 
                id="email" 
                v-model="email" 
                placeholder="mail@example.com"
                required
                />
            <label class="label" for="password">Password:</label>
            <input 
                class="text-input" 
                type="password" 
                id="password" 
                v-model="password" 
                placeholder="*******************"
                required
                />
            <button class="base-btn max-w-max">Log In</button>
        </form>
        <div class="pt-4">
            <router-link :to="{ name: 'GuestForgotPassword' }" class="text-blue-500">Reset your password</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserService from "@/services/users/UserService"
import RoleService from "@/services/users/RoleService"
import ConfigurationService from "@/services/ConfigurationService"
import ResponseData from "@/types/ResponseData"
import LogoIcon from '@/components/icons/LogoIcon.vue'

export default defineComponent({
    name: 'GuestLogin',
    components: { LogoIcon },
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
                    const res = response.data

                    this.$store.dispatch('setBearerToken', res.token)
                    this.$store.dispatch('setAuthentication', true)
                    this.$store.dispatch('setUserEmail', this.email)
                    this.$store.dispatch('setUserId', res.user.id)

                    this.checkPermissions(res.token, res.user.role_id)
                    this.getConfiguration(res.token)
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
        async checkPermissions(token: string, userId: number): Promise<void> {
            RoleService.getById(userId, token)
                .then(response => {
                    const res = response.data
                    this.$store.dispatch('setRoleId', res.id)
                    this.$store.dispatch('setPermissions', res.permissions)
                })
        },
        async getConfiguration(token: string): Promise<void> {
            ConfigurationService.list(token)
                .then(response => {
                    const res = response.data
                    this.$store.dispatch(
                        'setCurrency', 
                        {
                            currency: res.currency,
                            currencySign: res.currency_symble
                        }
                    )
                })
        },
        checkIfUserhasVerifiedEmail(): void {
            let user = this.user
            
            let isVerified = user.email_verified_at
            if (isVerified !== undefined){
                this.$store.dispatch('setEmailVerification', true)
            }

        }
    },

});
</script>
