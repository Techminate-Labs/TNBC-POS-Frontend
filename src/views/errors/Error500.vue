<template>
    <div class="text-center">
        <h1 class="my-2 text-8xl">500</h1>
        <h2 class="my-2 text-2xl text-blue-800">Internal Server Error</h2>
        <p class="my-4 text-lg text-gray-500">Try to refresh this page or feel free to contact us if the problem persists.</p>
        <button class="base-btn uppercase" @click="$router.go(-1)" @keyup.delete="$router.go(-1)">Go Back</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Error500'
});
</script>