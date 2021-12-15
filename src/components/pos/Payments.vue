<template>
	<div class="flex flex-nowrap py-2">
		<div class="flex flex-col flex-nowrap w-1/2 mr-2">
			<div class="flex">
				<button 
					@click="$emit('changePaymentMethod', 'tnbc')" 
					:class="isTNBCSelected ? 'payment-selected' : ''"
					class="text-left w-full shadow-sm btn-payment flex mb-2 mr-2">
					<p class="flex-1">Pay with TNBC</p>
					<img 
						class="object-cover h-7 w-7"
						src="@/assets/tnbc.png" 
						/>
					</button>
				<button 
					@click="$emit('changePaymentMethod', 'fiat')"
					:class="!isTNBCSelected ? 'payment-selected' : ''"
					class="text-left w-full shadow-sm btn-payment flex mb-2">
					<p class="flex-1">Pay with Cash</p>
					<img 
						class="object-cover h-7 w-7 hover:text-white rounded-circle"
						src="@/assets/doller.png" 
						/>
				</button>
			</div>
			<button 
				@click="$emit('loadExplorer')" 
				class="shadow-sm btn-payment">
				Transaction Explorer
			</button>
			<label class="py-2 mt-4 capitalize" for="first_name">
				<input 
					type="text"
					id="first_name"
					class="text-input self-center w-40"
					placeholder="Coupon Code"
					v-model="discount"
				/>
				<button
					class="self-center inline-block bg-blue-900 base-btn ml-2" 
					@click="$emit('discountChange', discount)"
				>Apply</button>
			</label>
		</div>
		<div class="flex-grow flex flex-col flex-nowrap">
			<button 
				@click="$emit('generateQrCode')"
				class="text-2xl btn-print-payment w-full mb-2"
				:class="isTNBCSelected ? '' : 'disabled'"
				:disabled="isTNBCSelected ? false : true">
				Generate QRCode
			</button>
			<button 
				@click="$emit('printInvoice')"
				class="text-2xl btn-print-payment w-full">
				Print Invoice<br /><span class="text-sm font-medium"></span>
			</button>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Payments',
	data() {
		return {
			discount: ''
		}
	},
	computed: {
		isTNBCSelected(): boolean {
			const method = this.$store.state.pos.cart.payment_method
			if (method === 'tnbc'){
				return true
			}
			return false
		}
	}
})
</script>