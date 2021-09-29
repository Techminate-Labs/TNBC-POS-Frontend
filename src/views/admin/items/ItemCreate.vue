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
          <label class="mb-2" for="price">Price:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="price" 
            v-model="price" 
            placeholder="15"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="discount">Discount:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="discount" 
            v-model="discount" 
            placeholder="13"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="mb-2" for="inventory">Inventory:</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="inventory" 
            v-model="inventory" 
            placeholder="3"
          >
        </div>
        <button class="base-btn float-right" @click="addItem">Save</button>
      </div>
      <div class="w-5/12 h-full">
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Category:</label>
            <select v-model="categoryId" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option value="">-- Please select an option --</option>
              <option v-for="(category, index) in getCategoryOptions" :key="index" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Brand:</label>
            <select v-model="brandId" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option value="">-- Please select an option --</option>
              <option v-for="(brand, index) in getBrandOptions" :key="index" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Unit:</label>
            <select v-model="unitId" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option value="">-- Please select an option --</option>
              <option v-for="(unit, index) in getUnitOptions" :key="index" :value="unit.id">
                {{ unit.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col py-2">
            <label class="mb-2">Select Supplier:</label>
            <select v-model="supplierId" class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
              <option value="">-- Please select an option --</option>
              <option v-for="(supplier, index) in getSupplierOptions" :key="index" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <h3 class="text-lg mb-3">Available to purchase</h3>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input v-model="available" type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
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
              @change="handleDateChange($event)"
              class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemService from "@/services/ItemService";
import ResponseData from "@/types/ResponseData";
import CategoryService from '@/services/CategoryService';
import BrandService from '@/services/BrandService';
import UnitService from '@/services/UnitService';
import SupplierService from '@/services/SupplierService';
import { SupplierItem } from '@/types/Suppliers';

export default defineComponent({
  name: 'ItemCreate',
  data() {
    return {
      categoryId: '',
      brandId: '',
      unitId: '',
      supplierId: '',
      name: '',
      price: '',
      discount: '',
      inventory: '',
      expireDate: '',
      available: '',
      image: null as any,
      categories: [],
      brands: [],
      units: [],
      suppliers: [],
    }
  },
  methods: {
    async addItem(): Promise<void> {
      let token = this.$store.state.bearerToken
      let date = new Date(this.expireDate)
      let available = '';
      if (this.available){
        available = '1'
      } else if (!this.available){
        available = '0'
      }
      const fd = new FormData()
      fd.append('category_id', this.categoryId)
      fd.append('brand_id', this.brandId)
      fd.append('unit_id', this.unitId)
      fd.append('supplier_id', this.supplierId)
      fd.append('name', this.name)
      fd.append('price', this.price)
      fd.append('discount', this.discount)
      fd.append('inventory', this.inventory)
      fd.append('expire_date', this.expireDate)
      fd.append('available', available)
      fd.append('image', this.image, this.image.name)
      await ItemService.create(fd, token)
        .then((response: ResponseData) => {
            this.$toast.open({
              message: `${this.name} has been successfully added to the database!`,
              type: "success"
            })
          })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that item.`,
            type: "error"
          })
          console.log(e)
        });
    },
    handleFileChange(e: any): void {
      this.image = e.target.files[0]
    },
    handleDateChange(e: any): void {
      this.expireDate = e.target.value
    },
    async fetchCategories(): Promise<void> {
      let url = 'categoryList'
      let token = this.$store.state.bearerToken
      await CategoryService.list(`${url}/?limit=0`, token)
        .then((response: ResponseData) => {
            this.categories = response.data.data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async fetchBrands(): Promise<void> {
      let url = 'brandList'
      let token = this.$store.state.bearerToken
      await BrandService.list(`${url}/?limit=0`, token)
        .then((response: ResponseData) => {
            this.brands = response.data.data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async fetchUnits(): Promise<void> {
      let url = 'unitList'
      let token = this.$store.state.bearerToken
      await UnitService.list(`${url}/?limit=0`, token)
        .then((response: ResponseData) => {
            this.units = response.data.data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async fetchSuppliers(): Promise<void> {
      let url = 'supplierList'
      let token = this.$store.state.bearerToken
      await SupplierService.list(`${url}/?limit=0`, token)
        .then((response: ResponseData) => {
            this.suppliers = response.data.data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  computed:{
    getCategoryOptions(): Array<SupplierItem> {
      return this.categories
    },
    getBrandOptions(): Array<SupplierItem> {
      return this.brands
    },
    getUnitOptions(): Array<SupplierItem> {
      return this.units
    },
    getSupplierOptions(): Array<SupplierItem> {
      return this.suppliers
    },
  },
  async mounted() {
    this.fetchCategories()
    this.fetchBrands()
    this.fetchUnits()
    this.fetchSuppliers()
  }
});
</script>