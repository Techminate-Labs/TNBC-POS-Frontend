<template>
  <div>
    
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Add Supplier</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex flex-col py-2">
        <label class="label" for="name">Name:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="text" 
          name="name" 
          v-model="name" 
          placeholder="John Doe"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="label" for="email">Email:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="email" 
          name="email" 
          v-model="email" 
          placeholder="mail@example.com"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="label" for="phone">Phone:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="phone" 
          name="phone" 
          v-model="phone" 
          placeholder="+33 6 7856 218"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="label" for="company-name">Company name:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="text" 
          name="company-name" 
          v-model="companyName" 
          placeholder="ACME Inc."
        >
      </div>
      <div class="text-right">
        <button class="base-btn" @click="addSupplier">Save and exit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SupplierService from "@/services/SupplierService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'SupplierCreate',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      companyName: ''
    }
  },
  methods: {
    async addSupplier(): Promise<void> {
      let data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        company: this.companyName
      }
      let token = this.$store.state.bearerToken
      await SupplierService.create(data, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.name} successfully added to database!`,
            type: "success"
          })
          this.$router.push({name: 'SupplierList'})
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error adding that Supplier to the database.`,
            type: "error"
          })
          console.log(e)
        });
    }
  }
});
</script>