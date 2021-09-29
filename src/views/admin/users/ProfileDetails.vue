<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-4">
      <p class="text-2xl mb-4">User Profile</p>
    </div>
    <div 
      v-if="!profile" 
      class="bg-white p-4 rounded-lg shadow-md">
      This user doesn't have any profile
    </div>
    <div v-else class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
      <div v-for="(item, key, index) in profile" :key="index" class="grid-span-1 mb-2">
        <h3 class="font-regular text-xl capitalize">{{ key }}</h3>
        <img 
          v-if="key === 'image'"
          class="text-gray-700"
          :src="item" />
        <p 
          v-else
          class="text-gray-700">
          {{ item }}
        </p>
      </div>
    </div>
    <button class="base-btn float-right"><router-link to="/user-management/user-edit-profile">Edit</router-link></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/ProfileService";
import ResponseData from "@/types/ResponseData";
import formatDateMixin from '@/mixins/formatDateMixin';

export default defineComponent({
  name: 'ProfileDetails',
  data() {
    return {
      profile: null
    }
  },
  mixins: [formatDateMixin],
  methods: {
    async fetchProfile(): Promise<void> {
      let params = this.$route.params
      let user_id = parseInt(params.user_id as string)
      let token = this.$store.state.bearerToken
      await ProfileService.list(user_id, token)
        .then((response: ResponseData) => {
            this.profile  = response.data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  async mounted () {
    this.fetchProfile()
  },
});
</script>