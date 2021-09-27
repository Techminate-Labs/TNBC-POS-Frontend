<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between ">
      <p class="text-2xl mb-4">User Roles</p>
      <router-link
        v-show="canUserCreate"
        :to="{ name: 'RoleCreate' }">
        <button class="base-btn">
          Create Role
        </button>
      </router-link>
    </div>
    <DataTable
      :columns="columns"
      :next="next"
      :prev="prev"
      :meta="meta"
      :data="data"
      :type="type"
      :permissionsArrayNum="permissionsArrayNum"
      @reload-this="reloadComponent"
      @handleView="viewRole"
      @handleEdit="editRole"
      @handleDelete="deleteRole"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";
import formatDateMixin from '@/mixins/formatDateMixin';

export default defineComponent({
  name: 'RolesList',
  components: {
    DataTable
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [],
      type: "Roles",
      url: '/roleList',
      permissionsArrayNum: 1,
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
          name: 'Created At',
          attribute: 'created_at'
        },
        {
          name: 'Updated At',
          attribute: 'updated_at'
        }
      ]
    }
  },
  mixins: [formatDateMixin],
  methods: {
    fetchRoles(): void {
      let token = this.$store.state.bearerToken
      DataService.listRoles(token)
        .then((response: ResponseData) => {
          let res = response.data
          this.data = res.data
          console.log(this.data)
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
    reloadComponent(): void {
      this.fetchRoles()
    },
    viewRole(item: any): void {
      console.log('waiting for roleView component')
    },
    editRole(item: any): void {
      this.$router.push({name: 'RoleUpdate', params: {id: item.id}})
    },
    deleteRole(item: any):void {
      let token = this.$store.state.bearerToken
      DataService.deleteRole(item.id, token)
        .then((response: ResponseData) => {
            this.$emit('reloadThis')
            this.$toast.open({
              message: `This role has been successfully deleted.`,
              type: "success"
            })
          })
        .catch((e: Error) => {
          this.$toast.open({
            message: `Could not delete that role.`,
            type: "error"
          })
          console.log(e)
        });
    },
    pageChange(url: string):void {
      this.url = url
      this.fetchRoles()
    },
    previousPage():void {
      if (this.prev !== null){
        this.url = this.prev
        this.fetchRoles()
      }
    },
    nextPage():void {
      if (this.next !== null){
        this.url = this.next
        this.fetchRoles()
      }
    },
  },
  computed: {
    canUserCreate():boolean {
      return this.$store.state.permissions[this.permissionsArrayNum]["Roles"].create
    }
  },
  async mounted() {
    this.fetchRoles()
  },
});
</script>