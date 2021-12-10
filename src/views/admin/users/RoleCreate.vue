<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Role Permission</h1>
			<div class="text-right">
				<button
					class="base-btn-outline" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<CheckboxTable 
			@handleNameChange="changeName"
			@handleSave="createRole"
			@handleSaveAndRedirect="createRoleAndRedirect"
			:columns="columns"
			:items="items" 
			/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxTable from '@/components/tables/CheckboxTable.vue'
import RoleService from "@/services/users/RoleService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'RoleCreate',
	components: {
		CheckboxTable
	},
	data() {
		return {
			items: [],
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
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await RoleService.list(url, token)
				.then((response: ResponseData) => {
					const roles = response.data.data
					// we copy a permission from the first role
					let emptyPermissions = roles[0].permissions
					// we set all permissions types to false
					for (var section in emptyPermissions) {
						for (var type in emptyPermissions[section]) {
							emptyPermissions[section][type] = false
						}
					}
					this.items = emptyPermissions
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		createRole(items: any): void {
			let token = this.$store.state.session.bearerToken
			let data = {
				name: this.roleName,
				permissions: items
			}
			RoleService.create(data, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.roleName} has been successfully created!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that role.`,
						type: "error"
					})
					console.log(e)
				});
		},
		createRoleAndRedirect(items: any): void {
			let token = this.$store.state.session.bearerToken
			let data = {
				name: this.roleName,
				permissions: items
			}
			RoleService.create(data, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.roleName} has been successfully created!`,
						type: "success"
					})
					this.$router.push({name: 'RoleList'})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that role.`,
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