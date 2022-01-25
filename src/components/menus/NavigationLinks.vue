<template>
    <div class="relative flex flex-row">
        <Switch class="self-center"/>
        <NotificationIcon class="w-7 h-7 text-gray-500 mr-5 self-center" />
        <div class="self-center">
            <UserIcon @click="$emit('toggleUserMenu')" class="w-7 h-7 text-gray-500 mr-5 cursor-pointer" />
        </div>
        <LogoutIcon @click="logOutUser" class="w-7 h-7 text-gray-500 mr-5 self-center cursor-pointer" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import Switch from '@/components/fields/Switch.vue';
import UserIcon from "@/components/icons/UserIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";

// types & services
import UserService from "@/services/users/UserService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: 'NavigationLinks',
    components: { UserIcon, NotificationIcon, LogoutIcon, Switch },
    methods: {
        async logOutUser(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            await UserService.logout(token)
                .then((response: ResponseData) => {
                    this.$toast.open({
                        message: `You've been successfully logged out. Bye!`,
                        type: "info"
                    })
                    this.$router.push('/')
                    this.$store.dispatch('setAuthentication', false)
                })
                .catch((e: Error) => {
                    this.$toast.open({
                        message: `There was an error logging you out.`,
                        type: "error"
                    })
                    console.log(e)
                });
        },
    }
});
</script>