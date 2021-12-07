<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Profile Settings</h1>
			<button 
				@click="$router.go(-1)" 
				class="base-btn-outline float-right">
				Back
			</button>
		</div>
		<div class="grid grid-cols-2 auto-rows-auto gap-4">
			<div class="bg-white shadow-md rounded-md p-4 grid-span-1 row-span-1">
				<div class="flex flex-col flex-nowrap py-2 mb-2">
					<label class="label" for="current_password">Current Password</label>
					<input 
						type="password"
						id="current_password"
						class="text-input"
						placeholder="**********"
						v-model="user.current_password"
						/>
				</div>
				<div class="flex flex-col flex-nowrap py-2 mb-2">
					<label class="label" for="new_password">New Password</label>
					<input 
						type="password"
						id="new_password"
						class="text-input"
						placeholder="**********"
						v-model="user.new_password"
					/>
				</div>
				<div class="flex flex-col flex-nowrap py-2 mb-2">
					<label class="label" for="repeat_new_password">Repeat New Password</label>
					<input 
						type="password"
						id="repeat_new_password"
						class="text-input"
						placeholder="**********"
						v-model="user.repeat_new_password"
						/>
				</div>
				<button @click="saveNewPassword" class="base-btn float-right">Save</button>
			</div>
			<div class="bg-white shadow-md rounded-md p-4 grid-span-1 row-start-2">
				<div class="flex flex-cols flex-nowrap justify-between py-2 mb-2">
					<label class="label" for="last_name">Email Verification</label>
					<p 
						v-if="this.$store.state.user.isEmailVerified" 
						class="text-md text-gray-600">
						Your email has already been verified
					</p>
					<button v-else @click="sendEmailVerification" class="base-btn">Verify</button>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-md p-4 grid-span-2 row-span-2">
				<img :src="user.image" class="w-48 mb-6" alt="User profile image" />
				<div class="border-2 border-gray-200 rounded-md p-4">
					<div class="flex flex-row justify-between">
						<p>Image</p>
						<label class="flex flex-row items-center px-4 py-2 hover:text-blue-800 rounded-lg uppercase cursor-pointer">
							<svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
							</svg>
							<span class="ml-2">Select a file</span>
							<input @change="handleFileChange($event)" type='file' accept="image/*" class="hidden" />
						</label>
					</div>
					<div v-show="newImagePreview.length">
						<p class="uppercase text-sm font-light">Preview</p>
						<div class="flex flex-nowrap">
							<img :src="newImagePreview" class="w-48 mb-6" />
							<CancelIcon class="w-6 h-6 hover:text-red-600 cursor-pointer" @click="cancelImageUpload" />
						</div>
					</div>
				</div>
				<button @click="saveNewImage" class="base-btn float-right">Save</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/users/ProfileService";
import DataService from "@/services/DataService";
import ResponseData from "@/types/ResponseData";
import CancelIcon from "@/components/icons/CancelIcon.vue"

export default defineComponent({
	name: 'ProfileCreate',
	components: { CancelIcon },
	data() {
		return {
			user: {
				image: null as any,
				currentPassword: '',
				newPassword: '',
				repeatNewPassword: '',
			},
			newImage: null as any,
			newImagePreview: '' as any
		}
	},
	methods: {
		async fetchProfile(): Promise<void> {
			let user_id = parseInt(this.$route.params.user_id as string)
			let token = this.$store.state.session.bearerToken
			await ProfileService.getById(user_id, token)
				.then((response: ResponseData) => {
					console.log(response)
					this.user.image = response.data.image
				})
		},
		async saveNewPassword(): Promise<void> {
			let data = {
				current_password: this.user.currentPassword,
				new_password: this.user.newPassword,
				new_confirm_password: this.user.repeatNewPassword
			}
			let token = this.$store.state.session.bearerToken
			await ProfileService.updatePassword(data, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `Your password has been successfully updated!`,
						type: "success"
					})
					this.fetchProfile()
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating your new password.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async saveNewImage(): Promise<void> {
			let token = this.$store.state.session.bearerToken

			this.user.image = this.newImage
			this.newImage = null
			this.newImagePreview = ''

			const fd: any = new FormData()
			fd.append('image', this.user.image)
			
			await ProfileService.updatePhoto(fd, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `Your profile picture has been successfully updated!`,
						type: "success"
					})
					this.fetchProfile()
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating your profile picture.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async sendEmailVerification(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let data: any = []
			console.log('Clicked on verify, request is pending...')
			await DataService.requestEmailVerification(data, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `An email has been sent to your inbox.`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating your profile picture.`,
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
			this.newImagePreview = URL.createObjectURL(e.target.files[0])
			this.newImage = e.target.files[0]
		}
	},
	mounted(){
		this.fetchProfile()
	}
});
</script>