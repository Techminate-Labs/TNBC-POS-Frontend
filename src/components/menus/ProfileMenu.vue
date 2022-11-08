<template>
	<div class="absolute top-16 z-30 right-16 border-t-2 border-blue-900 bg-white p-4 shadow-md">
		<ul class="flex flex-col flex-nowrap">
			<router-link :to="{ name: 'ProfileSettings', params: { user_id: getUserId } }" class="nav-link">Profile Settings</router-link>
			<router-link :to="{ name: 'Configuration' }" class="nav-link">Site Configuration</router-link>
			<router-link :to="{ name: 'ActivityLog' }" class="nav-link">Activity Log</router-link>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ProfileMenu',
	computed: {
		getUserId(): number {
			return this.$store.state.user.userId
		} 
	}
})
</script>
