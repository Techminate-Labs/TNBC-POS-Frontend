<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-4">
      <p class="text-2xl mb-4">Add User Profile</p>
    </div>
    <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="first_name">First Name</label>
        <input 
          type="text"
          name="first_name"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="John"
          v-model="user.first_name"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="last_name">Last Name</label>
        <input 
          type="text"
          name="last_name"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="Doe"
          v-model="user.last_name"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="mobile">Mobile</label>
        <input 
          type="text"
          name="mobile"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="02 45 84 55 65"
          v-model="user.mobile"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="identity_number">ID Number</label>
        <input 
          type="number"
          name="identity_number"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="45685318"
          v-model="user.identity_number"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="present_address">Present Address</label>
        <input 
          type="text"
          name="present_address"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="45 Freedom Av."
          v-model="user.present_address"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="permanent_address">Permanent Address</label>
        <input 
          type="text"
          name="permanent_address"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="45668A Liberty Bvd"
          v-model="user.permanent_address"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="city">City</label>
        <input 
          type="text"
          name="city"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="New York"
          v-model="user.city"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
        <label class="capitalize mb-2" for="zip">Zip Code</label>
        <input 
          type="text"
          name="zip"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="456 21"
          v-model="user.zip"
        >
      </div>
      <div class="flex flex-col flex-nowrap py-2 grid-span-2 mb-2">
        <label class="capitalize mb-2" for="image">Image</label>
        <input 
          type="file"
          @change="handleFileChange($event)"
          name="image"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
          placeholder="456 21"
        >
      </div>
    </div>
    <button class="base-btn float-right" @click="addUserProfile">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ProfileUpdate',
  data() {
    return {
       user: {
        first_name:        '',
        last_name:         '',
        email:             '',
        mobile:            '',
        present_address:   '',
        permanent_address: '',
        city:              '',
        zip:               '',
        identity_number:   '',
        image: ''
      }
    }
  },
  methods: {
    addUserProfile(): void {
      console.log('add user profile!');
      let user_id = this.$route.params.id
      let data = {
        user_id: user_id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        mobile: this.user.mobile,
        present_address: this.user.present_address,
        permanent_address: this.user.permanent_address,
        identity_number: this.user.identity_number,
        city: this.user.city,
        zip: this.user.zip,
        image: this.user.image
      }
      DataService.addUserProfile(data)
        .then((response: ResponseData) => {
            console.log(response)
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    handleFileChange(e: any): void {
      console.log(e)
      this.user.image = e.target.files[0].name
    }
  }
});
</script>