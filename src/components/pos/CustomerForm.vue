<template>
	<div class="bg-white rounded-md px-6 py-4">
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
			<label class="label" for="phone">Phone:</label>
			<input
				class="text-input" 
				type="tel" 
				name="phone" 
				v-model="phone" 
				placeholder="+33 6 7856 218"
			/>
		</div>
		<div class="flex flex-col py-2">
			<label class="label" for="address">Address:</label>
			<input
				class="text-input" 
				type="text" 
				name="address" 
				v-model="address" 
				placeholder="15 Lonely Road"
			/>
		</div>
		<div class="my-2 text-right">
			<button class="base-btn" @click="addCustomer">Save</button>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CustomerService from "@/services/CustomerService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'CustomerForm',
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
			let phone = this.phone.replace(/\s+/g, '');
			let data = {
				name: this.name,
				email: this.email,
				phone: phone,
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
		}
	}
})
</script>