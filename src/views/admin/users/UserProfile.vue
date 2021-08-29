<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-4">
      <p class="text-2xl mb-4">User Profile</p>
    </div>
    <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
      <div v-for="(item, key, index) in user" :key="index" class="grid-span-1 mb-2">
        <h3 class="font-regular text-xl">{{ key }}</h3>
        <p class="text-gray-700">{{ item }}</p>
      </div>
    </div>
    <button class="base-btn float-right"><router-link to="/user-management/user-edit-profile">Edit</router-link></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserProfile',
  data() {
    return {
      user: {
        "first name":            "Jhon",
        "last name":             "Doe",
        "email":                 "jhon@example.com",
        "phone":                 "08 (765) 2148",
        "address 1":             "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor",
        "address 2":             "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor",
        "city":                  "abc",
        "zip code":              "123",
        "identification number": "123456",
        "registered on":         "7/29/2021",
        "updated on":            "8/29/2021"
      }
    }
  }
});
</script>