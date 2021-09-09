<template>
  <div class="flex flex-col">
    <div class="py-2 align-middle inline-block w-full">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="divide-y divide-gray-200 border-collapse w-full">
          <thead class="bg-gray-50">
            <tr>
              <th 
                @click="sort(column.attribute)" 
                v-for="(column, index) in columns" 
                :key="index" 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ column.name }}
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, i) in sortedItems" :key="i" class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td 
                v-for="(textColumn, j) in textColumns" 
                :key="j" 
                :data-label="textColumn.attribute"
                class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
                <div class="flex-shrink-0">
                  {{ item[textColumn.attribute] }}
                </div>
              </td>
              <td 
                data-label="Action"
                class="w-full lg:w-auto px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <router-link
                  :to="{ name: routerComponent.create, params: { id: item.id } }"
                  class="text-indigo-600 hover:text-indigo-900 mr-2">
                    Add profile
                </router-link>
                <router-link 
                  v-show="canUserEdit"
                  :to="{ name: routerComponent.edit, params: { id: item.id } }" 
                  class="text-indigo-600 hover:text-indigo-900 mr-2">
                    Edit
                </router-link>
                <router-link 
                  v-show="canUserView"
                  :to="{ name: routerComponent.view, params: { id: item.id } }" 
                  class="text-indigo-600 hover:text-indigo-900 mr-2">
                    View
                </router-link>
                <button 
                  v-show="canUserDelete"
                  @click="handleDelete(item.id)" 
                  class="text-indigo-600 hover:text-indigo-900 mr-2">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between md:justify-end">
            <div class="md:mr-6">
              <p class="text-sm text-gray-700">
                Showing
                <span v-show="meta.current_page === 1" class="font-medium">{{ meta.current_page }}</span>
                <span v-show="meta.current_page === meta.last_page" class="font-medium">{{ meta.total }}</span>
                out of
                <span class="font-medium">{{ meta.total }}</span>
                results
              </p>
            </div>
            <div class="md:mr-6 text-sm text-gray-700">
            Show 
            <select 
              @change="onChange"
              class="border-2 p-2 rounded-lg">
              <option selected>{{ meta.per_page }}</option>
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
              Items
            </div>
            <nav class="relative z-0 inline-flex" aria-label="Pagination">
              <a
                @click="changeToPreviousPage"
                href="#"
                :class="prev === null ? 'disabled' : ''"
                class="relative inline-flex items-center mr-2 px-2 py-2 rounded-full bg-white text-sm font-medium text-gray-500 shadow-md hover:bg-gray-50">
                <span>
                <!-- chevron-left -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </a>
              <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
              <a 
                @click="handlePageChange(item.url)"
                v-for="(item, index) in displayPagination" 
                :key="index" href="#" 
                :class="item.active === true ? 'current' : ''"
                class="bg-white mx-2 shadow-md text-gray-500 hover:bg-gray-50 relative inline-flex items-center justify-center h-4 w-4 px-4 py-4 text-sm font-medium rounded-full">
                {{ item.label }}
              </a>
              <a
                @click="changeToNextPage"
                href="#"
                :class="next === null ? 'disabled' : ''"
                class="relative inline-flex items-center ml-2 px-2 py-2 rounded-full bg-white text-sm font-medium text-gray-500 shadow-md hover:bg-gray-50">
                <span>
                <!-- chevron-right -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MetaPagination, MetaPaginationLinks } from '@/types/TablePagination'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'UserTable',
  props: {
    columns: {
      type: Array as any,
      required: true
    },
    next: {
      type: null,
      required: true
    },
    prev: {
      type: null,
      required: true
    },
    data: {
      type: Array as any,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    meta: {
      type: Object as PropType<MetaPagination>,
      required: true
    },
    routerComponent: {
      type: Object as any,
      required: true
    },
  },
  data() {
    return {
      currentSort: 'id' as string,
      currentSortDir: 'asc' as string,
    }
  },
  methods: {
    onChange(): void {
      // this.sortedItems
      // this.itemsInPage
    },
    handlePageChange(url: string): void {
      this.$emit('pageChange', url as string)
    },
    changeToPreviousPage(): void {
      this.$emit('previousPage')
    },
    changeToNextPage(): void {
      this.$emit('nextPage')
    },
    sort(s: string): void {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    handleDelete(id: string){  
      this.$emit('deleteItem', parseInt(id as string))
    }
  },
  computed: {
    displayPagination() {
      return this.meta.links
    },
    itemsInPage(): any[] {
      return this.data
    },
    sortedItems(): any[] {
      return this.itemsInPage.sort((a: any, b: any) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    textColumns(): any[] {
      return this.columns.filter((c: any) => c.attribute !== 'image' )
    },
    canUserEdit():boolean {
      return this.$store.state.permissions[0][this.type].edit
    },
    canUserView():boolean {
      return this.$store.state.permissions[0][this.type].view
    },
    canUserDelete():boolean {
      return this.$store.state.permissions[0][this.type].delete
    },
  }
});
</script>
<style scoped>
.current {
  @apply z-10 bg-blue-500 text-white hover:bg-blue-500;
}
.disabled {
  @apply hover:bg-white cursor-not-allowed text-gray-200 shadow-none
}
@media (max-width: 1024px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
    
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
</style>