<template>
	<div>
		<div class="flex flex-nowrap justify-between">
			<h1 class="display-h1">Update Customer</h1>
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
				<label class="label" for="phone">Phone:</label>
				<input
					class="text-input" 
					type="phone" 
					name="phone" 
					v-model="phone" 
					placeholder="+33 6 7856 218"
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="address-name">Address:</label>
				<input
					class="text-input" 
					type="text" 
					name="address" 
					v-model="address" 
					placeholder="15 Lonely Road"
					/>
			</div>
		</div>
		<button class="base-btn float-right" @click="updateCustomer">Save and Exit</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomerService from "@/services/pos/CustomerService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'CustomerCreate',
	data() {
		return {
			name: '',
			email: '',
			phone: '',
			address: '',
			id: ''
		}
	},
	methods: {
		async fetchCustomers(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let customer_id = this.$route.params.id
			await CustomerService.getById(customer_id, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.name  = res.name
					this.email = res.email
					this.phone = res.phone
					this.address = res.address
					this.id = res.id
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async updateCustomer(): Promise<void> {
			let data = {
				name: this.name,
				email: this.email,
				phone: this.phone,
				address: this.address,
			}
			let id = parseInt(this.id)
			let token = this.$store.state.session.bearerToken
			await CustomerService.update(data, id, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `${this.name} successfully updated!`,
						type: "success"
					})
					this.$router.push({ name: 'CustomerList' })
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that customer.`,
						type: "error"
					})
					console.log(e)
				});
		},
	},
	async mounted() {
		this.fetchCustomers()
	},
});
</script>