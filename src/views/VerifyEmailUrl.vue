<template>
    <div>
        <h1>Verify Email</h1>
        <button @click="verifyUserEmailConfirmation" class="hover:underline">Please click on this button to verify your email.</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: 'Error404',
    methods: {
        verifyUserEmailConfirmation(data: any, url: any):void {
            if (this.$route.query.verify_url){
                let query = this.$route.query
                let url: any = query.verify_url + '' + query.expires + '' + query.signature
                DataService.verifyEmail(url)
                    .then((res: ResponseData) => {
                        this.$toast.open({
                            message: `Your email has been successfully verified!`,
                            type: "info"
                        })
                        this.$store.dispatch('setEmailVerification', true)
                        this.$router.push('/dashboard')
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
        }
    }

});
</script>