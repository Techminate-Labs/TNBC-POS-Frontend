<template>
  <div class="overflow-hidden">
    <div class="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-1/2 z-40 p-10 bg-white rounded-lg shadow-lg">
      <button @click="$emit('close-modal')" class="float-right hover:text-red-600">Close modal</button>
      <p class="text-2xl mb-4">Brand List</p>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="name">Name:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="text" 
          name="name" 
          v-model="name" 
          placeholder="Winter Clothes"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="mb-2" for="slug">Slug:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="text" 
          name="slug" 
          v-model="slug" 
          placeholder="winter-clothes"
        >
      </div>
      <div class="float-right">
        <button class="base-btn-cancel border-2 border-red-800 hover:border-red-700 mr-4">Cancel</button>
        <button class="base-btn-outline">Save</button>
      </div>
    </div>
    <div class="bg-gray-800 h-screen w-full opacity-90 z-30 fixed top-0 left-0"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BrandModalUpdate',
  data() {
    return {
      name: '',
      slug: ''
    }
  }
})
</script>