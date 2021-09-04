<template>
<div>
  <h1>Verify Email</h1>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'Error404',
  methods: {
    doCommand(e: any) {
		  let cmd = String.fromCharCode(e.keyCode).toLowerCase();
		  if (e.key === "Backspace"){
        this.$router.go(-1)
      }
	  },
    verifyUserEmailConfirmation(data: any):void {
      DataService.resetPassword(data)
        .then((res: ResponseData) => {
            console.log('password reset!')
            DataService.verifyEmail(data as any)
              .then((response: ResponseData) => {
                  console.log('logged in!')
                  this.$store.commit('setBearerToken', response.data.token)
                  this.$store.commit('setAuthentication', true)
                  this.$router.push('/dashboard')
              })
              .catch((e: Error) => {
                console.log(e);
              });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    if (this.$route.query.email_verify_url){
      console.log(this.$route.query)
      console.log(this.$route.path)
      let query = this.$route.query
      let data: any = {
        verify_url: query.email_verify_url,
        expires: query.expires,
        signature: query.signature
      }
      this.verifyUserEmailConfirmation(data as any)
    }
  }

});
</script>