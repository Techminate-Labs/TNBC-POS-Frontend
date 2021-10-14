<template>
    <div class="bg-gray-800 p-6">
        <p class="text-white font-bold text-right">
            Made with ❤ by 
            <a 
                href="https://github.com/Techminate/" 
                target="_blank" 
                rel="noreferrer noopener"
                class="hover:text-red-500">
                Techminate
            </a>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Footer'
});
</script>