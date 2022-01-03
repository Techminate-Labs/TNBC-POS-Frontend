<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Edit User</h1>
			<div class="text-right">
				<button
					class="base-btn-outline" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<div class="grid grid-cols-1 bg-white p-4 rounded-lg shadow-md">
			<div>
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
						<select :value="role_id" class="text-input">
							<option value="">-- Please select an option --</option>
							<option v-for="(role, index) in roles" :key="index" :value="role.value">{{role.name}}</option>
						</select>
					</label>
				<button
					class="base-btn float-right" 
					v-show="$store.getters.userCan('edit', 'Users')"
					@click="updateUser">
					save and exit
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
	name: 'UserUpdate',
	data() {
		return {
			name: '',
			email: '',
			role: '',
			role_id: '',
			id: '',
			roles: [],
			url: '/userList'
		}
	},
	methods: {
		async fetchUser(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let params = this.$route.params
			let id = parseInt(params.user_id as string)
			await UserService.getById(id, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.name  = res.name
					this.email = res.email
					this.role  = res.role
					this.role_id    = res.role_id
					this.id    = res.id
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async fetchRoles(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = 'roleList'
			RoleService.list(`${url}?limit=0`, token)
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
					console.log(e);
				});
		},
		async updateUser(): Promise<void> {
			let params = this.$route.params
			let user_id: number = parseInt(params.user_id as string)
			let data = {
				name: this.name,
				email: this.email,
				role_id: this.role_id
			}
			let token = this.$store.state.session.bearerToken
			await UserService.update(data, user_id, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.name} successfully updated!`,
						type: "success"
					})
					this.$router.push({name:'UserList'})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that user.`,
						type: "error"
					})
					console.log(e)
				});
		}
	},
	async mounted () {
		this.fetchUser()
		this.fetchRoles()
	}
});
</script>