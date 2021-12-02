<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">User Profile</h1>
			<button 
				@click="$router.push({name: 'UserList'})" 
				class="base-btn-outline float-right">
				Back
			</button>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md">
			<div 
				v-if="!profile.first_name" 
				class="text-xl text-gray-700">
				This user doesn't have any profile
			</div>
			<div
				v-else class="grid grid-cols-3 gap-4">
				<div class="col-span-1 col-start-1">
					<div class="mb-6">
						<h3 class="label">First Name</h3>
						<p class="field-display">{{ profile.first_name }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Email</h3>
						<p class="field-display">{{ profile.email }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Present Address</h3>
						<p class="field-display">{{ profile.present_address }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">City</h3>
						<p class="field-display">{{ profile.city }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Identification Number</h3>
						<p class="field-display">{{ profile.identity_number }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Updated On</h3>
						<p class="field-display">{{ profile.updated_at }}</p>
					</div>
				</div>
				<div class="col-span-1 col-start-2">
					<div class="mb-6">
						<h3 class="label">Last Name</h3>
						<p class="field-display">{{ profile.last_name }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Phone</h3>
						<p class="field-display">{{ profile.mobile }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Permanent Address</h3>
						<p class="field-display">{{ profile.permanent_address }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Zip Code</h3>
						<p class="field-display">{{ profile.zip }}</p>
					</div>
					<div class="mb-6">
						<h3 class="label">Registered On</h3>
						<p class="field-display">{{ profile.created_at }}</p>
					</div>
				</div>
				<div class="col-span-1 col-start-3 row-span-1">
					<div class="w-48">
						<h3 class="label">Image</h3>
						<img :src="profile.image" />
					</div>
				</div>
			</div>
			<div class="text-right">
				<router-link :to="{name: 'ProfileUpdate', params: { user_id: profile.user_id }}">
				<button v-show="profile.first_name" class="base-btn">Edit</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/users/ProfileService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'ProfileDetails',
	data() {
		return {
			profile: { user_id: 0 }
		}
	},
	methods: {
		async fetchProfile(): Promise<void> {
			let params = this.$route.params
			let user_id = parseInt(params.user_id as string)
			let token = this.$store.state.session.bearerToken
			await ProfileService.list(user_id, token)
				.then((response: ResponseData) => {
					this.profile  = response.data
					console.log(this.profile)
				})
				.catch((e: Error) => {
					console.log(e);
				});
		}
	},
	async mounted () {
		this.fetchProfile()
	},
});
</script>