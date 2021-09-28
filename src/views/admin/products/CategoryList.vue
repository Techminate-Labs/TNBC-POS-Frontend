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
      :type="type"
      :permissionsArrayNum="permissionsArrayNum"
      @handleView="viewCategory"
      @handleEdit="showCategoryEditModal"
      @handleDelete="deleteCategory"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" />
    <div class="hidden" :class="isCreating ? 'active' : ''">
      <CategoryModalCreate @handleSave="createCategory" @close-modal="isCreating = false" />
    </div>
    <div class="hidden" :class="isEditing ? 'active' : ''">
      <CategoryModalUpdate :name="selectedCategory.name" @handleSave="editCategory" @close-modal="isEditing = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryService from "@/services/CategoryService";
import DataTable from '@/components/tables/DataTable.vue';
import CategoryModalCreate from '@/components/modals/CategoryModalCreate.vue';
import CategoryModalUpdate from '@/components/modals/CategoryModalUpdate.vue';
import ResponseData from "@/types/ResponseData";
import { CategoryItem } from "@/types/CategoryTables";

export default defineComponent({
  name: 'CategoryList',
  components: {
    DataTable,
    CategoryModalCreate,
    CategoryModalUpdate
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [],
      url: '/categoryList',
      type: 'Users',
      permissionsArrayNum: 0,
      isCreating: false,
      isEditing: false,
      selectedCategory: {} as CategoryItem,
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
    async fetchCategories(): Promise<void> {
      let token = this.$store.state.bearerToken
      let url = this.url
      await CategoryService.list(url, token)
        .then((response: ResponseData) => {
          let res = response.data
          this.data = res.data
          console.log(res)
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
    showCategoryCreateModal(): void {
      this.isCreating = true
    },
    showCategoryEditModal(item: any): void {
      this.selectedCategory = item
      this.isEditing = true
    },
    viewCategory(): void {},
    async editCategory(categoryName: string): Promise<void> {
      let token = this.$store.state.bearerToken
      let data = { name: categoryName }
      let categoryId = this.selectedCategory.id
      await CategoryService.edit(data, categoryId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Category ${categoryName} has been successfully created!`,
            type: "success"
          })
          this.isEditing = false
          this.fetchCategories()
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that category.`,
            type: "error"
          })
          console.log(e)
        });
    },
    async deleteCategory(item: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let categoryId = item.id
      await CategoryService.delete(categoryId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Category has been successfully deleted.`,
            type: "success"
          })
          this.isEditing = false
          this.fetchCategories()
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that category.`,
            type: "error"
          })
          console.log(e)
        });
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
        this.fetchCategories()
      }
    },
    async createCategory(name: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let data = { name: name }
      await CategoryService.create(data, token)
        .then((response: ResponseData) => {
          this.isCreating = false
          this.fetchCategories()
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