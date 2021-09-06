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
    <RoleTable :items="items" :columns="columns" @reload-this="reloadComponent"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RoleTable from '@/components/tables/RoleTable.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";
import formatDateMixin from '@/mixins/formatDateMixin.ts';

export default defineComponent({
  name: 'RolesList',
  components: {
    RoleTable
  },
  data() {
    return {
      items: [],
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
          let _roles: any = []
          const _ = response.data.roles.map((role: any) => {
            var _formated_created_date = this.formatDate(new Date(role.created_at))
            var _formated_updated_date = this.formatDate(new Date(role.updated_at))
            _roles.push(
              {
                id: role.id,
                name: role.name,
                created_at: _formated_created_date,
                updated_at: _formated_updated_date
              }
            )
            this.items = _roles
          })
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    reloadComponent(): void {
      this.fetchRoles()
    }
  },
  computed: {
    canUserCreate():boolean {
      return this.$store.state.permissions[1]["Roles"].create
    }
  },
  async mounted() {
    this.fetchRoles()
  },
});
</script>