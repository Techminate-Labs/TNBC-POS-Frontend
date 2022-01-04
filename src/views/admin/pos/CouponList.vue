<template>
	<div>  
		<div class="flex flex-nowrap justify-between">
			<h1 class="display-h1">Coupon List</h1>
			<router-link :to="{ name: 'CouponCreate' }">
				<button 
					v-show="!$store.getters.userCan('create', 'Coupon')"
					class="base-btn">
					Create Coupon
				</button>
			</router-link>
		</div>
		<DataTable
			:columns="columns"
			:next="next"
			:prev="prev"
			:meta="meta"
			:data="data"
			:type="type"
			@handleSearch="searchCoupon"
			@handleAddProfile="addCouponProfile"
			@handleView="viewCoupon"
			@handleEdit="editCoupon"
			@handleDelete="showDeleteModal"
			@pageChange="pageChange" 
			@previousPage="previousPage" 
			@nextPage="nextPage" 
			@maxItemsPerPageChange="pageLimitChange" />
		<div class="hidden" :class="isDeleting ? 'active' : ''">
			<DeleteModal @handleConfirmDelete="deleteCoupon" @close-modal="isDeleting = false" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '@/components/tables/DataTable.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import CouponService from "@/services/items/CouponService";
import { CouponItem } from '@/types/items/Coupons'
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: 'CouponList',
	components: {
		DataTable,
		DeleteModal
	},
	data() {
		return {
			next: '',
			prev: '',
			meta: {},
			data: [] as Array<CouponItem>,
			type: "Users",
			url: '/couponList',
			maxItemsPerPage: '' || undefined as unknown as string,
			isDeleting: false,
			selectedCouponId: 0 as number,
			columns: [
				{
					attribute: 'code',
					name: 'code'
				},
				{
					attribute: 'discount',
					name: 'value (%)'
				},
				{
					attribute: 'start_date',
					name: 'start'
				},
				{
					attribute: 'end_date',
					name: 'end'
				},
				{
					attribute: 'active',
					name: 'is_active'
				}
			]
		}
	},
	methods: {
		async fetchCoupons(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let url = this.url
			await CouponService.list(url, token)
				.then((response: ResponseData) => {
					let res = response.data
					console.log(res)
					this.data = res.data
					this.meta = {
						current_page: res.current_page,
						from: res.from,
						last_page: res.last_page,
						links: res.links,
						path: res.path,
						per_page: res.per_page,
						to: res.to,
						total: res.total
					}
					this.prev = res.prev_page_url
					this.next = res.next_page_url
				})
				.catch((e: Error) => {
					console.log(e);
			});
		},
		async pageChange(url: string): Promise<void> {
			let limit = this.maxItemsPerPage
			this.url = `${url}&limit=${limit}`
			await this.fetchCoupons()
		},
		async pageLimitChange(limit: string): Promise<void> {
			let url = this.url
			this.maxItemsPerPage = limit
			this.url = `${url}?limit=${limit}`
			await this.fetchCoupons()
		},
		async previousPage(): Promise<void> {
			if (this.prev !== null){
				let url = this.prev
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchCoupons()
			}
		},
		async nextPage(): Promise<void> {
			if (this.next !== null){
				let url = this.next
				let limit = this.maxItemsPerPage
				this.url = `${url}&limit=${limit}`
				await this.fetchCoupons()
			}
		},
		addCouponProfile(item: any): void {
			this.$router.push({name:'ProfileCreate', params: {id: item.id}})
		},
		viewCoupon(item: any): void {
			this.$router.push({name:'ProfileDetails', params: {id: item.id}})
		},
		editCoupon(item: any): void {
			this.$router.push({name:'CouponUpdate', params: {id: item.id}})
		},
		showDeleteModal(item: any): any {
			this.isDeleting = true
			this.selectedCouponId = item.id
		},
		async deleteCoupon(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let id = this.selectedCouponId
			await CouponService.delete(id, token)
				.then((response: ResponseData) => {
					this.isDeleting = false
					this.fetchCoupons()
					this.$toast.open({
						message: `Coupon successfully deleted.`,
						type: "success"
					})
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `Could not delete that coupon.`,
						type: "error"
					})
					console.log(e)
			});
		},
		async searchCoupon(event: any): Promise<void> {
			let token = this.$store.state.session.bearerToken
			let value = event.target.value
			let url = `/couponList/?q=${value}`
			
			if (value.length > 2 || value.length === 0){
				await CouponService.list(url, token)
					.then((response: ResponseData) => {
						let res = response.data
						this.data = res.data
						this.meta = {
						current_page: res.current_page,
						from: res.from,
						last_page: res.last_page,
						links: res.links,
						path: res.path,
						per_page: res.per_page,
						to: res.to,
						total: res.total
						}
						this.prev = res.prev_page_url
						this.next = res.next_page_url
					})
					.catch((e: Error) => {
						console.log(e);
					});
			}
		}
	},
	async mounted(): Promise<void> {
		await this.fetchCoupons()
	},
});
</script>