<template>
	<div>
		<div class="flex flex-nowrap justify-between">
			<p class="text-2xl mb-4">Update Coupon</p>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md">
			<div class="flex flex-col py-2">
				<label class="label" for="discount">Discount:</label>
				<input
					class="text-input" 
					type="number" 
					name="discount" 
					v-model="discount" 
					placeholder="John Doe" 
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="start_date">Start Date:</label>
				<input 
					type="date"
					v-model="start_date"
					class="text-input" 
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="end_date">End Date:</label>
				<input 
					type="date"
					v-model="end_date"
					class="text-input" 
					/>
			</div>
			<div class="flex flex-col py-2">
				<label class="label" for="active">Active:</label>
				<div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
					<input 
						v-model="active" 
						type="checkbox" 
						name="active" 
						id="toggle" 
						class="toggle-checkbox base-toggle-input"
						/>
					<label for="active" class="toggle-label base-toggle-labelblock overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
				</div>
			</div>
			<div class="my-2 text-right">
				<button class="base-btn" @click="updateCoupon">Save and Exit</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CouponService from "@/services/CouponService";
import ResponseData from "@/types/ResponseData";

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
		async fetchCoupons(): Promise<void> {
			let token = this.$store.state.bearerToken
			let Coupon_id = this.$route.params.id
			await CouponService.getById(Coupon_id, token)
				.then((response: ResponseData) => {
					let res = response.data
					this.discount = res.discount
					this.start_date = res.start_date
					this.end_date = res.end_date
					this.active = (res.active == 1) ? true : false
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async updateCoupon(): Promise<void> {
			let data = {
				discount: this.discount,
				start_date: this.start_date,
				end_date: this.end_date,
				active: (this.active) ? 1 : 0
			}
			let id = this.$route.params.id
			let token = this.$store.state.bearerToken
			await CouponService.update(data, id, token)
				.then((response: ResponseData) => {
					this.$toast.open({
						message: `Coupon successfully updated!`,
						type: "success"
					})
					this.$router.push({ name: 'CouponList' })
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error updating that coupon.`,
						type: "error"
					})
					console.log(e)
				});
		},
	},
	async mounted() {
		this.fetchCoupons()
	},
});
</script>