<template>
    <div class="overflow-hidden">
        <div class="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-40 p-8 bg-white rounded-lg shadow-lg">
            <button @click="$emit('close-modal')" class="float-right hover:text-red-900">
                <CancelIcon class="w-8 h-8" />
            </button>
            <p class="display-h1 font-bold text-red-800">Warning!</p>
            <p class="display-h3">Are you sure? That action cannot be reversed.</p>
            <div class="flex justify-end mt-4">
                <button class="base-btn-cancel border-2 ml-2" @click="$emit('handleConfirmDelete')">Delete</button>
            </div>
        </div>
        <div @click="$emit('close-modal')" class="bg-gray-800 h-screen w-full opacity-90 z-30 fixed top-0 left-0 cursor-pointer"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CancelIcon from '@/components/icons/CancelIcon.vue'

export default defineComponent({
    name: 'DeleteModal',
    components: { CancelIcon }
})
</script>