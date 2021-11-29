<template>
	<div class="flex flex-nowrap py-2">
		<div class="flex flex-col flex-nowrap w-1/2 pr-4">
			<button @click="$emit('changePaymentMethod', 'tnbc')" class="shadow-sm btn-payment flex mb-2">
				<span class="flex-1">Pay with TNBC</span>
				<img 
					class="absolute object-cover h-7 w-7"
					src="@/assets/tnbc.png" 
					/>
				</button>
			<button @click="$emit('changePaymentMethod', 'fiat')" class="shadow-sm btn-payment flex mb-2">
		        <span class="flex-1">Pay with Cash</span>
				<img 
					class="absolute object-cover h-7 w-7 hover:text-white rounded-circle"
					src="@/assets/doller.png" 
					/>
			</button>
			<button 
				@click="$emit('loadExplorer')" 
				class="shadow-sm btn-payment">
				Transaction Explorer
			</button>
		</div>
		<div class="flex-grow flex flex-col flex-nowrap">
			<button 
				@click="$emit('prepareInvoice')"
				class="text-2xl btn-print-payment w-full">
				Print Receipt
			</button>
			<label class="py-2 mt-4 capitalize" for="first_name">
				<p>Discount Coupon</p>
				<input 
					type="text"
					id="first_name"
					class="text-input self-center w-40"
					placeholder="154951"
					v-model="discount"
					@input="$emit('discountChange', $event)"
				/>
				<input class="self-center inline-block bg-blue-900 base-btn ml-2" type="submit" value="Apply" />
			</label>
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
	}
})
</script>