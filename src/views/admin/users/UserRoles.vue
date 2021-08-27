<template>
  <div class="flex-grow mx-4 md:mx-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Role Permission</p>
      <button class="base-btn">Create Role</button>
    </div>
    <Table :items="items" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/tables/Table.vue'

export default defineComponent({
  name: 'UserRoles',
  components: {
    Table
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 125,
          stock: 17,
          availability: 'yes',
        },
        {
          id: 2,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 71,
          stock: 4,
          availability: 'yes',
        },
        {
          id: 3,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 30035,
          stock: 0,
          availability: 'no',
        },
        {
          id: 4,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 42,
          stock: 800,
          availability: 'yes',
        },
        {
          id: 5,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 456,
          availability: 'yes',
        },
        {
          id: 6,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 12378,
          stock: 0,
          availability: 'no',
        },
        {
          id: 7,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 57,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 8,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 124,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 9,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 1,
          availability: 'yes',
        },
        {
          id: 10,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 0.85,
          stock: 0,
          availability: 'no',
        },
        {
          id: 11,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 125,
          stock: 17,
          availability: 'yes',
        },
        {
          id: 12,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 71,
          stock: 4,
          availability: 'yes',
        },
        {
          id: 13,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 30035,
          stock: 0,
          availability: 'no',
        },
        {
          id: 14,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 42,
          stock: 800,
          availability: 'yes',
        },
        {
          id: 15,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 456,
          availability: 'yes',
        },
        {
          id: 16,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 12378,
          stock: 0,
          availability: 'no',
        },
        {
          id: 17,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 57,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 18,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 124,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 19,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 1,
          availability: 'yes',
        },
        {
          id: 20,
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 0.85,
          stock: 0,
          availability: 'no',
        },
      ],
      columns: [
        {
          name: '#',
          attribute: 'id'
        },
        {
          name: 'name',
          attribute: 'name'
        },
        {
          name: 'category',
          attribute: 'category'
        },
        {
          name: 'price',
          attribute: 'price'
        },
        {
          name: 'stock',
          attribute: 'stock'
        },
        {
          name: 'availability',
          attribute: 'availability'
        }
      ]
    }
  }
});
</script>