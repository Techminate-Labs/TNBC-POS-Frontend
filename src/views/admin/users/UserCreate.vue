<template>
	<div >
		<div class="flex flex-nowrap justify-between mb-2">
			<p class="text-2xl mb-4 pt-4">Add User</p>
			<div class="text-right pt-4">
				<button
					class="base-btn-outline" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md">
			<div class="flex flex-col py-2">
				<label class="label" for="name">Name:</label>
				<input
					class="text-input" 
					type="text" 
					name="name" 
					v-model="name" 
					placeholder="John Doe"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="email">Email:</label>
				<input
					class="text-input" 
					type="email" 
					name="email" 
					v-model="email" 
					placeholder="mail@example.com"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label">Role:</label>
				<select v-model="role" class="text-input">
					<option :value="null">-- Please select an option --</option>
					<option v-for="(role, index) in roles" :key="index" :value="role.value">{{role.name}}</option>
				</select>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="password">Password:</label>
				<input
					class="text-input" 
					type="password" 
					name="password" 
					v-model="password" 
					placeholder="*************"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="password-confirmation">Password Confirmation:</label>
				<input
					class="text-input" 
					type="password" 
					name="password-confirmation" 
					v-model="passwordConfirmation" 
					placeholder="**************"
					/>
			</div>
			<div class="my-2 text-right">
				<button
					class="base-btn-outline ml-2" 
					@click="addUser">
					Save and Create a New User
				</button>
				<button
					class="base-btn ml-2" 
					@click="addUserAndRedirect">
					save and exit
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from "@/services/UserService";
import RoleService from "@/services/RoleService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'UserCreate',
	data() {
		return {
			name: '',
			email: '',
			role: '',
			password: '',
			passwordConfirmation: '',
			roles: [],
			url: '/roleList'
		}
	},
	methods: {
		async addUser(): Promise<void> {
			let data = {
				name: this.name,
				email: this.email,
				password: this.password,
				password_confirmation: this.passwordConfirmation,
				role_id: Number(this.role),
			}
			let token = this.$store.state.session.bearerToken
			await UserService.create(data, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.name} successfully added to database!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error adding that user to the database.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async addUserAndRedirect(): Promise<void> {
			let data = {
				name: this.name,
				email: this.email,
				password: this.password,
				password_confirmation: this.passwordConfirmation,
				role_id: Number(this.role),
			}
			let token = this.$store.state.session.bearerToken
			await UserService.create(data, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.name} successfully added to database!`,
						type: "success"
					})
					this.$router.push({name:'UserList'})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error adding that user to the database.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async fetchRoles(): Promise<void> {
			let params = this.$route.params
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await RoleService.list(url, token)
				.then((response: ResponseData) => {
					let role_id: number = parseInt(params.user_id as string)
					let _data: any = []
					response.data.data.map((role: any) => {
						_data.push({
							value: role.id,
							name: role.name
						})
					})
					this.roles = _data
				})
				.catch((e: Error) => {
					console.log(e)
				});
		}
	},
	async mounted() {
		this.fetchRoles()
	},
});
</script>