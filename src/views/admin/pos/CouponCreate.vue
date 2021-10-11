<template>
  <div>
    
    <div class="flex flex-nowrap justify-between mb-2">
      <p class="text-2xl mb-4">Add Coupon</p>
      <div class="text-right">
        <button
          class="base-btn-outline" 
          @click="$router.go(-1)">
          Back
        </button>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex flex-col py-2">
        <label class="label" for="discount">Discount:</label>
        <input
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900" 
          type="number" 
          name="discount" 
          v-model="discount" 
          placeholder="John Doe"
        >
      </div>
      <div class="flex flex-col py-2">
        <label class="label" for="start_date">Start Date:</label>
        <input 
          type="date"
          v-model="start_date"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
      </div>
      <div class="flex flex-col py-2">
        <label class="label" for="end_date">End Date:</label>
        <input 
          type="date"
          v-model="end_date"
          class="p-3 rounded-md border-solid border-2 border-gray-200 focus:border-gray-900">
      </div>
      <div class="flex flex-col py-2">
        <label class="label" for="active">Active:</label>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input v-model="active" type="checkbox" name="active" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"/>
          <label for="active" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
      </div>
            <div class="my-2 text-right">
        <button class="base-btn-outline ml-2" @click="addCoupon">Save and create a new one</button>
        <button class="base-btn ml-2" @click="addCouponAndRedirect">Save and exit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CouponService from "@/services/CouponService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'CouponCreate',
  data() {
    return {
      discount: 0,
      start_date: '',
      end_date: '',
      active: false
    }
  },
  methods: {
    async addCoupon(): Promise<void> {
      let data = {
        discount: this.discount,
        start_date: this.start_date,
        end_date: this.end_date,
        active: this.active
      }
      let token = this.$store.state.bearerToken
      await CouponService.create(data, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.discount} successfully added to database!`,
            type: "success"
          })
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error adding that Coupon to the database.`,
            type: "error"
          })
          console.log(e)
        });
    },
    async addCouponAndRedirect(): Promise<void> {
      let data = {
        discount: this.discount,
        start_date: this.start_date,
        end_date: this.end_date,
        active: this.active
      }
      let token = this.$store.state.bearerToken
      await CouponService.create(data, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `${this.discount} successfully added to database!`,
            type: "success"
          })
          this.$router.push({name: 'CouponList'})
        })
        .catch((e: Error) => {
          this.$toast.open({
            message: `There was an error adding that coupon to the database.`,
            type: "error"
          })
          console.log(e)
        });
    },
  }
});
</script>