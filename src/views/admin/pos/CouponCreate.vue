<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Add Coupon</h1>
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
				<label class="label" for="discount">Discount:</label>
				<input
				class="text-input" 
				type="number" 
				id="discount" 
				v-model="discount" 
				placeholder="John Doe"
				>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="start_date">Start Date:</label>
				<input 
				type="date"
				v-model="start_date"
				class="text-input">
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="end_date">End Date:</label>
				<input 
				type="date"
				v-model="end_date"
				class="text-input">
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="active">Active:</label>
				<div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
					<input 
						v-model="active" 
						type="checkbox" 
						id="active toggle"
						class="toggle-checkbox base-toggle-input"
						/>
					<label for="active" class="toggle-label base-toggle-label"></label>
				</div>
			</div>
			<div class="my-2 text-right" v-show="$store.state.user.permissions['Items']['create']">
				<button class="base-btn-outline ml-2" @click="addCoupon">Save and create a new one</button>
				<button class="base-btn ml-2" @click="addCouponAndRedirect">Save and exit</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CouponService from "@/services/items/CouponService";


export default defineComponent({
	name: 'CouponCreate',
	data() {
		return {
			discount: 0,
			start_date: '',
			end_date: '',
			active: false
		}
	},
	methods: {
		async addCoupon(): Promise<void> {
			let data = {
				discount: this.discount,
				start_date: this.start_date,
				end_date: this.end_date,
				active: this.active
			}
			let token = this.$store.state.session.bearerToken
			await CouponService.create(data, token)
				.then((response) => {
					this.$toast.open({
						message: `${this.discount} successfully added to database!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error adding that Coupon to the database.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async addCouponAndRedirect(): Promise<void> {
			let data = {
				discount: this.discount,
				start_date: this.start_date,
				end_date: this.end_date,
				active: this.active
			}
			let token = this.$store.state.session.bearerToken
			await CouponService.create(data, token)
				.then((response) => {
					this.$toast.open({
						message: `${this.discount} successfully added to database!`,
						type: "success"
					})
					this.$router.push({name: 'CouponList'})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error adding that coupon to the database.`,
						type: "error"
					})
					console.log(e)
				});
		},
	}
});
</script>