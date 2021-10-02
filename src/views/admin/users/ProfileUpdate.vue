<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-4">
      <p class="text-2xl mb-4">Add User Profile</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="first_name">First Name</label>
          <input 
            type="text"
            name="first_name"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="John"
            v-model="user.first_name"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="last_name">Last Name</label>
          <input 
            type="text"
            name="last_name"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="Doe"
            v-model="user.last_name"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="mobile">Mobile</label>
          <input 
            type="text"
            name="mobile"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="02 45 84 55 65"
            v-model="user.mobile"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="identity_number">ID Number</label>
          <input 
            type="number"
            name="identity_number"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="45685318"
            v-model="user.identity_number"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="present_address">Present Address</label>
          <input 
            type="text"
            name="present_address"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="45 Freedom Av."
            v-model="user.present_address"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="permanent_address">Permanent Address</label>
          <input 
            type="text"
            name="permanent_address"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="45668A Liberty Bvd"
            v-model="user.permanent_address"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="city">City</label>
          <input 
            type="text"
            name="city"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="New York"
            v-model="user.city"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
          <label class="label" for="zip">Zip Code</label>
          <input 
            type="text"
            name="zip"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="456 21"
            v-model="user.zip"
          >
        </div>
        <div>
          <div class="flex flex-row justify-between">
            <p>Image</p>
            <label class="flex flex-row items-center px-4 py-2 hover:text-blue-800 rounded-lg uppercase cursor-pointer">
              <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="ml-2">Select a file</span>
              <input @change="handleFileChange($event)" type='file' accept="image/*" class="hidden" />
            </label>
          </div>
          <div class="">
            <div class="w-48">
              <img :src="user.image" />
            </div>
          </div>
          <div v-show="newImagePreview.length">
            <p class="uppercase text-sm font-light">Preview</p>
            <img :src="newImagePreview" class="w-48 mb-6" />
          </div>
        </div>
      </div>
      <div class="text-right">
        <button class="base-btn" @click="updateUserProfile">Save and exit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/ProfileService";
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
        image:             null as any,
      },
      newImage:             null as any,
      newImagePreview:      '' as any
    }
  },
  methods: {
    async fetchUserProfile(): Promise<void> {
      let token = this.$store.state.bearerToken
      let user_id = parseInt(this.$route.params.user_id as string)
      await ProfileService.getById(user_id, token)
        .then((response: ResponseData) => {
          this.user = response.data
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async updateUserProfile(): Promise<void> {
      console.log("clicked on update")
      let token = this.$store.state.bearerToken
      let user_id = parseInt(this.$route.params.user_id as string)
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
        image: this.newImage
      }
      await ProfileService.update(data, user_id, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.user.first_name} ${this.user.last_name} has been successfully updated!`,
            type: "success"
          })
          console.log(response)
          this.$router.push({name:'ProfileDetails', params: { user_id: user_id }})
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error updating that profile.`,
            type: "error"
          })
          console.log(e)
        });
    },
    handleFileChange(e: any): void {
      this.newImage = e.target.files[0]
      this.newImagePreview = URL.createObjectURL(e.target.files[0])
    }
  },
  async mounted(): Promise<void>{
    await this.fetchUserProfile()
  }
});
</script>