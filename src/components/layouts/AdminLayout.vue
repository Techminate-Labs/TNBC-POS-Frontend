<template>
  <div id="admin" class="bg-gray-100">
    <TopNavigation :links="true" @toogle-sidebar="handleSidebar" />
      <div class="flex flex-row flex-nowrap w-full">
        <SideBar 
          class="hidden w-1/12" 
          :menu="menu"
          :class="toogleSideBar ? 'active' : ''" 
          @open-additional-sidebar="handleSubMenus"
        />
        <AdditionalSideBar
          class="hidden w-2/12"
          :singleMenu="singleMenu"
          @close-additional-sidebar="closeAdditionalSidebar"
          :class="openAdditionalSideBar ? 'active' : ''" 
        />
        <div class="w-9/12 flex-grow overflow-x-hidden" @click="openAdditionalSideBar = false">
          <div class="bg-red-300 text-wite w-full py-2 px-8 text-lg" v-if="!isEmailVerified">
            <p>Your account has not been verified ! Please <button @click="requestEmailVerification" class="underline">send a verification email to your inbox.</button></p>
          </div>
          <router-view />
        </div>
      </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MenuItem, SubMenuItem } from '@/types/SideBar'
import SideBar from '@/components/menus/SideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'
import Footer from '@/components/footer/Footer.vue'
import AdditionalSideBar from '@/components/menus/AdditionalSideBar.vue'
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'AdminLayout',
  components: {
    SideBar,
    TopNavigation,
    AdditionalSideBar,
    Footer
  },
  data() {
    return {
      toogleSideBar: true as boolean,
      openAdditionalSideBar: false as boolean,
      singleMenu: null || {},
      menu: [
        {
          name: 'Dashboard',
          url: '/dashboard',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/template.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL3RlbXBsYXRlLnN2ZyIsImlhdCI6MTYzMDA4ODE0OCwiZXhwIjoxOTQ1NDQ4MTQ4fQ.ckxC-UTfEFea7cgTGwgWuLKqBdegqrfvMMrZonZFAD4'
        },
        {
          name: 'User Management',
          url: '/user-management',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/user-group.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL3VzZXItZ3JvdXAuc3ZnIiwiaWF0IjoxNjMwMDg4MTQ4LCJleHAiOjE5NDU0NDgxNDh9.fWSpfP7uIO-dDyP8ILCfNtgCLRmBLfPSEbUxHAysVfA',
          submenus: [
            { name: 'User List', url: '/user-list' },
            { name: 'User Roles', url: '/roles-list' }
          ]
        },
        {
          name: 'Point Of Sale',
          url: '/point-of-sale',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/cash.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2Nhc2guc3ZnIiwiaWF0IjoxNjMwMDg4MTYzLCJleHAiOjE5NDU0NDgxNjN9.-N6SSb5frPDmWHStJ27gyjjpW8Yt597X8D8Qh8NGM0Y',
          submenus: [
            { name: 'Launch POS', url: '/launch-pos' },
            { name: 'Customer List', url: '/customer-list' },
            { name: 'Coupon', url: '/coupon-list' }
          ]
        },
        {
          name: 'Products',
          url: '/products',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/cube.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2N1YmUuc3ZnIiwiaWF0IjoxNjMwMDg4MTgwLCJleHAiOjE5NDU0NDgxODB9.JRZOQzJubHaMcKDm5Gg2lZQkwdamuI729l11pGJEUP8',
          submenus: [
            { name: 'Brands', url: '/brands-list' },
            { name: 'Categories', url: '/categories-list' },
            { name: 'Products', url: '/products-list' },
            { name: 'Suppliers', url: '/suppliers-list' },
            { name: 'Units', url: '/units-list' },
          ]
        },
        {
          name: 'Sales Invoices',
          url: '/sales-invoices',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/document-text.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2RvY3VtZW50LXRleHQuc3ZnIiwiaWF0IjoxNjMwMDg4MzEwLCJleHAiOjE5NDU0NDgzMTB9.YMblc4CxvBKs-mjUo7-ZLofMhZo6YlQ8JSDflk6niEc',
          submenus: [
            { name: 'Sales Records', url: '/sales-records' },
            { name: 'Sold Items', url: '/sold-items' },
          ]
        },
        {
          name: 'Sales Report',
          url: '/sales-report',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/document-report.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2RvY3VtZW50LXJlcG9ydC5zdmciLCJpYXQiOjE2MzAwODgzMjIsImV4cCI6MTk0NTQ0ODMyMn0.f4dxQvGbpozJKdXPHPa_mxDODTLXnfya8rB0np-VgfM',
          submenus: [
            { name: 'Sales with TNBC', url: '/sales-with-tnbc' },
            { name: 'Sales with FIAT', url: '/sales-with-fiat' },
          ]
        },
        {
          name: 'Settings',
          url: '/settings',
          icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/adjustments.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2FkanVzdG1lbnRzLnN2ZyIsImlhdCI6MTYzMDA4ODM0NiwiZXhwIjoxOTQ1NDQ4MzQ2fQ.z4IZrOKkDsVWQAicUSg3ytrqSaOaJFuwPSn7cIRQtsg',
          submenus: [
            { name: 'General Settings', url: '#' }
          ]
        },
      // ] as unknown as PropType<Array<MenuItem>>
      ] as any
    }
  },
  methods: {
    handleSubMenus(item: MenuItem){
      this.openAdditionalSideBar = true
      let _singleMenu: MenuItem = item
      this.singleMenu = _singleMenu
    },
    handleSidebar(){
      this.toogleSideBar = !this.toogleSideBar
      this.openAdditionalSideBar = false
    },
    closeAdditionalSidebar(){
      this.openAdditionalSideBar = false
    },
    requestEmailVerification():void {
      let data: any = []
      let token = this.$store.state.bearerToken
      DataService.requestEmailVerification(data, token)
        .then((response: ResponseData) => {
          console.log(response.data)
          if (response.data.message === "Already Verified"){
            this.$store.commit('setEmailVerification', true)
            this.$toast.open({
              message: `Your email has already been verified!`,
              type: "info"
            })
          } else {
            this.$toast.open({
              message: `We just sent an email to your email address`,
              type: "success"
            })
          }
          })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an iossue sending that email.`,
            type: "success"
          })
          console.log(e)
        });
    }
  },
  computed: {
    isEmailVerified() {
      return this.$store.state.isEmailVerified
    }
  }
});
</script>