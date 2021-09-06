<template>
  <div class="flex flex-col">
    <div class="py-2 align-middle inline-block w-full">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RoleTableColumns, RoleTableItems } from '@/types/RoleTables'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'RoleUpdateTable',
  props: {
    items: {
      type: Array as PropType<Array<RoleTableColumns>>,
      required: true
    },
    columns: {
      // type: Array as PropType<Array<CheckboxTableColumns>>,
      type: Array as any,
      required: true 
    },
    name: {
      type: String,
      required: true 
    }
  },
  methods: {
    updateRole(): void {
      console.log('update role clicked!')
      let token = this.$store.state.bearerToken
      let _permissions: any = []
      this.items.map((item: any) => {
        let name = item.name

        _permissions.push({
          [item.name]: item.permissions
        })
      })
      let role_id: number = parseInt(this.$route.params.id as string)
      let data = {
        name: this.name,
        permissions: _permissions
      }
      DataService.updateRole(data as any, role_id as number, token as any)
        .then((response: ResponseData) => {
            this.$toast.open({
              message: `${this.name} has been successfully updated!`,
              type: "success"
            })
          })
        .catch((e: Error) => {
          this.$toast.open({
            message: `Could not update that role.`,
            type: "error"
          })
          console.log(e)
        });
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