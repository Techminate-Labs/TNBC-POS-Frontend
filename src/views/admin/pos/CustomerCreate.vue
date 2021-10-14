<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
		<p class="text-2xl mb-4">Add Customer</p>
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
				>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="email">Email:</label>
				<input
					class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
					type="email" 
					name="email" 
					v-model="email" 
					placeholder="mail@example.com"
				>
			</div>
			<div class="flex flex-col py-2">
			<label class="label" for="phone">Phone:</label>
			<input
				class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
				type="phone" 
				name="phone" 
				v-model="phone" 
				placeholder="+33 6 7856 218"
			>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="address">Address:</label>
				<input
					class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
					type="text" 
					name="address" 
					v-model="address" 
					placeholder="15 Lonely Road"
				>
			</div>
			<div class="my-2 text-right">
				<button class="base-btn-outline ml-2" @click="addCustomer">Save and create a new one</button>
				<button class="base-btn ml-2" @click="addCustomerAndRedirect">Save and exit</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomerService from "@/services/CustomerService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'CustomerCreate',
	data() {
	return {
		name: '',
		email: '',
		phone: '',
		address: ''
	}
	},
	methods: {
	async addCustomer(): Promise<void> {
		let data = {
			name: this.name,
			email: this.email,
			phone: this.phone,
			address: this.address
		}
		let token = this.$store.state.bearerToken
		await CustomerService.create(data, token)
		.then((response: ResponseData) => {
			this.$toast.open({
			message: `${this.name} successfully added to database!`,
			type: "success"
			})
		})
		.catch((e: Error) => {
			this.$toast.open({
			message: `There was an error adding that customer to the database.`,
			type: "error"
			})
			console.log(e)
		});
	},
	async addCustomerAndRedirect(): Promise<void> {
		let data = {
		name: this.name,
		email: this.email,
		phone: this.phone,
		address: this.address
		}
		let token = this.$store.state.bearerToken
		await CustomerService.create(data, token)
		.then((response: ResponseData) => {
			this.$toast.open({
			message: `${this.name} successfully added to database!`,
			type: "success"
			})
			this.$router.push({name: 'CustomerList'})
		})
		.catch((e: Error) => {
			this.$toast.open({
			message: `There was an error adding that customer to the database.`,
			type: "error"
			})
			console.log(e)
		});
	},
	}
});
</script>