<template>
	<div>
		<div>
			<h1 class="display-h1">Role Permission</h1>
			<div class="text-right flex flex-nowrap justify-between mb-2">
				<p class="pt-4">Updating <span class="capitalize font-bold">{{ roleName }}</span></p>
				<button
				class="base-btn-outline" 
				@click="$router.go(-1)">
				Back
				</button>
			</div>
		</div>
		<CheckboxTable
			@handleNameChange="changeName"
			@handleSave="updateRole"
			@handleSaveAndRedirect="updateRoleAndRedirect"
			:columns="columns" 
			:items="items" 
			:id="roleName" 
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxTable from '@/components/tables/CheckboxTable.vue'
import RoleService from "@/services/users/RoleService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'RoleUpdate',
	components: {
		CheckboxTable
	},
	data() {
		return {
			items: {},
			roleName: '',
			url: 'roleList',
			columns: [
				{
					name: 'create',
					attribute: 'create'
				},
				{
					name: 'edit',
					attribute: 'edit'
				},
				{
					name: 'delete',
					attribute: 'delete'
				},
				{
					name: 'view',
					attribute: 'view'
				},
				{
					name: 'list',
					attribute: 'list'
				}
			]
		}
	},
	methods: {
		async fetchRoles(): Promise<void> {
			let params = this.$route.params
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await RoleService.list(url, token)
				.then((response: ResponseData) => {
					let role_id: number = parseInt(params.id as string)
					const filteredRoles = response.data.data.filter((role: any) => role.id === role_id)
					this.roleName = filteredRoles[0].name
					let permissions = filteredRoles[0].permissions
					this.items = permissions
				})
				.catch((e: Error) => {
					console.log(e)
				});
		},
		async updateRole(items: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let role_id: number = parseInt(this.$route.params.id as string)
			let data = {
				name: this.roleName,
				permissions: items
			}
			await RoleService.update(data as any, role_id as number, token as any)
				.then((response: ResponseData) => {
					this.$toast.open({
					message: `${this.roleName} has been successfully updated!`,
					type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that role.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async updateRoleAndRedirect(items: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let role_id: number = parseInt(this.$route.params.id as string)
			let data = {
				name: this.roleName,
				permissions: items
			}
			await RoleService.update(data as any, role_id as number, token as any)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.roleName} has been successfully updated!`,
						type: "success"
					})
					this.$router.push({name:'RoleList'})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that role.`,
						type: "error"
					})
					console.log(e)
				});
		},
		changeName(event: any): void {
			let value = event.target.value
			this.roleName = value
		}
	},
	async mounted() {
		this.fetchRoles()
	},
});
</script>