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
      @handleSearch="searchUnit"
      @handleView="viewUnit"
      @handleEdit="showUnitEditModal"
      @handleDelete="showDeleteModal"
      @pageChange="pageChange" 
      @previousPage="previousPage" 
      @nextPage="nextPage" 
      @maxItemsPerPageChange="pageLimitChange" />
    <div class="hidden" :class="isCreating ? 'active' : ''">
      <UnitModalCreate @handleSave="createUnit" @close-modal="isCreating = false" />
    </div>
    <div class="hidden" :class="isEditing ? 'active' : ''">
      <UnitModalUpdate :name="selectedUnit.name" @handleSave="editUnit" @close-modal="isEditing = false" />
    </div>
    <div class="hidden" :class="isDeleting ? 'active' : ''">
      <DeleteModal :name="selectedUnit.name" @handleConfirmDelete="deleteUnit" @close-modal="isDeleting = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import UnitModalCreate from '@/components/modals/UnitModalCreate.vue'
import UnitModalUpdate from '@/components/modals/UnitModalUpdate.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import UnitService from "@/services/UnitService";
import ResponseData from "@/types/ResponseData";
import { Unit } from "@/types/Units";

export default defineComponent({
  name: 'UnitList',
  components: {
    DataTable,
    UnitModalCreate,
    UnitModalUpdate,
    DeleteModal
  },
  data() {
    return {
      next: '',
      prev: '',
      meta: {},
      data: [],
      url: '/unitList',
      maxItemsPerPage: '' || undefined as unknown as string,
      type: 'Users',
      isCreating: false,
      isEditing: false,
      isDeleting: false,
      selectedUnit: { created_at: '', id: 0, name: '', slug: '', updated_at: '' } as Unit,
      selectedUnitId: 0 as number,
      columns: [
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
            message: `Unit ${UnitName} has been successfully updated!`,
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
    showDeleteModal(item: any): any {
      this.isDeleting = true
      this.selectedUnitId = item.id
    },
    async deleteUnit(): Promise<void> {
      let token = this.$store.state.bearerToken
      let UnitId = this.selectedUnitId
      await UnitService.delete(UnitId, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Unit has been successfully deleted.`,
            type: "success"
          })
          this.isDeleting = false
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
    async searchUnit(event: any): Promise<void> {
      let token = this.$store.state.bearerToken
      let value = event.target.value
      let url = `/unitList/?q=${value}`

      if (value.length > 2 || value.length === 0){
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
      }
    },
    async pageChange(url: string): Promise<void> {
      this.url = url
      await this.fetchUnits()
    },
    async pageLimitChange(limit: string): Promise<void> {
      let url = this.url
      this.maxItemsPerPage = limit
      this.url = `${url}?limit=${limit}`
      await this.fetchUnits()
    },
    async previousPage(): Promise<void> {
      if (this.prev !== null){
        let url = this.prev
        let limit = this.maxItemsPerPage
        this.url = `${url}&limit=${limit}`
        await this.fetchUnits()
      }
    },
    async nextPage(): Promise<void> {
      if (this.next !== null){
        let url = this.next
        let limit = this.maxItemsPerPage
        this.url = `${url}&limit=${limit}`
        await this.fetchUnits()
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
  async mounted(): Promise<void> {
    await this.fetchUnits()
  },
});
</script>