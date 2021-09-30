<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Brand List</p>
      <button
        @click="showBrandCreateModal"
        class="base-btn">
          Create Brand
      </button>
    </div>
    <DataTable 
      :columns="columns"
      :data="data"
      :meta="meta"
      :next="next"
      :prev="prev"
      :type="type"
      :permissionsArrayNum="permissionsArrayNum"
      @handleView="viewBrand"
      @handleEdit="showBrandEditModal"
      @handleDelete="deleteBrand"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage"
      @maxItemsPerPageChange="pageLimitChange" />
    <div class="hidden" :class="isCreating ? 'active' : ''">
      <BrandModalCreate @handleSave="createBrand" @close-modal="isCreating = false" />
    </div>
    <div class="hidden" :class="isEditing ? 'active' : ''">
      <BrandModalUpdate :name="selectedBrand.name" @handleSave="editBrand" @close-modal="isEditing = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import BrandModalCreate from '@/components/modals/BrandModalCreate.vue'
import BrandModalUpdate from '@/components/modals/BrandModalUpdate.vue'
import BrandService from "@/services/BrandService";
import ResponseData from "@/types/ResponseData";
import { BrandItem } from "@/types/BrandTables";

export default defineComponent({
  name: 'BrandList',
  components: {
    DataTable,
    BrandModalCreate,
    BrandModalUpdate
  },
  data() {
    return {
      items: [],
      next: '',
      prev: '',
      meta: {},
      data: [],
      url: '/brandList',
      maxItemsPerPage: '' || undefined as unknown as string,
      type: 'Users',
      permissionsArrayNum: 0,
      isCreating: false,
      isEditing: false,
      selectedBrand: {} as BrandItem,
      columns: [
        {
          attribute: 'id',
          name: 'id'
        },
        {
          attribute: 'name',
          name: 'name'
        },
        {
          attribute: 'slug',
          name: 'slug'
        },
        {
          attribute: 'number_of_products',
          name: 'number of products'
        }
      ]
    }
  },
  methods: {
    async fetchBrands(): Promise<void> {
      let token = this.$store.state.bearerToken
      let url = this.url
      await BrandService.list(url, token)
        .then((response: ResponseData) => {
          let res = response.data
          this.data = res.data
          this.meta = {
            current_page: res.current_page,
            from: res.from,
            last_page: res.last_page,
            links: res.links,
            path: res.path,
            per_page: res.per_page,
            to: res.to,
            total: res.total
          }
          this.prev = res.prev_page_url
          this.next = res.next_page_url
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    showBrandCreateModal(): void {
      this.isCreating = true
    },
    showBrandEditModal(item: any): void {
      this.selectedBrand = item
      this.isEditing = true
    },
    viewBrand(): void {},
    async editBrand(brandName: string): Promise<void> {
      let token = this.$store.state.bearerToken
      let data = { name: brandName }
      let brandId = this.selectedBrand.id
      await BrandService.edit(data, brandId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Brand ${brandName} has been successfully created!`,
            type: "success"
          })
          this.isEditing = false
          this.fetchBrands()
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that category.`,
            type: "error"
          })
          console.log(e)
        });
    },
    async deleteBrand(item: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let BrandId = item.id
      await BrandService.delete(BrandId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Brand has been successfully deleted.`,
            type: "success"
          })
          this.isEditing = false
          this.fetchBrands()
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that brand.`,
            type: "error"
          })
          console.log(e)
        });
    },
    pageChange(url: string):void {
      this.url = url
      this.fetchBrands()
    },
    async pageLimitChange(limit: string): Promise<void> {
      let url = this.url
      this.maxItemsPerPage = limit
      this.url = `${url}?limit=${limit}`
      this.fetchBrands()
    },
    previousPage():void {
      if (this.prev !== null){
        let url = this.prev
        let limit = this.maxItemsPerPage
        this.url = `${url}&limit=${limit}`
        this.fetchBrands()
      }
    },
    nextPage(): void {
      if (this.next !== null){
        let url = this.next
        let limit = this.maxItemsPerPage
        this.url = `${url}&limit=${limit}`
        this.fetchBrands()
      }
    },
    async createBrand(name: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let data = { name: name }
      await BrandService.create(data, token)
        .then((response: ResponseData) => {
          this.isCreating = false
          this.fetchBrands()
          this.$toast.open({
            message: `Brand ${name} has been successfully created!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that brand.`,
            type: "error"
          })
          console.log(e)
        });
    }
  },
  async mounted() {
    this.fetchBrands()
  },
});
</script>