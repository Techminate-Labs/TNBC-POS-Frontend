<template>
	<div class="flex flex-nowrap p-2">
		<div class="flex flex-col flex-nowrap w-1/2 pr-4">
			<button @click="$emit('changePaymentMethod', 'tnbc')" class="shadow-2xl base-btn-outline flex">
				<span class="flex-1">Pay with TNBC</span>
				<img 
					class="absolute object-cover h-7 w-7"
					src="@/assets/tnbc.png" 
					/>
				</button>
			<button @click="$emit('changePaymentMethod', 'fiat')" class="shadow-2xl base-btn-outline flex">
		        <span class="flex-1">Pay with Cash</span>
				<img 
					class="absolute object-cover h-7 w-7 hover:text-white bg-white rounded-circle"
					src="@/assets/doller.png" 
					/>
			</button>
			<button 
				@click="$emit('loadExplorer')" 
				class="shadow-2xl base-btn-outline">
				Transaction Explorer
			</button>
		</div>
		<div class="flex-grow flex flex-col flex-nowrap pl-4">
			<button 
				@click="$emit('prepareInvoice')"
				class="text-2xl shadow-md base-btn flex-grow">
				Print Receipt
			</button>
			<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="capitalize mb-2" for="first_name">Discount Coupon</label>
				<input 
					type="text"
					name="first_name"
					class="text-input"
					placeholder="154951"
					v-model="discount"
					@input="$emit('discountChange', $event)"
					/>
			</div>
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