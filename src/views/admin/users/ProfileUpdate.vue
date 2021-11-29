<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-4">
			<h1 class="display-h1">Add User Profile</h1>
			<div class="text-right">
				<button
					class="base-btn-outline" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="first_name">First Name</label>
				<input 
					type="text"
					id="first_name"
					class="text-input"
					placeholder="John"
					v-model="user.first_name"
				>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="last_name">Last Name</label>
				<input 
					type="text"
					id="last_name"
					class="text-input"
					placeholder="Doe"
					v-model="user.last_name"
				>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="mobile">Mobile</label>
				<input 
					type="text"
					id="mobile"
					class="text-input"
					placeholder="02 45 84 55 65"
					v-model="user.mobile"
				>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="identity_number">ID Number</label>
				<input 
					type="number"
					id="identity_number"
					class="text-input"
					placeholder="45685318"
					v-model="user.identity_number"
				>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="present_address">Present Address</label>
				<textarea
					id="present_address"
					cols="40"
					rows="2"
					class="text-input"
					placeholder="45 Freedom Av."
					v-model="user.present_address"></textarea>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="permanent_address">Permanent Address</label>
				<textarea
					id="permanent_address"
					cols="40"
					rows="2"
					class="text-input"
					placeholder="45 Freedom Av."
					v-model="user.permanent_address"></textarea>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="city">City</label>
				<input 
					type="text"
					id="city"
					class="text-input"
					placeholder="New York"
					v-model="user.city"
				>
				</div>
				<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="label" for="zip">Zip Code</label>
				<input 
					type="text"
					id="zip"
					class="text-input"
					placeholder="456 21"
					v-model="user.zip"
				>
				</div>
				<div class="border-2 border-gray-200 rounded-md p-4">
					<div class="flex flew-row flew-nowrap justify-between">
						<p>Image</p>
						<label class="flex flex-row items-center px-4 py-2 hover:text-blue-800 rounded-lg uppercase cursor-pointer">
							<svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
							</svg>
							<span class="ml-2">Select a file</span>
							<input @change="handleFileChange($event)" type='file' accept="image/*" class="hidden" />
						</label>
					</div>
					<div class="w-48">
						<img :src="user.image" />
					</div>
					<div v-show="newImagePreview.length">
						<p class="uppercase text-sm font-light">Preview</p>
						<div class="flex flex-nowrap">
							<img :src="newImagePreview" class="w-48 mb-6" />
							<CancelIcon class="w-6 h-6 hover:text-red-600 cursor-pointer" @click="cancelImageUpload" />
						</div>
					</div>
				</div>
			</div>
			<div class="text-right">
				<button class="base-btn" @click="updateUserProfile">Save and exit</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/users/ProfileService";
import ResponseData from "@/types/ResponseData";
import { UserSingle } from "@/types/users/Users"
import CancelIcon from "@/components/icons/CancelIcon.vue"

export default defineComponent({
	name: 'ProfileUpdate',
	components: { CancelIcon },
	data() {
		return {
			user: {} as UserSingle,
			newImage: null as any,
			newImagePreview: '' as any
		}
	},
	methods: {
		async fetchUserProfile(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let user_id = parseInt(this.$route.params.user_id as string)
			await ProfileService.list(user_id, token)
				.then((response: ResponseData) => {
					this.user = response.data
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async updateUserProfile(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let user_id = parseInt(this.$route.params.user_id as string)
			let user: UserSingle = this.user

			let image = this.newImage

			const fd: any = new FormData()
			fd.append('user_id', user.user_id)
			fd.append('first_name', user.first_name)
			fd.append('last_name', user.last_name)
			fd.append('mobile', user.mobile)
			fd.append('present_address', user.present_address)
			fd.append('permanent_address', user.permanent_address)
			fd.append('identity_number', user.identity_number)
			fd.append('city', user.city)
			fd.append('zip', user.zip)
			fd.append('image', image)
			fd.append('_method', 'PUT')

			await ProfileService.update(fd, user_id, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.user.first_name} ${this.user.last_name} has been successfully updated!`,
						type: "success"
					})
					this.$router.push({name:'ProfileDetails', params: { user_id: user_id }})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that profile.`,
						type: "error"
					})
					console.log(e)
				});
		},
		cancelImageUpload(): void {
			this.newImage = null
			this.newImagePreview = ''
		},
		handleFileChange(e: any): void {
			this.newImage = e.target.files[0]
			this.newImagePreview = URL.createObjectURL(e.target.files[0])
		}
	},
	async mounted(): Promise<void>{
		await this.fetchUserProfile()
	}
});
</script>