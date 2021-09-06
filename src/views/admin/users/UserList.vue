<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">User List</p>
      <router-link 
        v-show="canUserCreate"
        :to="{ name: 'UserCreate' }">
        <button class="base-btn">Create User</button>
      </router-link>
    </div>
    <UserTable :items="items" :columns="columns" @reload-this="reloadComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResponseData from "@/types/ResponseData";
import UserTable from '@/components/tables/UserTable.vue'
import DataService from "@/services/DataService";
import formatDateMixin from '@/mixins/formatDateMixin.ts';

export default defineComponent({
  name: 'UserList',
  components: {
    UserTable
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
        },
        {
          attribute: 'email_verified_at',
          name: 'email verified on'
        },
      ]
    }
  },
  mixins: [formatDateMixin],
  methods: {
    fetchUsers(): void {
      let token = this.$store.state.bearerToken
      DataService.listUsers(token)
        .then((response: ResponseData) => {
            let _users: any = []
            const _ = response.data.users.map((user: any) => {
              let _formated_created_date = null
              if (user.created_at !== null)
                _formated_created_date = this.formatDate(new Date(user.created_at))
              let _formated_updated_date = null
              if (user.updated_at !== null)
                _formated_updated_date = this.formatDate(new Date(user.updated_at))
              let _formated_verified_date = null
              if (user.email_verified_at !== null)
                _formated_verified_date = this.formatDate(new Date(user.email_verified_at))
              _users.push(
                {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role.name,
                  created_at: _formated_created_date,
                  email_verified_at: _formated_verified_date,
                  updated_at: _formated_updated_date
                }
              )
              this.items = _users
            })
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    reloadComponent():void {
      this.fetchUsers()
    }
  },
  computed: {
    canUserCreate():boolean {
      return this.$store.state.permissions[0]["Users"].create
    }
  },
  async mounted() {
    this.fetchUsers()
  },
});
</script>