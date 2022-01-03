<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2 pt-4">
			<h1 class="display-h1">Item Details</h1>
			<div class="text-right">
				<button
					class="base-btn-outline mb-2" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-md">
			<div class="grid-span-1 p-4">
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Name</h3>
				<p class="text-gray-500 text-md">{{ item.name }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Category</h3>
				<p class="text-gray-500 text-md">{{ item.category }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Unit</h3>
				<p class="text-gray-500 text-md">{{ item.unit }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Price</h3>
				<p class="text-gray-500 text-md">{{ item.price }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">SKU ID</h3>
				<p class="text-gray-500 text-md">{{ item.sku }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Available to Purchase</h3>
				<p class="text-gray-500 text-md">{{ item.available }}</p>
				</div>
			</div>
			<div class="grid-span-1 p-4">
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Slug</h3>
				<p class="text-gray-500 text-md">{{ item.slug }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Brand</h3>
				<p class="text-gray-500 text-md">{{ item.brand }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Supplier</h3>
				<p class="text-gray-500 text-md">{{ item.supplier }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Discount</h3>
				<p class="text-gray-500 text-md">{{ item.discount }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Inventory</h3>
				<p class="text-gray-500 text-md">{{ item.inventory }}</p>
				</div>
				<div class="flex flex-col py-2">
				<h3 class="text-xl capitalize">Expired Date</h3>
				<p class="text-gray-500 text-md">{{ item.expire_date }}</p>
				</div>
			</div>
			<div class="grid-span-1 p-4">
				<div class="flex flex-col py-2 justify-between h-full">
					<div>
						<h3 class="font-regular text-xl capitalize">Image</h3>
						<img class="w-36 h-auto" :src="item.image" :alt="item.name"/>
					</div>
					<div class="place-self-end self-end">
						<button class="base-btn float-right" 
							@click="generateBarcode"
							v-show="!$store.getters.userCan('list', 'Items')">
							Generate Barcode
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemService from "@/services/items/ItemService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ItemCreate',
  data() {
    return {
      item: {} as any
    }
  },
  methods: {
    async fetchItem(): Promise<void> {
      let token = this.$store.state.session.bearerToken
      let id = this.$route.params.id
      await ItemService.getById(id, token)
        .then((response: ResponseData) => {
            this.item = response.data
          })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    generateBarcode(): void {
		console.log(this.item)
      	this.$router.push({ 
			name: 'BarcodeList', 
			params: { 
				item_id: this.item.item_id, 
				inventory: this.item.inventory,
				sku: this.item.sku,
			} 
		})
    }
  },
  async mounted() {
    this.fetchItem()
  }
});
</script>