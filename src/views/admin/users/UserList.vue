<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">User List</p>
      <button class="base-btn"><router-link to="/user-management/user-add">Create User</router-link></button>
    </div>
    <Table :items="items" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/tables/Table.vue'

export default defineComponent({
  name: 'UserList',
  components: {
    Table
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers(): void {

    }
  },
  async created () {
    this.fetchUsers()
  },
});
</script>