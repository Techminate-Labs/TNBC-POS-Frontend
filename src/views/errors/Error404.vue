<template>
    <div class="text-center">
        <h1 class="text-6xl">404</h1>
        <h2 class="text-xl uppercase text-blue-800">Page Not Found</h2>
        <p class="my-2 text-gray-500">The page you're looking wasn't found.</p>
        <button class="base-btn uppercase" @click="$router.go(-1)">Go Back</button>
        <input type="hidden"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Error404'

});
</script>