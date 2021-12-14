<template>
    <div class="overflow-hidden">
        <div class="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-1/2 z-40 p-10 bg-white rounded-lg shadow-lg">
            <button @click="$emit('close-modal')" class="float-right hover:text-red-600">
                <CancelIcon class="w-8 h-8" />
            </button>
            <h2 class="display-h2">Invoice n° {{ invoice.invoice_number }}</h2>
            <table class="divide-y divide-gray-200 border-collapse border border-gray-200 w-full text-left shadow-md block h-96 overflow-y-scroll">
                <thead>
                    <tr class="uppercase text-sm">
                        <th class="px-6 py-4">Name</th>
                        <th class="px-6 py-4">Unit</th>
                        <th class="px-6 py-4">Unit Price</th>
                        <th class="px-6 py-4">QTY</th>
                        <th class="px-6 py-4">Amount</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(item) in invoiceItems" :key="item.id">
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.item_name }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit_price }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.qty }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.total }}</td>
                    </tr>
                </tbody>
                <tfoot class="text-left">
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th class="px-6 py-2">Subtotal</th>
                        <td colspan="2" class="px-6 text-right">{{ invoice.subTotal }} {{ $store.getters.cartCurrency(invoice.payment_method) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th class="px-6 py-2">Discount</th>
                        <td colspan="2" class="px-6 text-right">{{ invoice.discount }} {{ $store.getters.cartCurrency(invoice.payment_method) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th class="px-6 py-2">Tax</th>
                        <td colspan="2" class="px-6 text-right">{{ invoice.tax }} {{ $store.getters.cartCurrency(invoice.payment_method) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th class="px-6 py-2">Total</th>
                        <td colspan="2" class="px-6 text-right">{{ invoice.total }} {{ $store.getters.cartCurrency(invoice.payment_method) }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="bg-gray-800 h-screen w-full opacity-90 z-30 fixed top-0 left-0"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CancelIcon from '@/components/icons/CancelIcon.vue'
import { InvoiceSingle, Invoice, InvoiceItems } from '@/types/pos/Invoice'

export default defineComponent({
    name: 'InvoiceModal',
    components: { CancelIcon },
    props: {
        propInvoice: {
            required: true,
            type: Object as PropType<InvoiceSingle>
        }
    },
    data(){
        return {
            invoiceItems: [] as Array<InvoiceItems>,
            invoice: {} as Invoice
        }
    },
    watch: {
        propInvoice: function () {
            this.invoice = this.propInvoice.invoice
            console.log(this.invoice)
            this.invoiceItems = this.propInvoice.invoiceItems
            console.log(this.invoiceItems)
        }
    }

})
</script>