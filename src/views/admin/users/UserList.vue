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
    <DataTable
      :columns="columns"
      :next="next"
      :prev="prev"
      :meta="meta"
      :data="data"
      :routerComponent="routerComponent"
      :type="type"
      @reload-this="reloadComponent"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage"
      @deleteItem="deleteUser"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResponseData from "@/types/ResponseData";
import DataTable from '@/components/tables/DataTable.vue'
import { User } from '@/types/UserTables'
import DataService from "@/services/DataService";
import formatDateMixin from '@/mixins/formatDateMixin.ts';

export default defineComponent({
  name: 'UserList',
  components: {
    DataTable
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [],
      type: "Users",
      url: '/users',
      routerComponent: { 
        create: 'ProfileCreate',
        edit: 'UserUpdate',
        view: 'ProfileSingle',
      },
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
          attribute: 'roleName',
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
      let url = this.url
      DataService.listUsers(url, token)
        .then((response: ResponseData) => {
          let res = response.data
          this.data = res.data.map((user: User) => ({
            ...user, 
            roleName: user.role.name, 
            created_at: this.formatDate(new Date(user.created_at)),
            email_verified_at: this.formatDate(new Date(user.email_verified_at)),
            updated_at: this.formatDate(new Date(user.updated_at))
          }))
          this.meta = res.meta
          console.log(this.meta)
          this.prev = res.links.prev
          this.next = res.links.next
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    reloadComponent():void {
      this.fetchUsers()
    },
    pageChange(url: string):void {

      this.url = url
      this.fetchUsers()

    },
    previousPage():void {
      if (this.prev !== null){

        this.url = this.prev
        this.fetchUsers()
      
      }
    },
    nextPage():void {
      if (this.next !== null){

        this.url = this.next
        this.fetchUsers()
      
      }
    },
    deleteUser(id: number):void {
      let token = this.$store.state.bearerToken
      DataService.deleteUser(id, token)
        .then((response: ResponseData) => {
          this.fetchUsers()
          this.$toast.open({
            message: `User successfully deleted.`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `Could not delete that user.`,
            type: "error"
          })
          console.log(e)
        });
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