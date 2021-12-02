<template>
    <nav class="h-16 flex px-8 shadow-md relative z-30 bg-white">
        <div v-show="links" class="self-center flex flex-nowrap justify-between w-full">
            <!-- Menu Icon -->
            <div class="flex">
                <MenuIcon @click="$emit('toogleSidebar')" class="cursor-pointer w-8 h-8 self-center" />
                <router-link :to="{ name: 'Dashboard' }">
                    <LogoIcon class="w-20 h-20 ml-4" />
                </router-link>
            </div>
            <NavigationLinks @toggle-user-menu="$emit('toggleMenu')" />
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationLinks from '@/components/menus/NavigationLinks.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'

export default defineComponent({
    name: 'AdminLayout',
    components: {
        NavigationLinks,
        LogoIcon,
        MenuIcon
    },
    props: {
        links: {
            type: Boolean,
            required: false
        }
    }
});
</script>