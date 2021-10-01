<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-2">
      <p class="text-2xl">User Profile</p>
      <button 
        @click="$router.go(-1)" 
        class="base-btn-outline float-right">
        Back
      </button>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div 
        v-if="!profile" 
        class="bg-white p-4 rounded-lg shadow-md">
        This user doesn't have any profile
      </div>
      <div v-else class="grid grid-cols-3 gap-4">
        <div class="col-span-1 col-start-1">
          <div class="mb-6">
            <h3 class="label">First Name</h3>
            <p class="">{{ profile.first_name }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Email</h3>
            <p class="">{{ profile.email }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Present Address</h3>
            <p class="">{{ profile.present_address }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">City</h3>
            <p class="">{{ profile.city }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Identification Number</h3>
            <p class="">{{ profile.identity_number }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Updated On</h3>
            <p class="">{{ profile.updated_at }}</p>
          </div>
        </div>
        <div class="col-span-1 col-start-2">
          <div class="mb-6">
            <h3 class="label">Last Name</h3>
            <p class="">{{ profile.last_name }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Phone</h3>
            <p class="">{{ profile.mobile }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Permanent Address</h3>
            <p class="">{{ profile.permanent_address }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Zip Code</h3>
            <p class="">{{ profile.zip }}</p>
          </div>
          <div class="mb-6">
            <h3 class="label">Registered On</h3>
            <p class="">{{ profile.created_at }}</p>
          </div>
        </div>
        <div class="col-span-1 col-start-3 row-span-1">
          <div class="w-48">
            <img :src="profile.image" />
          </div>
        </div>
      </div>
      <div class="text-right">
        <router-link :to="{name: 'ProfileUpdate', params: { user_id: profile.user_id }}">
          <button v-show="profile" class="base-btn">Edit</button>
        </router-link>
      </div>
    </div>
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
      profile: { user_id: 0 }
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
            console.log(this.profile)
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