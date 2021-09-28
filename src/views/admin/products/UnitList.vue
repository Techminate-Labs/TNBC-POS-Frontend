<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Unit List</p>
      <button @click="showUnitCreateModal" class="base-btn">Create Unit</button>
    </div>
    <DataTable 
      :columns="columns"
      :data="data"
      :meta="meta"
      :next="next"
      :prev="prev"
      :type="type"
      :permissionsArrayNum="permissionsArrayNum"
      @handleView="viewUnit"
      @handleEdit="showUnitEditModal"
      @handleDelete="deleteUnit"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" />
    <div class="hidden" :class="isCreating ? 'active' : ''">
      <UnitModalCreate @handleSave="createUnit" @close-modal="isCreating = false" />
    </div>
    <div class="hidden" :class="isEditing ? 'active' : ''">
      <UnitModalUpdate :name="selectedUnit.name" @handleSave="editUnit" @close-modal="isEditing = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import UnitModalCreate from '@/components/modals/UnitModalCreate.vue'
import UnitModalUpdate from '@/components/modals/UnitModalUpdate.vue'
import UnitService from "@/services/UnitService";
import ResponseData from "@/types/ResponseData";
import { UnitItem } from "@/types/UnitTables";

export default defineComponent({
  name: 'UnitList',
  components: {
    DataTable,
    UnitModalCreate,
    UnitModalUpdate
  },
  data() {
    return {
      items: [],
      next: '',
      prev: '',
      meta: {},
      data: [],
      url: '/unitList',
      type: 'Users',
      permissionsArrayNum: 0,
      isCreating: false,
      isEditing: false,
      selectedUnit: {} as UnitItem,
      columns: [
        {
          attribute: 'id',
          name: 'id'
        },
        {
          attribute: 'User ID',
          name: 'user_id'
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
async fetchUnits(): Promise<void> {
      let token = this.$store.state.bearerToken
      let url = this.url
      await UnitService.list(url, token)
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
    showUnitCreateModal(): void {
      this.isCreating = true
    },
    showUnitEditModal(item: any): void {
      this.selectedUnit = item
      this.isEditing = true
    },
    viewUnit(): void {},
    async editUnit(UnitName: string): Promise<void> {
      let token = this.$store.state.bearerToken
      let data = { name: UnitName }
      let UnitId = this.selectedUnit.id
      await UnitService.edit(data, UnitId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Unit ${UnitName} has been successfully created!`,
            type: "success"
          })
          this.isEditing = false
          this.fetchUnits()
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that category.`,
            type: "error"
          })
          console.log(e)
        });
    },
    async deleteUnit(item: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let UnitId = item.id
      await UnitService.delete(UnitId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Unit has been successfully deleted.`,
            type: "success"
          })
          this.isEditing = false
          this.fetchUnits()
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that Unit.`,
            type: "error"
          })
          console.log(e)
        });
    },
    pageChange(url: string):void {
      this.url = url
      this.fetchUnits()
    },
    previousPage():void {
      if (this.prev !== null){
        this.url = this.prev
        this.fetchUnits()
      }
    },
    nextPage(): void {
      if (this.next !== null){
        this.url = this.next
        this.fetchUnits()
      }
    },
    async createUnit(name: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let data = { name: name }
      await UnitService.create(data, token)
        .then((response: ResponseData) => {
          this.isCreating = false
          this.fetchUnits()
          this.$toast.open({
            message: `Unit ${name} has been successfully created!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error creating that Unit.`,
            type: "error"
          })
          console.log(e)
        });
    }
  },
  async mounted() {
    this.fetchUnits()
  },
});
</script>