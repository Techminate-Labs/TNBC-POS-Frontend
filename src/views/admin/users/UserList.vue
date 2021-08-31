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
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";
import formatDateMixin from '@/mixins/formatDateMixin.ts';

export default defineComponent({
  name: 'UserList',
  components: {
    Table
  },
  data() {
    return {
      items: [],
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
          attribute: 'email',
          name: 'email'
        },
        {
          attribute: 'role',
          name: 'role'
        },
        {
          attribute: 'created_at',
          name: 'registered on'
        },
        {
          attribute: 'updated_at',
          name: 'updated on'
        }
      ]
    }
  },
  mixins: [formatDateMixin],
  methods: {
    fetchUsers(): void {
      let token = this.$store.state.bearerToken
      DataService.listUsers(token)
        .then((response: ResponseData) => {
            console.log(response.data)
            let _users: any = []
            const _ = response.data.users.map((user: any) => {
              var _formated_created_date = this.formatDate(new Date(user.created_at))
              var _formated_updated_date = this.formatDate(new Date(user.updated_at))
              _users.push(
                {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role.name,
                  created_at: _formated_created_date,
                  updated_at: _formated_updated_date
                }
              )
              this.items = _users
            })
          })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  async created () {
    this.fetchUsers()
  },
});
</script>