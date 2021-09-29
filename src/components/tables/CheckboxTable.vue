<template>
  <div class="flex flex-col">
    <div class="py-2 align-middle inline-block w-full">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div class="flex flex-col flex-nowrap py-2 px-6 w-full mb-2">
          <label for="role-name" class="font-semibold uppercase text-gray-500 text-sm mb-1">Name of the Role</label>
          <input
            @change="$emit('handleNameChange', $event)"
            class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900"
            name="role-name"
            type="text"
            placeholder="Cashier"
            v-model="roleName" />
        </div>
        <table class="divide-y divide-gray-200 border-collapse w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
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
            <tr v-for="(item, key, i) in items" :key="i" class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td
              class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
                {{item.name}}
              </td>
              <td 
                v-for="(column, j) in allColumns" 
                :key="j" 
                :data-label="column.attribute"
                class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
                <div class="flex-shrink-0">
                  <div>
                    <input type="checkbox" v-model="item.permissions[column.attribute]" />
                    {{ item.permissions[column.attribute] }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="base-btn float-right" @click="$emit('handleSave', items)">Save</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'CheckboxTable',
  props: {
    items: {
      type: Array as any,
      required: true
    },
    columns: {
      type: Array as any,
      required: true 
    },
    name: {
      type: String as any,
      required: false
    }
  },
  data() {
    return {
      roleName: this.name
    }
  },
  watch: {
    name: function () {
      this.roleName= this.name
    }
  },
  computed: {
    allColumns(): any[] {
      return this.columns
    }
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