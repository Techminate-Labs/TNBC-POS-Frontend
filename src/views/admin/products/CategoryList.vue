<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Category List</p>
      <button
        @click="handleCategoryCreate"
        class="base-btn">
          Create Category
      </button>
    </div>
    <CategoryTable :items="items" :columns="columns" @reload-this="reloadComponent" />
    <div class="hidden" :class="isModalOn ? 'active' : ''">
      <CategoryModalCreate @close-modal="isModalOn = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryTable from '@/components/tables/CategoryTable.vue'
import CategoryModalCreate from '@/components/modals/CategoryModalCreate.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'CategoryList',
  components: {
    CategoryTable,
    CategoryModalCreate
  },
  data() {
    return {
      items: [],
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
    fetchUsers(): void {
      let token = this.$store.state.bearerToken
    },
    reloadComponent():void {
      // this.fetchUsers()
    },
    handleCategoryCreate():void {
      console.log('create category')
      this.isModalOn = true
    }
  },
  async mounted() {
    this.fetchUsers()
  },
});
</script>