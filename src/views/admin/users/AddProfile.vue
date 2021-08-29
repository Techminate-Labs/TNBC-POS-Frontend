<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-4">
      <p class="text-2xl mb-4">Add User Profile</p>
    </div>
    <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
      <div v-for="(item, key, index) in user" :key="index" class="grid-span-1 mb-2">
        <div class="flex flex-col flex-nowrap py-2">
          <label class="capitalize mb-2">{{key}}</label>
          <input 
            :value="item" 
            type="text" 
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            placeholder="Placeholder Example"
          >
        </div>
      </div>
    </div>
    <button class="base-btn float-right">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddProfile',
  data() {
    return {
       user: {
        "first name":            "",
        "last name":             "",
        "email":                 "",
        "phone":                 "",
        "address 1":             "",
        "address 2":             "",
        "city":                  "",
        "zip code":              "",
        "identification number": ""
      }
    }
  }
});
</script>