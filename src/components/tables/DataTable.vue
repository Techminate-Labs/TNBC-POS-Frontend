<template>
    <div class="flex flex-col">
        <div class="py-2 align-middle inline-block w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div class="bg-white flex flex-col flex-nowrap w-full p-4">
                    <input
                        @input="$emit('handleSearch', $event)"
                        class="p-3 rounded-md border-solid border-2 border-gray-200"
                        id="role-name"
                        type="text"
                        placeholder="Search anything..." />
                </div>
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
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(item, i) in sortedItems" :key="i" class="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
                                {{ i + 1 }}
                            </td>
                            <td 
                                v-for="(textColumn, j) in textColumns" 
                                :key="j" 
                                :data-label="textColumn.attribute"
                                class="w-full lg:w-auto px-6 py-4 whitespace-nowrap">
                                <div v-if="textColumn.attribute === 'image'" class="flex-shrink-0">
                                    <img :src="item.image" class="w-12" />
                                </div>
                                <div v-else class="flex-shrink-0">
                                    {{ item[textColumn.attribute] }}
                                </div>
                            </td>
                            <td 
                                data-label="Action"
                                class="flex flew-row justify-end w-full lg:w-auto px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <UserAddIcon v-show="isUsingProfile" @click="$emit('handleAddProfile', item)" class="text-green-700 h-6 w-6 mr-1 cursor-pointer hover:opacity-50" />
                                <ViewIcon v-show="canUserView" @click="$emit('handleView', item)" class="text-blue-700 h-6 w-6 mr-1 cursor-pointer hover:opacity-50" />
                                <EditIcon v-show="canUserEdit" @click="$emit('handleEdit', item)" class="text-green-700 h-6 w-6 mr-1 cursor-pointer hover:opacity-50" />
                                <DeleteIcon v-show="canUserDelete" @click="$emit('handleDelete', item)" class="text-red-700 h-6 w-6 mr-1 cursor-pointer hover:opacity-50" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between md:justify-end">
                        <div class="md:mr-6">
                            <p class="text-sm text-gray-700">
                                Showing
                                <span class="font-medium">{{ meta.from }}</span>
                                out of
                                <span class="font-medium">{{ meta.to }}</span>
                                results
                            </p>
                        </div>
                        <div class="md:mr-6 text-sm text-gray-700">
                        Show
                        <select 
                            @change="onMaxItemsPerPageChange($event)"
                            v-model="meta.per_page"
                            class="border-2 p-2 rounded-lg">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                            Items
                        </div>
                        <nav class="relative z-0 inline-flex" aria-label="Pagination">
                            <button
                                @click="changeToPreviousPage"
                                href="#"
                                :class="prev === null ? 'disabled' : ''"
                                class="relative inline-flex items-center mr-2 px-2 py-2 rounded-full bg-white text-sm font-medium text-gray-500 shadow-md hover:shadow-sm">
                                <ChevronLeftIcon class="h-4 w-4" />
                            </button>
                            <!-- Temporarily disabling this part of pagination until links is fixed-->
                            <button 
                                @click="handlePageChange(item.url)"
                                v-for="(item, index) in displayPagination" 
                                :key="index" href="javascript:void(0)" 
                                :class="item.active === true ? 'current' : ''"
                                class="table-number-button">
                                {{ item.label }}
                            </button>
                            <button
                                @click="changeToNextPage"
                                href="#"
                                :class="next === null ? 'disabled' : ''"
                                class="relative inline-flex items-center ml-2 px-2 py-2 rounded-full bg-white text-sm font-medium text-gray-500 shadow-md hover:shadow-sm">
                                 <ChevronRightIcon class="h-4 w-4" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MetaPagination } from '@/types/TablePagination';
import UserAddIcon from '@/components/icons/UserAddIcon.vue';
import ViewIcon from '@/components/icons/ViewIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue';

export default defineComponent({
    name: 'DataTable',
    components: {
        UserAddIcon,
        ViewIcon,
        EditIcon,
        DeleteIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
    },
    props: {
        columns: {
            type: Array as any,
            required: true
        },
        data: {
            type: Array as any,
            required: true
        },
        meta: {
            type: Object as PropType<MetaPagination>,
            required: false
        },
        next: {
            type: null,
            required: false
        },
        prev: {
            type: null,
            required: false
        },
        type: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            currentSort: '' as string,
            currentSortDir: 'asc' as string
        }
    },
    methods: {
        onMaxItemsPerPageChange(event: any): void {
            let value = event.target.value
            this.$emit('maxItemsPerPageChange', value)
        },
        handlePageChange(url: string): void {
            this.$emit('pageChange', url as string)
        },
        changeToPreviousPage(): void {
            this.$emit('previousPage')
        },
        changeToNextPage(): void {
            this.$emit('nextPage')
        },
        sort(s: string): void {
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
        }
    },
    computed: {
        displayPagination() {
            if (this.meta && this.meta.links){
                return this.meta.links.slice(1, -1)
            } else {
                return null
            }
        },
        itemsInPage(): any[] {
            return this.data
        },
        sortedItems(): any[] {
            return this.itemsInPage.sort((a: any, b: any) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            });
        },
        textColumns(): any[] {
            return this.columns
        },
        canUserEdit(): boolean | null {
            if (this.$store.state.user.permissions !== undefined) {
                return this.$store.state.user.permissions[this.type].edit
            } else {
                return null
            }
        },
        canUserView(): boolean | null {
            if (this.$store.state.user.permissions !== undefined) {
                return this.$store.state.user.permissions[this.type].view
            } else {
                return null
            }
        },
        canUserDelete(): boolean | null {
            if (this.$store.state.user.permissions !== undefined) {
                return this.$store.state.user.permissions[this.type].delete
            } else {
                return null
            } 
        },
        isUsingProfile(): any {
            if (this.$route.name === 'UserList') return true
            return false
        }
    }
});
</script>
<style scoped>
@media (max-width: 1024px) {
    table {
        border: 0;
    }
    table caption {
        font-size: 1.3em;
    }
        
    table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
    
    table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: .625em;
    }
    
    table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;
    }
    
    table td::before {
        /*
        * aria-label has no advantage, it won't be read inside a table
        content: attr(aria-label);
        */
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
    }
    
    table td:last-child {
        border-bottom: 0;
    }
}
</style>