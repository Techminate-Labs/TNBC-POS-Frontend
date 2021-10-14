<template>
    <div class="relative h-full">
        <img 
            class="absolute object-cover h-full w-full"
            src="@/assets/guest_sidebar_bg.svg" 
            />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GuestSideBar'
});
</script>