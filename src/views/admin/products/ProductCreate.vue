<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Add Product</p>
    </div>
    <div class="flex flex-nowrap justify-between">
      <div class="w-6/12 h-full bg-white p-4 rounded-lg shadow-md">
        <div class="flex flex-col py-2">
          <label class="mb-2" for="name">Name:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="name" 
            v-model="name" 
            placeholder="Winter Jacket"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="slug">Slug:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="slug" 
            v-model="slug" 
            placeholder="winter-jacket"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="sku">SKU ID:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="sku" 
            v-model="sku" 
            placeholder="E1245"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="stock">Stock:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="stock" 
            v-model="stock" 
            placeholder="42"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="price">Price:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="price" 
            v-model="price" 
            placeholder="999"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="discount-price">Discount price:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="discount-price" 
            v-model="discountPrice" 
            placeholder="998"
          >
        </div>
        <button class="base-btn float-right" @click="addProduct">Save</button>
      </div>
      <div class="w-5/12 h-full">
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Category:</label>
            <select class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option :value="null">-- Please select an option --</option>
            </select>
          </div>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Brand:</label>
            <select class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option :value="null">-- Please select an option --</option>
            </select>
          </div>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Unit:</label>
            <select class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option :value="null">-- Please select an option --</option>
            </select>
          </div>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Supplier:</label>
            <select class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option :value="null">-- Please select an option --</option>
            </select>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <h3 class="text-lg mb-3">Available to purchase</h3>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <div class="flex flex-col py-2">
            <label class="mb-2">Image</label>
            <input 
              type="file"
              accept="image/*"
              @change="handleFileChange($event)"
              name="image"
              class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg mb-3">Expire Date</h3>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Supplier:</label>
            <input 
              type="date"
              class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ProductCreate',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      companyName: ''
    }
  },
  methods: {
    addProduct(): void {
      let data = {}
      let token = this.$store.state.bearerToken
      console.log("add product")
    }
  }
});
</script>