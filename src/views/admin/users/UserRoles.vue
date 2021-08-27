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
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 125,
          stock: 17,
          availability: 'yes',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 71,
          stock: 4,
          availability: 'yes',
        },
        {
          id: 3,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 30035,
          stock: 0,
          availability: 'no',
        },
        {
          id: 4,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 42,
          stock: 800,
          availability: 'yes',
        },
        {
          id: 5,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 456,
          availability: 'yes',
        },
        {
          id: 6,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 12378,
          stock: 0,
          availability: 'no',
        },
        {
          id: 7,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 57,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 8,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 124,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 9,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 1,
          availability: 'yes',
        },
        {
          id: 10,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 0.85,
          stock: 0,
          availability: 'no',
        },
        {
          id: 11,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 125,
          stock: 17,
          availability: 'yes',
        },
        {
          id: 12,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 71,
          stock: 4,
          availability: 'yes',
        },
        {
          id: 13,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 30035,
          stock: 0,
          availability: 'no',
        },
        {
          id: 14,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 42,
          stock: 800,
          availability: 'yes',
        },
        {
          id: 15,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 456,
          availability: 'yes',
        },
        {
          id: 16,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 12378,
          stock: 0,
          availability: 'no',
        },
        {
          id: 17,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 57,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 18,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 124,
          stock: 3,
          availability: 'yes',
        },
        {
          id: 19,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
          name: 'Naga Burger',
          category: 'lorem ipsum',
          price: 2,
          stock: 1,
          availability: 'yes',
        },
        {
          id: 20,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
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
        },
        {
          name: 'image',
          attribute: 'image'
        },
      ]
    }
  }
});
</script>