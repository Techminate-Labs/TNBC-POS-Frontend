<template>
    <div class="overflow-hidden">
        <div class="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-1/2 z-40 p-10 bg-white rounded-lg shadow-lg">
            <button @click="$emit('close-modal')" class="float-right hover:text-red-600">
                <CancelIcon class="w-8 h-8" />
            </button>
            <p class="text-2xl mb-4">Invoice</p>
            <table class="divide-y divide-gray-200 border-collapse w-full text-left">
                <thead>
                    <tr>
                        <th class="px-6 text-sm">Name</th>
                        <th class="px-6 text-sm">Unit</th>
                        <th class="px-6 text-sm">Unit Price</th>
                        <th class="px-6 text-sm">QTY</th>
                        <th class="px-6 text-sm">Amount</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(item) in invoice.invoiceItems" :key="item.id">
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.item_name }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.unit_price }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.qty }}</td>
                        <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">{{ item.total }}</td>
                    </tr>
                </tbody>
                <tfoot class="text-left bg-blue-900 text-white shadow-md">
                    <tr>
                        <th class="px-6 py-2">Subtotal</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <!-- <td colspan="2" class="px-6 text-right">{{ invoice.subtotal }} {{ getPaymentMethod }}</td> -->
                    </tr>
                    <tr>
                        <th class="px-6 py-2">Discount</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <!-- <td colspan="2" class="px-6 text-right">{{ invoice.discount }} {{ getPaymentMethod }}</td> -->
                    </tr>
                    <tr>
                        <th class="px-6 py-2">Tax</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <!-- <td colspan="2" class="px-6 text-right">{{ invoice.tax }} {{ getPaymentMethod }}</td> -->
                    </tr>
                    <tr>
                        <th class="px-6 py-2">Total</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <!-- <td colspan="2" class="px-6 text-right">{{ invoice.total }} {{ getPaymentMethod }}</td> -->
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
import { InvoiceSingle } from '@/types/Invoice'

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
            invoice: {} as InvoiceSingle
        }
    },
    watch: {
        propInvoice: function () {
            this.invoice = this.propInvoice
        }
    },
    computed: {
        // getPaymentMethod(): string {
        //     if (this.invoice) {
        //         switch (this.invoice.invoice.payment_method) {
        //             case 'fiat':
        //                 return '$'
        //             case 'tnbc':
        //                 return 'TNBC'
        //             default:
        //                 return ''
        //         }
        //     }
        //     return ''
		// }
    }

})
</script>