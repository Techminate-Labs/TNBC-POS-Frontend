<template>
	<div>
		<div
			v-if="cart || invoice"
			name="invoice"
			id="invoice-to-print" 
			class="bg-white shadow-md rounded-md hover:shadow-lg max-w-min my-4 mx-auto py-2 px-8 text-left">

			<div class="my-4">
				<p class="font-semibold text-sm text-left">TNB POS</p>
				<p class="font-semibold text-sm text-left">Dhaka, Bangladesh</p>
				<p class="font-semibold text-sm text-left mb-2">01680800810</p>
				<p class="text-sm">Date : {{ getMeta.date }}</p>
				<p class="text-sm">Memo : {{ getMeta.invoice_number }}</p>
				<span v-if="getMeta.payment_method == 'fiat'">
					<p class="text-sm">Paid with : Cash</p>
				</span>
				<span v-else>
					<p class="text-sm">Paid with : TNBC</p>
				</span>
				<p class="text-sm">Cashier : {{ getMeta.cashier }}</p>
			</div>
			<InvoiceTable :invoice="invoice" :cart="cart" />
		</div>
		<div v-else class="my-4 mx-auto py-16 px-8 text-center">
			The invoice is not available at the moment.
		</div>
		<button class="base-btn" @click="printInvoice">Print invoice</button>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InvoiceTable from "@/components/pos/InvoiceTable.vue"
import { Cart } from '@/types/pos/Cart'
import EmptyCheck from '@/mixins/EmptyCheck'
import moment from 'moment'

export default defineComponent({
	name: 'Invoice',
	components: { InvoiceTable },
	props: {
		invoice: {
			type: Object as PropType<Cart>,
			required: true
		},
		cart: {
			type: Object as PropType<Cart>,
			required: true
		}
	},
	data() {
		return {
			toPrint: {} as Object
		}
	},
	computed: {
		getMeta(): Object {
			if (!EmptyCheck(this.cart)){
				return {
					date: moment(this.cart.date).format('Do MMM YYYY h:mm a'),
					invoice_number: this.cart.invoice_number,
					payment_method: this.cart.payment_method,
					cashier: this.cart.cashier,
				}
			} else if (!EmptyCheck(this.invoice)){
				return {
					date: moment(this.invoice.date).format('Do MMM YYYY h:mm a'),
					invoice_number: this.invoice.invoice_number,
					payment_method: this.invoice.payment_method,
					cashier: this.invoice.cashier,
				}
				
			} else {
				return {}
			}
		},
		printInvoice(): void {
			const win: any = window.open('','','left=0,top=0,width=552,height=477,toolbar=0,scrollbars=0,status=0')
			const handler = () => {
				win.print()
				win.close()
			}
			if(win.addEventListener)
				win.addEventListener('load', handler, false)
			else if(win.attachEvent)
				win.attachEvent('onload', handler, false)

			let content: any = "<html>"
			content += this.$el.innerHTML
			content += "</body>"
			content += "</html>"
			win.document.write(content)
			win.print()
			win.document.close()
		}
	}
})
</script>