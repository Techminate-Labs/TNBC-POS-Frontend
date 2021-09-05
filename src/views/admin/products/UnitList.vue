<template>
  <div class="flex-grow px-4 md:px-8 my-10">
    <p>Breadcrumb</p>
    <div class="flex flex-nowrap justify-between">
      <p class="text-2xl mb-4">Unit List</p>
      <button @click="handleUnitCreate" class="base-btn">Create Unit</button>
    </div>
    <SupplierTable :items="items" :columns="columns" @reload-this="reloadComponent" />
    <div class="hidden" :class="isModalOn ? 'active' : ''">
      <UnitModalCreate @close-modal="isModalOn = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SupplierTable from '@/components/tables/SupplierTable.vue'
import UnitModalCreate from '@/components/modals/UnitModalCreate.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";
import formatDateMixin from '@/mixins/formatDateMixin.ts';

export default defineComponent({
  name: 'UnitList',
  components: {
    SupplierTable,
    UnitModalCreate
  },
  data() {
    return {
      items: [],
      isModalOn: false as boolean,
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
  mixins: [formatDateMixin],
  methods: {
    fetchUsers(): void {
      let token = this.$store.state.bearerToken
      DataService.listUsers(token)
        .then((response: ResponseData) => {
            let _users: any = []
            const _ = response.data.users.map((user: any) => {
              let _formated_created_date = null
              if (user.created_at !== null)
                _formated_created_date = this.formatDate(new Date(user.created_at))
              let _formated_updated_date = null
              if (user.updated_at !== null)
                _formated_updated_date = this.formatDate(new Date(user.updated_at))
              let _formated_verified_date = null
              if (user.email_verified_at !== null)
                _formated_verified_date = this.formatDate(new Date(user.email_verified_at))
              
              _users.push(
                {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role.name,
                  created_at: _formated_created_date,
                  email_verified_at: _formated_verified_date,
                  updated_at: _formated_updated_date
                }
              )
              this.items = _users
            })
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    reloadComponent():void {
      this.fetchUsers()
    },
    handleUnitCreate():void {
      console.log('create unit')
      this.isModalOn = true
    }
  },
  async mounted() {
    this.fetchUsers()
  },
});
</script>