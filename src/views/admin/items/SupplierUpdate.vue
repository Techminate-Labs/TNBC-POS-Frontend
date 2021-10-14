<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<p class="text-2xl mb-4">Update Supplier</p>
			<div class="text-right">
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
					class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
					type="text" 
					name="name" 
					v-model="name" 
					placeholder="John Doe"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="email">Email:</label>
				<input
					class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
					type="email" 
					name="email" 
					v-model="email" 
					placeholder="mail@example.com"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="phone">Phone:</label>
				<input
					class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
					type="phone" 
					name="phone" 
					v-model="phone" 
					placeholder="+33 6 7856 218"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="company-name">Company name:</label>
				<input
					class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
					type="text" 
					name="company-name" 
					v-model="companyName" 
					placeholder="ACME Inc."
					/>
			</div>
		</div>
		<button class="base-btn float-right" @click="updateSupplier">Save</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SupplierService from "@/services/SupplierService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'SupplierCreate',
	data() {
		return {
			name: '',
			email: '',
			phone: '',
			companyName: '',
			id: ''
		}
	},
	methods: {
		async fetchSuppliers(): Promise<void> {
		let token = this.$store.state.bearerToken
		let params = this.$route.params
		let url = '/supplierList'
		await SupplierService.list(url, token)
			.then((response: ResponseData) => {
				let id: number = parseInt(params.id as string)
				const filteredUser = response.data.data.filter((supplier: any) => supplier.id === id)
				this.name  = filteredUser[0].name
				this.email = filteredUser[0].email
				this.phone = filteredUser[0].phone
				this.companyName = filteredUser[0].company
				this.id = filteredUser[0].id
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async updateSupplier(): Promise<void> {
			let data = {
				name: this.name,
				email: this.email,
				phone: this.phone,
				company: this.companyName,
			}
			let id = parseInt(this.id)
			let token = this.$store.state.bearerToken
			await SupplierService.update(data, id, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.name} successfully updated!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that supplier.`,
						type: "error"
					})
					console.log(e)
				});
		},
	},
	async mounted() {
		this.fetchSuppliers()
	},
});
</script>