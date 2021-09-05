<template>
<div>
  <h1>Verify Email</h1>
  <button @click="verifyUserEmailConfirmation">Click me and look the the console.</button>
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
            console.log(res)
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    }
  }

});
</script>