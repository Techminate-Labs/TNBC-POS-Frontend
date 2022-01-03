<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Add User</h1>
			<div class="text-right pt-4">
				<button
					class="base-btn-outline" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md" @submit.prevent="addUserAndRedirect">

			<label class="label flex flex-col py-2" for="name">
				Name
				<input
					class="text-input" 
					type="text" 
					id="name" 
					v-model="name" 
					placeholder="John Doe"
				/>
			</label>
			<label class="label flex flex-col py-2" for="email">
				Email
				<input
					class="text-input" 
					type="email" 
					id="email" 
					v-model="email" 
					placeholder="mail@example.com"
				/>
			</label>
			<label class="label flex flex-col py-2">
				Role
				<select v-model="role" class="text-input">
					<option value="">-- Please select an option --</option>
					<option v-for="(role, index) in roles" :key="index" :value="role.value">{{role.name}}</option>
				</select>
			</label>
				<label class="label flex flex-col py-2" for="password">
					Password
					<input
						class="text-input" 
						type="password" 
						id="password" 
						v-model="password" 
						placeholder="*************"
					/>
				</label>
			<label class="label flex flex-col py-2" for="password-confirmation">
				Password Confirmation
				<input
					class="text-input" 
					type="password" 
					id="password-confirmation" 
					v-model="passwordConfirmation" 
					placeholder="**************"
				/>
			</label>
			<div v-show="$store.getters.userCan('create', 'Users')" class="my-2 text-right">
				<button
					class="base-btn ml-2"
					@click="addUser">
					save &amp; create
				</button>
				<button
					class="base-btn ml-2"
					@click="addUserAndRedirect">
					save &amp; exit
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from "@/services/users/UserService";
import RoleService from "@/services/users/RoleService";
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
			let body = {
				'name': this.name.toString(),
				'email': this.email.toString(),
				'password': this.password.toString(),
				'password_confirmation': this.passwordConfirmation.toString(),
				'role_id': this.role.toString(),
			}
			let token = this.$store.state.session.bearerToken
			await UserService.create(body, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `User successfully added to database!`,
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
			let body = {
				'name': this.name.toString(),
				'email': this.email.toString(),
				'password': this.password.toString(),
				'password_confirmation': this.passwordConfirmation.toString(),
				'role_id': this.role.toString(),
			}
			let token = this.$store.state.session.bearerToken
			await UserService.create(body, token)
				.then((response: ResponseData) => {
					console.log(response)
					this.$toast.open({
						message: `User successfully added to database!`,
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