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
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, key, i) in sortedItems" :key="i" class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td>{{item.name}}</td>
              <td 
                v-for="(textColumn, j) in textColumns" 
                :key="j" 
                :data-label="textColumn.attribute"
                class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
                <div class="flex-shrink-0">
                  <div>
                    <input type="checkbox" v-model="item.permissions[textColumn.attribute]" />
                    {{ item.permissions[textColumn.attribute] }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CheckboxTableColumns, CheckboxTableItems } from '@/types/CheckboxTable'

export default defineComponent({
  name: 'CheckboxTable',
  props: {
    items: {
      type: Array as PropType<Array<CheckboxTableItems>>,
      required: true
    },
    columns: {
      type:  Array as PropType<Array<CheckboxTableColumns>>,
      required: true 
    }
  },
  data() {
    return {
      prevPage: null as null | number,
      nextPage: null as null | number,
      currentPage: null as null | number,
      pageNumbers: [] as number[],
      pageNumberCount: 1 as number,
      totalItems: this.items.length as number,
      maxItemsPerPage: 5 as number,
      lastPage: Math.ceil((this.totalItems as unknown as number) / (this.maxItemsPerPage as unknown as number)) as number,
      notEnoughPages: true as boolean,
      currentSort: 'id' as string,
      currentSortDir: 'asc' as string,
      activeItem: null as null | number
    }
  },
  methods: {
    onChange(): void {
      this.sortedItems
      this.displayPages
    },
    changeItemsInPage(num: number): void {
    this.currentPage = num
    this.activeItem = num
    },
    changeToPreviousPage(): void {
      if (this.currentPage && this.activeItem)
        if (this.currentPage > 1) {
          this.currentPage -= 1
          this.activeItem -= 1
        } else {
          this.currentPage = 1
          this.activeItem = 1
        }
    },
    changeToNextPage(): void {
      if (this.currentPage && this.activeItem)
        if (this.currentPage < this.lastPage) {
          this.currentPage += 1
          this.activeItem += 1
        } else {
          this.currentPage = this.lastPage
          this.activeItem = this.lastPage
        }
    },
    sort(s: string): void {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
  },
  computed: {
    displayPages() {
      this.lastPage = Math.ceil(this.totalItems / this.maxItemsPerPage)
      const totalPages = this.lastPage;
      let currentPage: any = this.currentPage;

      if ([1, 2, 3, 4].includes(currentPage)) currentPage = 3;
      else if ([totalPages - 1, totalPages].includes(currentPage)) currentPage = Math.max(0, totalPages - Math.trunc(5 / 2));
      if (totalPages < 5){
        return [...Array(totalPages).keys()].map(i => Math.max(0, i - Math.trunc(5 / 2) + currentPage))
      } else {
        return [...Array(5).keys()].map(i => Math.max(0, i - Math.trunc(5 / 2) + currentPage))
      }
    },
    sortedItems(): any[] {
      return this.items.sort((a: any, b: any) => {
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
    imageColumn(): any[] {
      return this.columns.filter((c: any) => c.attribute === 'image' )
    }
  },
  mounted () {
    this.currentPage = 1
    this.activeItem = 1
  }
});
</script>
<style scoped>
.current {
  @apply z-10 bg-blue-500 text-white;
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