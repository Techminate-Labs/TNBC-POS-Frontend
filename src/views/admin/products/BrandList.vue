<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Brand List</p>
      <button
        @click="handleBrandCreate"
        class="base-btn">
          Create Brand
      </button>
    </div>
    <BrandTable :items="items" :columns="columns" @reload-this="reloadComponent" />
    <div class="hidden" :class="isModalOn ? 'active' : ''">
      <BrandModalCreate @close-modal="isModalOn = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BrandTable from '@/components/tables/BrandTable.vue'
import BrandModalCreate from '@/components/modals/BrandModalCreate.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'BrandList',
  components: {
    BrandTable,
    BrandModalCreate
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
    handleBrandCreate():void {
      console.log('create brand')
      this.isModalOn = true
    }
  },
  async mounted() {
    this.fetchUsers()
  },
});
</script>