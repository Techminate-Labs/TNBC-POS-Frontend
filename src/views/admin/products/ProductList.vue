<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Product List</p>
      <router-link :to="{ name: 'ProductCreate' }"><button
        class="base-btn">
          Create Product
      </button></router-link>
    </div>
    <ProductTable :items="items" :columns="columns" @reload-this="reloadComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductTable from '@/components/tables/ProductTable.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductTable
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
    }
  },
  async mounted() {
    this.fetchUsers()
  },
});
</script>