<template>
    <div class="relative flex flex-row">
        <div class="relative inline-block w-10 mr-5 align-middle select-none transition duration-200 ease-in self-center">
            <input type="checkbox" name="dark-mode-toggle" id="toggle" class="toggle-checkbox base-toggle-input"/>
            <label for="dark-mode-toggle" class="toggle-label base-toggle-label"></label>
        </div>
        <NotificationIcon class="w-7 h-7 text-gray-500 mr-5 self-center" />
        <UserIcon @click="handleUserSettings" class="w-7 h-7 text-gray-500 mr-5 self-center cursor-pointer" />
        <LogoutIcon @click="logOutUser" class="w-7 h-7 text-gray-500 mr-5 self-center cursor-pointer" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserIcon from "@/components/icons/UserIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import UserService from "@/services/UserService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: 'NavigationLinks',
    components: { UserIcon, NotificationIcon, LogoutIcon },
    methods: {
        async logOutUser(): Promise<void> {
            let token = this.$store.state.session.bearerToken
            await UserService.logout(token)
                .then((response: ResponseData) => {
                    this.$store.commit('setPermissions', [])
                    this.$store.commit('setBearerToken', '')
                    this.$store.commit('setAuthentication', false)
                    this.$store.commit('setUserEmail', null)
                    this.$store.commit('setUserId', null)
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
        },
        handleUserSettings(): void {
            let user_id = this.$store.state.user.userId
            this.$router.push({name: 'ProfileSettings', params: {user_id: user_id}})
        }
    }
});
</script>