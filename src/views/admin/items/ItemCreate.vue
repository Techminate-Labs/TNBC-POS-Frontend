<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2 pt-4">
			<h1 class="display-h1">Add Product</h1>
			<div class="text-right ">
				<button
					class="base-btn-outline mb-2" 
					@click="$router.go(-1)">
					Back
				</button>
			</div>
		</div>
		<div class="flex flex-nowrap justify-between">
			<div class="w-6/12 h-full card">
				<label class="label flex flex-col py-2" for="name">
					Name
					<input
						class="text-input" 
						type="text" 
						id="name" 
						v-model="name" 
						placeholder="Winter Jacket"
					/>
				</label>
				<label class="label flex flex-col py-2" for="price">
					Price
					<input
						class="text-input" 
						type="text" 
						id="price" 
						v-model="price" 
						placeholder="15"
					/>
				</label>
				<label class="label flex flex-col py-2" for="discount">
					Discount
					<input
						class="text-input" 
						type="text" 
						id="discount" 
						v-model="discount" 
						placeholder="13"
					/>
				</label>
				<label class="label flex flex-col py-2" for="inventory">
					Inventory
					<input
						class="text-input" 
						type="text" 
						id="inventory" 
						v-model="inventory" 
						placeholder="3"
					/>
				</label>
				<button 
					class="base-btn float-right"
					v-show="$store.getters.userCan('create', 'Items')"
					@click="addItem">
					Save
				</button>
			</div>
			<div class="w-5/12 h-full">
				<div class="card w-full p-4">
					<label class="label flex flex-col py-2">
						Select Category
						<Multiselect
							v-model="categoryId"
							:options="getCategoryOptions"
							:searchable="true"
							placeholder="Pick a Category"
						/>
					</label>
					<label class="label flex flex-col py-2">
						Select Brand
						<Multiselect
							v-model="brandId"
							:options="getBrandOptions"
							:searchable="true"
							placeholder="Pick a Brand"
						/>
					</label>
					<label class="label flex flex-col py-2">
						Select Unit
						<Multiselect
							v-model="unitId"
							:options="getUnitOptions"
							:searchable="true"
							placeholder="Pick a Unit"
						/>
					</label>
					<label class="label flex flex-col py-2">
						Select Supplier
						<Multiselect
							v-model="supplierId"
							:options="getSupplierOptions"
							:searchable="true"
							placeholder="Pick a Supplier"
						/>
					</label>
				</div>
				<div class="card w-full my-2">
					<label class="label flex flex-col py-2">
						Available to Purchase
						<div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
							<input 
								v-model="available" 
								type="checkbox" 
								id="availability-toggle toggle"
								class="toggle-checkbox base-toggle-input"
							/>
							<label for="availability-toggle" class="toggle-label base-toggle-label"></label>
						</div>
					</label>
				</div>
				<div class="bg-white rounded-lg shadow-md p-4 mb-3">
					<label class="label flex flex-col py-2">
						Image
						<input 
							type="file"
							accept="image/*"
							@change="handleFileChange($event)"
							id="image"
							class="text-input"
						/>
					</label>
				</div>
				<div class="bg-white rounded-lg shadow-md p-4">
					<label class="label flex flex-col py-2">
						Expire Date
						<input 
							type="date"
							@change="handleDateChange($event)"
							class="text-input"
							/>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemService from "@/services/items/ItemService"
import CategoryService from '@/services/items/CategoryService'
import BrandService from '@/services/items/BrandService'
import UnitService from '@/services/items/UnitService'
import SupplierService from '@/services/items/SupplierService'
import Multiselect from '@vueform/multiselect'

export default defineComponent({
	name: 'ItemCreate',
	components: {
		Multiselect,
	},
	data() {
		return {
			categoryId: '',
			brandId: '',
			unitId: '',
			supplierId: '',
			name: '',
			price: '',
			discount: '',
			inventory: '',
			expireDate: '',
			available: '',
			image: null as any,
			categories: [],
			brands: [],
			units: [],
			suppliers: [],
		}
	},
	methods: {
		async addItem(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let date = new Date(this.expireDate)
			let available = '';
			if (this.available){
				available = '1'
			} else if (!this.available){
				available = '0'
			}
			const fd = new FormData()
			fd.append('category_id', this.categoryId)
			fd.append('brand_id', this.brandId)
			fd.append('unit_id', this.unitId)
			fd.append('supplier_id', this.supplierId)
			fd.append('name', this.name)
			fd.append('price', this.price)
			fd.append('discount', this.discount)
			fd.append('inventory', this.inventory)
			fd.append('expire_date', this.expireDate)
			fd.append('available', available)
			fd.append('image', this.image, this.image.name)
			await ItemService.create(fd, token)
				.then((response) => {
					this.$toast.open({
						message: `${this.name} has been successfully added to the database!`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error creating that item.`,
						type: "error"
					})
					console.log(e)
				});
		},
		handleFileChange(e: any): void {
			this.image = e.target.files[0]
		},
		handleDateChange(e: any): void {
			this.expireDate = e.target.value
		},
		async fetchCategories(): Promise<void> {
			let url = 'categoryList'
			let token = this.$store.state.session.bearerToken
			await CategoryService.list(`${url}/?limit=0`, token)
				.then((response) => {
					this.categories = response.data.data
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async fetchBrands(): Promise<void> {
			let url = 'brandList'
			let token = this.$store.state.session.bearerToken
			await BrandService.list(`${url}/?limit=0`, token)
				.then((response) => {
					this.brands = response.data.data
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async fetchUnits(): Promise<void> {
			let url = 'unitList'
			let token = this.$store.state.session.bearerToken
			await UnitService.list(`${url}/?limit=0`, token)
				.then((response) => {
					this.units = response.data.data
				})
				.catch((e: Error) => {
					console.log(e);
				});
		},
		async fetchSuppliers(): Promise<void> {
			let url = 'supplierList'
			let token = this.$store.state.session.bearerToken
			await SupplierService.list(`${url}/?limit=0`, token)
				.then((response) => {
					this.suppliers = response.data.data
				})
				.catch((e: Error) => {
					console.log(e);
				});
		}
	},
	computed: {
		getCategoryOptions(): Array<any> {
			let _: Array<any> = []
			this.categories.map(function(cat: any) {
				_.push({
				value: cat.id,
				label: cat.name
				})
			})
			return _
		},
		getBrandOptions(): Array<any> {
			let _: Array<any> = []
			this.brands.map(function(brand: any) {
				_.push({
				value: brand.id,
				label: brand.name
				})
			})
			return _
		},
		getUnitOptions(): Array<any> {
			let _: Array<any> = []
			this.units.map(function(unit: any) {
				_.push({
				value: unit.id,
				label: unit.name
				})
			})
			return _
		},
		getSupplierOptions(): Array<any> {
			let _: Array<any> = []
			this.suppliers.map(function(supplier: any) {
				_.push({
				value: supplier.id,
				label: supplier.name
				})
			})
			return _
		},
	},
	async mounted() {
		this.fetchCategories()
		this.fetchBrands()
		this.fetchUnits()
		this.fetchSuppliers()
	}
});
</script>

<style src="@vueform/multiselect/themes/default.css">
</style>