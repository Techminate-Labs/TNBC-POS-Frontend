<template>
    <div class="overflow-hidden">
        <div class="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-1/2 z-40 p-10 bg-white rounded-lg shadow-lg">
            <button @click="$emit('close-modal')" class="float-right hover:text-red-600">
                <CancelIcon class="w-8 h-8" />
            </button>
            <h2 class="display-h2">Create a new unit</h2>
            <div class="flex flex-col py-2">
                <label class="label" for="name">Name:</label>
                <input
                    class="text-input" 
                    type="text" 
                    id="name" 
                    v-model="name" 
                    placeholder="6 pcs"
                    />
            </div>
            <div class="float-right">
                <button 
                    @click="$emit('close-modal')" 
                    class="base-btn-cancel-outline border-2 border-red-800 hover:border-red-700 mr-4">
                    Cancel
                </button>
                <button class="base-btn" @click="$emit('handleSave', name)">Save</button>
            </div>
        </div>
        <div class="bg-gray-800 h-screen w-full opacity-90 z-30 fixed top-0 left-0"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CancelIcon from '@/components/icons/CancelIcon.vue'

export default defineComponent({
    name: 'UnitModalCreate',
    components: { CancelIcon },
    data() {
        return {
            name: ''
        }
    }

})
</script>