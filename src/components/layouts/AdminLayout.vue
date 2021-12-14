<template>
    <div id="admin" class="bg-gray-100">
        <TopNavigation :links="true" @toogle-sidebar="handleSidebar" @toggle-menu="openUserMenu = !openUserMenu" />
        <ProfileMenu v-show="openUserMenu" />
        <div class="flex flex-row flex-nowrap w-full min-h-screen">
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
            <div class="w-9/12 flex-grow p-12" @click="handleCloseMenus">
                <div class="bg-red-300 text-wite w-full py-2 px-8 text-lg" v-if="!isEmailVerified">
                    <p>Your account has not been verified ! Please <button @click="requestEmailVerification" class="underline">send a verification email to your inbox.</button></p>
                </div>
                <Breadcrumb :key="$route.path" />
                <router-view />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MenuItem } from '@/types/SideBar'
import SideBar from '@/components/menus/SideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'
import ProfileMenu from "@/components/menus/ProfileMenu.vue"
import Footer from '@/components/footer/Footer.vue'
import AdditionalSideBar from '@/components/menus/AdditionalSideBar.vue'
import Breadcrumb from "@/components/Breadcrumb.vue"
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: 'AdminLayout',
    components: {
        SideBar,
        TopNavigation,
        AdditionalSideBar,
        Footer,
        Breadcrumb,
        ProfileMenu
    },
    data() {
        return {
            toogleSideBar: true as boolean,
            openAdditionalSideBar: false as boolean,
            openUserMenu: false as boolean,
            singleMenu: null || {},
            menu: [
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/template.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL3RlbXBsYXRlLnN2ZyIsImlhdCI6MTYzMDA4ODE0OCwiZXhwIjoxOTQ1NDQ4MTQ4fQ.ckxC-UTfEFea7cgTGwgWuLKqBdegqrfvMMrZonZFAD4'
                },
                {
                    name: 'Users',
                    url: '/users',
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
                        { name: 'Point of Sale', url: '/point-of-sale' },
                        { name: 'Invoices List', url: '/invoices-list' },
                        { name: 'Customers', url: '/customers-list' },
                        { name: 'Coupons', url: '/coupons-list' },
                    ]
                },
                {
                    name: 'Items',
                    url: '/items',
                    icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/cube.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2N1YmUuc3ZnIiwiaWF0IjoxNjMwMDg4MTgwLCJleHAiOjE5NDU0NDgxODB9.JRZOQzJubHaMcKDm5Gg2lZQkwdamuI729l11pGJEUP8',
                    submenus: [
                        { name: 'Brands', url: '/brands-list' },
                        { name: 'Categories', url: '/categories-list' },
                        { name: 'Items', url: '/items-list' },
                        { name: 'Units', url: '/units-list' },
                        { name: 'Suppliers', url: '/suppliers-list' },
                        { name: 'Barcodes', url: '/barcode-list' },
                    ]
                },
                {
                    name: 'Sales',
                    url: '/sales',
                    icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/document-text.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2RvY3VtZW50LXRleHQuc3ZnIiwiaWF0IjoxNjMwMDg4MzEwLCJleHAiOjE5NDU0NDgzMTB9.YMblc4CxvBKs-mjUo7-ZLofMhZo6YlQ8JSDflk6niEc',
                    submenus: [
                        { name: 'Sales Reports', url: '/reports-list' },
                    ]
                },
                {
                    name: 'Configuration',
                    url: '/configuration',
                    icon: 'https://epqrpjmozlcsvbgkxjkp.supabase.in/storage/v1/object/sign/tnbc-pos/svgs/adjustments.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0bmJjLXBvcy9zdmdzL2FkanVzdG1lbnRzLnN2ZyIsImlhdCI6MTYzMDA4ODM0NiwiZXhwIjoxOTQ1NDQ4MzQ2fQ.z4IZrOKkDsVWQAicUSg3ytrqSaOaJFuwPSn7cIRQtsg',
                },
            // ] as unknown as PropType<Array<MenuItem>>
            ] as any
        }
    },
    methods: {
        handleSubMenus(item: MenuItem): void {
            this.openAdditionalSideBar = true
            let _singleMenu: MenuItem = item
            this.singleMenu = _singleMenu
        },
        handleCloseMenus(): void {
            this.openUserMenu = false
            this.openAdditionalSideBar = false
        },
        handleSidebar(): void {
            this.toogleSideBar = !this.toogleSideBar
            this.openAdditionalSideBar = false
        },
        closeAdditionalSidebar(): void {
            this.openAdditionalSideBar = false
        },
        requestEmailVerification(): void {
            let token = this.$store.state.session.bearerToken
            let data: any = []
            DataService.requestEmailVerification(data, token)
                .then((response: ResponseData) => {
                    if (response.data.message === "Already Verified"){
                        this.$store.dispatch('setEmailVerification', true)
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
        isEmailVerified(): boolean {
            return this.$store.state.user.isEmailVerified
        }
    }
});
</script>