<template>
    <div id="minimal-layout" class="flex flex-col flex-nowrap h-screen">
		<div class="my-16 self-center w-5/6 mx-auto md:w-4/6 lg:w-3/6">
			<router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MinimalLayout',
});
</script>