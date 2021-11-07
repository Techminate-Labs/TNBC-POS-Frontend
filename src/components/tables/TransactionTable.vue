<template>
    <div class="flex flex-col">
        <div class="py-2 align-middle inline-block w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
				<table class="divide-y divide-gray-200 border-collapse w-full">
					<thead class="bg-white">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th 
								v-for="(column, key, index) in columns" 
								:key="index" 
								scope="col" 
								@click="sort(column.attribute)"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								{{ column.name }}
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						<tr v-for="(item, i) in data" :key="i" class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
							<td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
								{{ i + 1 }}
							</td>
							<td 
								v-for="(column, j) in columns" 
								:key="j" 
								:data-label="column.attribute"
								class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
								<div class="flex-shrink-0">
									{{ item[column.attribute] }}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'TransactionExplorer',
	props: {
		data: {
			required: true
		},
		columns: {
			required: true
		},
	}
})
</script>

<style>

</style>