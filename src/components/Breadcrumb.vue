<template>
    <div class="flex flex-row flew-nowrap text-lg mb-4">
        <router-link :to="{ name: 'Dashboard' }" class="self-center">
            <HomeIcon class="w-4 h-4 text-gray-700 hover:text-gray-400 cursor-pointer" />
        </router-link>
        <router-link v-for="(link, index) in links" :key="index" :to="link.path">
            <span class="text-gray-700 hover:text-gray-400 ml-2 flex flex-row flew-nowrap">
                <span class="mr-2 self-center">
                    <ArrowNarrowRightIcon class="h-5 w-5" />
                </span>
                {{ link.name }}
            </span>
        </router-link>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HomeIcon from '@/components/icons/HomeIcon.vue'
import ArrowNarrowRightIcon from '@/components/icons/ArrowNarrowRightIcon.vue'

export default defineComponent({
    name: 'Breadcrumb',
    components: { HomeIcon, ArrowNarrowRightIcon },
    data() {
        return {
            links: [] as Array<Object>
        }
    },
    methods: {
        populateLinks(): void {
            this.links = this.$route.matched
        }
    },
    updated(){
        this.populateLinks()
    },
    mounted() {
        this.populateLinks()
    }
})
</script>