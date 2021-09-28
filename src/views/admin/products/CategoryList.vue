<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Category List</p>
      <button
        @click="showCategoryCreateModal"
        class="base-btn">
          Create Category
      </button>
    </div>
    <DataTable 
      :columns="columns"
      :data="data"
      :meta="meta"
      :next="next"
      :prev="prev"
      @handleView="viewCategory"
      @handleEdit="editCategory"
      @handleDelete="deleteCategory"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" />
    <div class="hidden" :class="isModalOn ? 'active' : ''">
      <CategoryModalCreate @handleSave="createCategory" @close-modal="isModalOn = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue';
import CategoryModalCreate from '@/components/modals/CategoryModalCreate.vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'CategoryList',
  components: {
    DataTable,
    CategoryModalCreate
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [],
      url: '/categoryList',
      permissionsArrayNum: 0,
      isModalOn: false,
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
    fetchCategories(): void {
      let token = this.$store.state.bearerToken
      let url = this.url
      DataService.listCategories(url, token)
        .then((response: ResponseData) => {
          let res = response.data
          this.data = res.data.map((user: any) => ({
            ...user, 
            roleName: user.role, 
            created_at: user.created_at,
            email_verified_at: user.email_verified_at,
            updated_at: user.updated_at
          }))
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
    reloadComponent():void {
      // this.fetchCategories()
    },
    showCategoryCreateModal():void {
      this.isModalOn = true
    },
    pageChange(url: string):void {
      this.url = url
      this.fetchCategories()
    },
    previousPage():void {
      if (this.prev !== null){
        this.url = this.prev
        this.fetchCategories()
      }
    },
    nextPage(): void {
      if (this.next !== null){
        this.url = this.next
        console.log(this.next)
        this.fetchCategories()
      }
    },
    createCategory(name: any): void {
      let token = this.$store.state.bearerToken
      let data = { name: name }
      DataService.createCategory(data, token)
        .then((response: ResponseData) => {
          console.log(response)
          this.$toast.open({
            message: `Category ${name} has been successfully created!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that category.`,
            type: "error"
          })
          console.log(e)
        });
    }
  },
  async mounted() {
    this.fetchCategories()
  },
});
</script>