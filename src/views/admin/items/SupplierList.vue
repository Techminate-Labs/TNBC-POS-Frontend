<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Supplier List</p>
      <router-link :to="{ name: 'SupplierCreate' }"><button class="base-btn">Create Supplier</button></router-link>
    </div>
    <DataTable
      :columns="columns"
      :next="next"
      :prev="prev"
      :meta="meta"
      :data="data"
      :type="type"
      :permissionsArrayNum="permissionsArrayNum"
      @handleSearch="searchSupplier"
      @handleAddProfile="addSupplierProfile"
      @handleView="viewSupplier"
      @handleEdit="editSupplier"
      @handleDelete="deleteSupplier"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" 
      @maxItemsPerPageChange="pageLimitChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import SupplierService from "@/services/SupplierService";
import { SupplierItem } from '@/types/Suppliers'
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'SupplierList',
  components: {
    DataTable
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [] as Array<SupplierItem>,
      type: "Users",
      url: '/supplierList',
      maxItemsPerPage: '' || undefined as unknown as string,
      permissionsArrayNum: 0,
      columns: [
        {
          attribute: 'id',
          name: 'id'
        },
        {
          attribute: 'Supplier ID',
          name: 'Supplier_id'
        },
        {
          attribute: 'name',
          name: 'name'
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
  methods: {
    async fetchSuppliers(): Promise<void> {
      let token = this.$store.state.bearerToken
      let url = this.url
      await SupplierService.list(url, token)
        .then((response: ResponseData) => {
          let res = response.data
          this.data = res.data
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
    async pageChange(url: string): Promise<void> {
      this.url = url
      await this.fetchSuppliers()
    },
    async pageLimitChange(limit: string): Promise<void> {
      let url = this.url
      this.maxItemsPerPage = limit
      this.url = `${url}?limit=${limit}`
      await this.fetchSuppliers()
    },
    async previousPage(): Promise<void> {
      if (this.prev !== null){
        let url = this.prev
        let limit = this.maxItemsPerPage
        this.url = `${url}&limit=${limit}`
        await this.fetchSuppliers()
      }
    },
    async nextPage(): Promise<void> {
      if (this.next !== null){
        let url = this.next
        let limit = this.maxItemsPerPage
        this.url = `${url}&limit=${limit}`
        await this.fetchSuppliers()
      }
    },
    addSupplierProfile(item: any): void {
      this.$router.push({name:'ProfileCreate', params: {id: item.id}})
    },
    viewSupplier(item: any): void {
      this.$router.push({name:'ProfileDetails', params: {id: item.id}})
    },
    editSupplier(item: any): void {
      console.log(item.id)
      this.$router.push({name:'SupplierUpdate', params: {id: item.id}})
    },
    async deleteSupplier(item: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let id = item.id
      await SupplierService.delete(id, token)
        .then((response: ResponseData) => {
          this.fetchSuppliers()
          this.$toast.open({
            message: `supplier successfully deleted.`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `Could not delete that supplier.`,
            type: "error"
          })
          console.log(e)
        });
    },
    async searchSupplier(event: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let value = event.target.value
      let url = `/supplierList/?q=${value}`

      if (value.length > 2 || value.length === 0){
        await SupplierService.list(url, token)
          .then((response: ResponseData) => {
            let res = response.data
            this.data = res.data
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
      }
    }
  },
  async mounted(): Promise<void> {
    await this.fetchSuppliers()
  },
});
</script>