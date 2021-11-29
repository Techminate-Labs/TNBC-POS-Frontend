<template>
	<div class="flex flex-nowrap pt-4">
		<div class="flex flex-col flex-nowrap w-1/2 pr-4">
			<button @click="$emit('changePaymentMethod', 'tnbc')" class="shadow-sm btn-payment flex">
				<span class="flex-1">Pay with TNBC</span>
				<img 
					class="absolute object-cover h-7 w-7"
					src="@/assets/tnbc.png" 
					/>
				</button>
			<button @click="$emit('changePaymentMethod', 'fiat')" class="shadow-sm btn-payment flex">
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
			<div class="flex flex-col flex-nowrap py-2 grid-span-1 mb-2">
				<label class="capitalize mb-2" for="first_name">Discount Coupon</label>
				<div class="flex flex-nowrap">
					<input 
						type="text"
						name="first_name"
						class="text-input self-center w-32"
						placeholder="154951"
						v-model="discount"
						@input="$emit('discountChange', $event)"
						/>
					<input class="base-btn-outline self-center h-full mt-0" type="submit" value="Apply" />
				</div>
			</div>
		</div>
		<div class="flex-grow flex flex-col flex-nowrap pl-4">
			<button 
				@click="$emit('prepareInvoice')"
				class="text-2xl btn-print-payment flex-grow">
				Print Receipt
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
	}
})
</script>