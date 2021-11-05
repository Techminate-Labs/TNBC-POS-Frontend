<template>
    <div class="flex flex-col">
        <div class="bg-white shadow px-6 py-4 rounded-md mb-2">
            <p>Store TNBC Public Key: {{ configurations.tnbc_pk }}</p>
        </div>
        <div class="bg-white shadow px-6 py-4 rounded-md mb-2">
            <p>Last Transaction Public Key: {{ transactions[0].amount }}</p>
        </div>
        <div class="bg-white shadow px-6 py-4 rounded-md mb-2">
            <p>Last Transaction Amount: {{ transactions[0].amount }}</p>
        </div>
        <TransactionTable
            :columns="columns"
            :data="transactions"
            />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TransactionService from '@/services/TransactionService'
import TransactionTable from "@/components/tables/TransactionTable.vue"
import ConfigurationService from "@/services/ConfigurationService"

export default defineComponent({
    name: 'TransactionExplorer',
    components: { TransactionTable },
    data() {
        return {
            transactions: [] as Array<any>,
            configurations: {},
            columns: [
				{
					attribute: 'date',
					name: 'date'
				},
				{
					attribute: 'amount',
					name: 'amount'
				}
			]
        }
    },
    methods: {
        async fetchTransactions(): Promise<any> {
            let token = this.$store.state.session.bearerToken
            await TransactionService.listTransactions(token)
                .then((res) => {
                    this.transactions = res.data.transactions
                    console.log(this.transactions)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        async fetchConfigurations(): Promise<any> {
            let token = this.$store.state.session.bearerToken
            await ConfigurationService.listConfigurations(token)
                .then((res) => {
                    this.configurations = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    async created(): Promise<void> {
        await this.fetchTransactions()
        await this.fetchConfigurations()
    }
});
</script>