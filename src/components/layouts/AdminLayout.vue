<template>
    <div id="admin" class="bg-gray-100">
        <TopNavigation :links="true" @toogle-sidebar="handleSidebar" @toggle-menu="openUserMenu = !openUserMenu" />
        <ProfileMenu v-show="openUserMenu" />
        <div class="flex flex-row flex-nowrap w-full min-h-screen">
            <SideBar 
                class="hidden w-1/12" 
                :menu="menu"
                :class="toogleSideBar ? 'active' : ''" 
                @open-additional-sidebar="openSubMenu"
                @close-additional-sidebar="closeSubMenu"
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

// components
import SideBar from '@/components/menus/SideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'
import ProfileMenu from "@/components/menus/ProfileMenu.vue"
import Footer from '@/components/footer/Footer.vue'
import AdditionalSideBar from '@/components/menus/AdditionalSideBar.vue'
import Breadcrumb from "@/components/Breadcrumb.vue"

// types & services
import { MenuItem } from '@/types/SideBar'
import DataService from "@/services/DataService"

// images
const dashboardIcon = require('../../assets/svgs/home.svg')
const usersIcon = require('../../assets/svgs/user.svg')
const shopIcon = require('../../assets/svgs/shop-alt.svg')
const itemIcon = require('../../assets/svgs/item.svg')
const statsUpIcon = require('../../assets/svgs/stats-up.svg')
const settingsIcon = require('../../assets/svgs/settings.svg')

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
                    icon: dashboardIcon
                },
                {
                    name: 'Users',
                    url: '/users',
                    icon: usersIcon,
                    submenus: [
                        { name: 'User List', url: '/user-list' },
                        { name: 'User Roles', url: '/roles-list' }
                    ]
                },
                {
                    name: 'Point Of Sale',
                    url: '/point-of-sale',
                    icon: shopIcon,
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
                    icon: itemIcon,
                    submenus: [
                        { name: 'Brands', url: '/brands-list' },
                        { name: 'Categories', url: '/categories-list' },
                        { name: 'Items', url: '/items-list' },
                        { name: 'Units', url: '/units-list' },
                        { name: 'Suppliers', url: '/suppliers-list' },
                    ]
                },
                {
                    name: 'Sales',
                    url: '/sales',
                    icon: statsUpIcon,
                    submenus: [
                        { name: 'Sales Reports', url: '/reports-list' },
                    ]
                },
                {
                    name: 'Configuration',
                    url: '/configuration',
                    icon: settingsIcon,
                },
            // ] as unknown as PropType<Array<MenuItem>>
            ] as any
        }
    },
    methods: {
        openSubMenu(item: MenuItem): void {
            this.openAdditionalSideBar = true
            let _singleMenu: MenuItem = item
            this.singleMenu = _singleMenu
        },
        closeSubMenu(item: MenuItem): void {
            this.openAdditionalSideBar = false
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
                .then((response) => {
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