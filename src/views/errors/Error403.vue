<template>
    <div class="text-center">
        <h1 class="my-2 text-8xl">403</h1>
        <h2 class="my-2 text-2xl text-blue-800">Forbidden</h2>
        <p class="my-4 text-lg text-gray-500">Access to this ressource on the system has been denied.</p>
        <button class="base-btn uppercase" @click="$router.go(-1)" @keyup.delete="$router.go(-1)">Go Back</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Error403'
});
</script>