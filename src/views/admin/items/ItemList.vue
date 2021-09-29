<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Items List</p>
      <router-link :to="{ name: 'ItemCreate' }"><button
        class="base-btn">
          Create Item
      </button></router-link>
    </div>
    <DataTable
      :columns="columns"
      :next="next"
      :prev="prev"
      :meta="meta"
      :data="data"
      :type="type"
      :permissionsArrayNum="permissionsArrayNum"
      @handleAddProfile="addItemProfile"
      @handleView="viewItem"
      @handleEdit="editItem"
      @handleDelete="deleteItem"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import ItemService from "@/services/ItemService";
import { ItemsItem } from '@/types/Items'
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ItemList',
  components: {
    DataTable
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [] as Array<ItemsItem>,
      type: "Users",
      url: '/itemList',
      permissionsArrayNum: 0,
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
    async fetchItems(): Promise<void> {
      let token = this.$store.state.bearerToken
      let url = this.url
      await ItemService.list(url, token)
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
    pageChange(url: string):void {
      this.url = url
      this.fetchItems()
    },
    previousPage():void {
      if (this.prev !== null){
        this.url = this.prev
        this.fetchItems()
      }
    },
    nextPage(): void {
      if (this.next !== null){
        this.url = this.next
        this.fetchItems()
      }
    },
    addItemProfile(item: any): void {
      this.$router.push({name:'ProfileCreate', params: {id: item.id}})
    },
    viewItem(item: any): void {
      console.log(item)
      this.$router.push({name:'ItemDetails', params: {id: item.item_id}})
    },
    editItem(item: any): void {
      console.log(item.id)
      this.$router.push({name:'ItemUpdate', params: {id: item.item_id}})
    },
    async deleteItem(item: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let id = item.item_id
      await ItemService.delete(id, token)
        .then((response: ResponseData) => {
          this.fetchItems()
          this.$toast.open({
            message: `${item.name} successfully deleted.`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `Could not delete that item.`,
            type: "error"
          })
          console.log(e)
        });
    }
  },
  async mounted() {
    this.fetchItems()
  },
});
</script>