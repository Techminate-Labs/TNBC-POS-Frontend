<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-4">
      <p class="text-2xl mb-4">User Profile</p>
    </div>
    <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
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
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";
import formatDateMixin from '@/mixins/formatDateMixin.ts';

export default defineComponent({
  name: 'ProfileSingle',
  data() {
    return {
      profile: {}
    }
  },
  mixins: [formatDateMixin],
  methods: {
    fetchProfile(): void {
      let params = this.$route.params
      let user_id = parseInt(params.id as string)
      console.log(user_id)
      let token = this.$store.state.bearerToken
      DataService.listUserProfile(user_id, token)
        .then((response: ResponseData) => {

            console.log(response.data)
            let _profileTemp = response.data.profile[0]

            let _formated_created_date = null
            let _formated_updated_date = null
            if (_profileTemp.created_at !== null)
              _formated_created_date = this.formatDate(new Date(_profileTemp.created_at))
            if (_profileTemp.updated_at !== null)
              _formated_updated_date = this.formatDate(new Date(_profileTemp.updated_at))

            let _profile = {
              "first name": _profileTemp.first_name,
              "last name": _profileTemp.last_name,
              "email": _profileTemp.email,
              "mobile": _profileTemp.mobile,
              "present address": _profileTemp.present_address,
              "permanent address": _profileTemp.permanent_address,
              "city": _profileTemp.city,
              "zip": _profileTemp.zip,
              "identity number": _profileTemp.identity_number,
              "created at": _formated_created_date,
              "updated at": _formated_updated_date,
              "image": _profileTemp.image
            }
            
                
            this.profile = _profile
          
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