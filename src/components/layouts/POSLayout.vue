<template>
    <div id="admin" class="bg-gray-100">
        <TopNavigation :links="true" @toogle-sidebar="handleSidebar" />
        <div class="flex flex-row flex-nowrap w-full">
            <PosSideBar
                class="hidden w-1/12" 
                :menuPOS="menuPOS"
                :menuActions="menuActions"
                :class="toogleSideBar ? 'active' : ''" 
                />
            <div class="w-9/12 flex-grow m-4" @click="openAdditionalSideBar = false">
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

// components
import PosSideBar from '@/components/menus/PosSideBar.vue'
import TopNavigation from '@/components/menus/TopNavigation.vue'
import Footer from '@/components/footer/Footer.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import Breadcrumb from "@/components/Breadcrumb.vue"

// services
import DataService from "@/services/DataService";

// type
import { MenuItem } from '@/types/SideBar'
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: 'POSLayout',
    components: {
        PosSideBar,
        TopNavigation,
        LogoIcon,
        Footer,
        Breadcrumb
    },
    data() {
        return {
            toogleSideBar: true as boolean,
            openAdditionalSideBar: false as boolean,
            singleMenu: null || {},
            menuPOS: [
                {
                    name: 'Point of Sale',
                    url: '/point-of-sale/point-of-sale',
                },
                {
                    name: 'Customers',
                    url: '/point-of-sale/customers-list',
                },
                {
                    name: 'Coupons',
                    url: '/point-of-sale/coupons-list',
                },
                {
                    name: 'Invoices',
                    url: '/point-of-sale/invoices-list',
                },
            ] as any,
            menuActions: [
                {
                    name: 'Log Out'
                },
            ]
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
                        message: `There was an issue sending that email.`,
                        type: "success"
                    })
                    console.log(e)
                });
        }
    },
    computed: {
        isEmailVerified() {
            return this.$store.state.user.isEmailVerified
        }
    }
});
</script>