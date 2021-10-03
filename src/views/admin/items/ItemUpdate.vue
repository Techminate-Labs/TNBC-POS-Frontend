<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between mb-2">
      <p class="text-2xl mb-4">Edit item</p>
      <div class="text-right">
        <button
          class="base-btn-outline" 
          @click="$router.go(-1)">
          Back
        </button>
      </div>
    </div>
    <div class="flex flex-nowrap justify-between">
      <div class="w-6/12 h-full bg-white p-4 rounded-lg shadow-md">
        <div class="flex flex-col py-2">
          <label class="label" for="name">Name</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="name" 
            v-model="item.name" 
            placeholder="Winter Jacket"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="label" for="price">Price</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="price" 
            v-model="item.price" 
            placeholder="15"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="label" for="discount">Discount</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="discount" 
            v-model="item.discount" 
            placeholder="13"
          >
        </div>
        <div class="flex flex-col py-2">
          <label class="label" for="inventory">Inventory</label>
          <input
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
            type="text" 
            name="inventory" 
            v-model="item.inventory" 
            placeholder="3"
          >
        </div>
        <button class="base-btn float-right" @click="updateSupplier">Save</button>
      </div>
      <div class="w-5/12 h-full">
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <div class="flex flex-col py-2">
            <label class="label">Select Category</label>
            <Multiselect
              v-model="item.category_id"
              :options="getCategoryOptions"
              :searchable="true"
              placeholder="Pick a Category"
            />
          </div>
          <div class="flex flex-col py-2">
            <label class="label">Select Brand</label>
            <Multiselect
              v-model="item.brand_id"
              :options="getBrandOptions"
              :searchable="true"
              placeholder="Pick a Brand"
            />
          </div>
          <div class="flex flex-col py-2">
            <label class="label">Select Unit</label>
            <Multiselect
              v-model="item.unit_id"
              :options="getUnitOptions"
              :searchable="true"
              placeholder="Pick a Unit"
            />
          </div>
          <div class="flex flex-col py-2">
            <label class="label">Select Supplier</label>
            <Multiselect
              v-model="item.unit_id"
              :options="getSupplierOptions"
              :searchable="true"
              placeholder="Pick a Supplier"
            />
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <h3 class="label">Available to purchase</h3>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input v-model="item.available" type="checkbox" name="availability-toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"/>
            <label for="availability-toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 mb-3">
          <div class="flex flex-row justify-between">
            <p class="label">Image</p>
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
              <img :src="item.image" />
            </div>
          </div>
          <div v-show="newImagePreview.length">
            <p class="uppercase text-sm font-light">Preview</p>
            <img :src="newImagePreview" class="w-48 mb-6" />
            <button @click="confirmNewImage" class="base-btn-outline">upload</button>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex flex-col py-2">
            <label class="label">Select Expire Date</label>
            <input 
              type="date"
              v-model="item.expire_date"
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
import BrandService from "@/services/BrandService";
import CategoryService from "@/services/ItemService";
import SupplierService from "@/services/ItemService";
import UnitService from "@/services/ItemService";
import ResponseData from "@/types/ResponseData";
import { SingleItem } from "@/types/Items"
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: 'ItemUpdate',
  components: {
    Multiselect
  },
  data() {
    return {
      item: {} as SingleItem,
      categories: [],
      brands: [],
      units: [],
      suppliers: [],
      newImage: null as any,
      newImagePreview: '' as any
    }
  },
  methods: {
    async fetchItem(): Promise<void> {
      let token = this.$store.state.bearerToken
      let id = this.$route.params.id
      await ItemService.getById(id, token)
        .then((response: ResponseData) => {
            this.item = response.data
            console.log(response.data)
          })
        .catch((e: Error) => {
          console.log(e);
        });
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
    async updateSupplier(): Promise<void> {
      let id = this.$route.params.id
      let token = this.$store.state.bearerToken
      let data: SingleItem = this.item
      console.log(data)
      let available = (data.available ? 1 : 0)

      const fd: any = new FormData()
      fd.append("category_id", data.category_id)
      fd.append("brand_id", data.brand_id)
      fd.append("unit_id", data.unit_id)
      fd.append("supplier_id", data.supplier_id)
      fd.append("name", data.name)
      fd.append("price", data.price)
      fd.append("inventory", data.inventory)
      fd.append("discount", data.discount)
      fd.append('expire_date', data.expire_date)
      fd.append('available', available)
      // fd.append('image', data.image, data.name)
      fd.append('_method', 'PUT')
      console.log('form data', fd)

      await ItemService.edit(fd, id, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${data.name} successfully updated!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error updating that supplier.`,
            type: "error"
          })
          console.log(e)
        });
    },
    handleFileChange(e: any): void {
      this.newImage = e.target.files[0]
      this.newImagePreview = URL.createObjectURL(e.target.files[0])
    },
    handleDateChange(e: any): void {
      this.item.expire_date = e.target.value
    },
    confirmNewImage(e: any): void {
      this.item.image = this.newImage
      this.newImage = null
      this.newImagePreview = ''
    }
  },
  computed: {
    getCategoryOptions(): Array<any> {
      let _: Array<any> = []
      this.categories.map(function(cat: any) {
        _.push({
          value: cat.id,
          label: cat.name
        })
      })
      return _
    },
    getBrandOptions(): Array<any> {
      let _: Array<any> = []
      this.brands.map(function(brand: any) {
        _.push({
          value: brand.id,
          label: brand.name
        })
      })
      return _
    },
    getUnitOptions(): Array<any> {
      let _: Array<any> = []
      this.units.map(function(unit: any) {
        _.push({
          value: unit.id,
          label: unit.name
        })
      })
      return _
    },
    getSupplierOptions(): Array<any> {
      let _: Array<any> = []
      this.suppliers.map(function(supplier: any) {
        _.push({
          value: supplier.id,
          label: supplier.name
        })
      })
      return _
    }
  },
  async mounted() {
    this.fetchItem()
    this.fetchSuppliers()
    this.fetchCategories()
    this.fetchBrands()
    this.fetchUnits()
  },
});
</script>