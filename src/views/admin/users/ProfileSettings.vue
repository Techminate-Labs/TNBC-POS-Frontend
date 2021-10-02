<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-2">
      <p class="text-2xl">Profile Settings</p>
      <button 
        @click="$router.go(-1)" 
        class="base-btn-outline float-right">
        Back
      </button>
    </div>
    <div class="grid grid-cols-2 auto-rows-auto gap-4">
      <div class="bg-white shadow-md rounded-md p-4 grid-span-1 row-span-1">
        <div class="flex flex-col flex-nowrap py-2 mb-2">
          <label class="capitalize mb-2" for="current_password">Current Password</label>
          <input 
            type="password"
            name="current_password"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="**********"
            v-model="user.current_password"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 mb-2">
          <label class="capitalize mb-2" for="new_password">New Password</label>
          <input 
            type="password"
            name="new_password"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="**********"
            v-model="user.new_password"
          >
        </div>
        <div class="flex flex-col flex-nowrap py-2 mb-2">
          <label class="capitalize mb-2" for="repeat_new_password">Repeat New Password</label>
          <input 
            type="password"
            name="repeat_new_password"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="**********"
            v-model="user.repeat_new_password"
          >
        </div>
      </div>
      <div class="bg-white shadow-md rounded-md p-4 grid-span-1 row-start-2">
        <div class="flex flex-cols flex-nowrap py-2 mb-2">
          <label class="label" for="last_name">Email Verification</label>
          <button class="base-btn">Verify</button>
        </div>
      </div>
      <div class="bg-white shadow-md rounded-md p-4 grid-span-2 row-span-2">
        <img :src="user.image" class="w-48 mb-6" alt="User profile image" />
        <div class="border-2 border-gray-200 focus:border-gray-900 rounded-md p-4">
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
          <div v-show="user.newImage.length">
            <p class="uppercase text-sm font-light">Preview</p>
            <img :src="user.newImage" class="w-48 mb-6" />
            <button @click="confirmNewImage" class="base-btn-outline">upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/ProfileService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ProfileCreate',
  data() {
    return {
      user: {
        image: null as any,
        newImage: '',
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      }
    }
  },
  methods: {
    async fetchProfile(): Promise<void> {
      let user_id = parseInt(this.$route.params.user_id as string)
      let token = this.$store.state.bearerToken
      await ProfileService.getById(user_id, token)
        .then((response: ResponseData) => {
          this.user.image = response.data.image
        })
    },
    handleFileChange(e: any): void {
      this.user.newImage = URL.createObjectURL(e.target.files[0])
    },
    confirmNewImage(e: any): void {
      this.user.image = this.user.newImage
      this.user.newImage = ''
    }
  },
  mounted(){
    this.fetchProfile()
  }
});
</script>