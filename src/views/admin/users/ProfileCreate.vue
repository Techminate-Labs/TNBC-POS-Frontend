<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Add User Profile</h1>
			<button 
				@click="$router.go(-1)" 
				class="base-btn-outline float-right">
				Back
			</button>
		</div>
		<div class="grid grid-cols-2 gap-4 pt-4 bg-white p-4 rounded-lg shadow-md">
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="first_name">
				First Name
				<input 
					type="text"
					id="first_name"
					class="text-input"
					placeholder="John"
					v-model="user.first_name"
				/>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="last_name">
				Last Name
				<input 
					type="text"
					id="last_name"
					class="text-input"
					placeholder="Doe"
					v-model="user.last_name"
				/>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="mobile">
				Mobile
				<input 
					type="text"
					id="mobile"
					class="text-input"
					placeholder="02 45 84 55 65"
					v-model="user.mobile"
				/>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="identity_number">
				ID Number
				<input 
					type="number"
					id="identity_number"
					class="text-input"
					placeholder="45685318"
					v-model="user.identity_number"
				/>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="present_address">
				Present Address
				<textarea
					id="present_address"
					cols="40"
					rows="2"
					class="text-input"
					placeholder="45 Freedom Av."
					v-model="user.present_address">
				</textarea>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="permanent_address">
				Permanent Address
				<textarea 
					id="permanent_address"
					cols="40"
					rows="2"
					class="text-input"
					placeholder="45 Freedom Av."
					v-model="user.permanent_address">
				</textarea>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="city">
				City
				<input 
					type="text"
					id="city"
					class="text-input"
					placeholder="New York"
					v-model="user.city"
				/>
			</label>
			<label class="label flex flex-col py-2 grid-span-1 mb-2" for="zip">
				Zip Code
				<input 
					type="text"
					id="zip"
					class="text-input"
					placeholder="456 21"
					v-model="user.zip"
				/>
			</label>
			<div class="border-2 border-gray-200 rounded-md p-4">
				<div class="flex flex-row justify-between">
					<p>Image</p>
					<label class="flex flex-row items-center px-4 py-2 hover:text-blue-800 rounded-lg uppercase cursor-pointer">
						<svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
							<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
						</svg>
						<span class="ml-2">Select a file</span>
						<input @change="handleFileChange($event)" type='file' accept="image/*" class="hidden" />
					</label>
				</div>
				<div v-show="user.imagePreview.length">
					<p class="uppercase text-sm font-light">Preview</p>
					<img :src="user.imagePreview" class="w-48 mb-6" />
				</div>
			</div>
			<div class="self-end">
				<button class="base-btn float-right" @click="addUserProfile">Save and exit</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from "@/services/users/ProfileService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: 'ProfileCreate',
  data() {
    return {
       user: {
        first_name:        '' as string,
        last_name:         '' as string,
        email:             '' as string,
        mobile:            '' as string,
        present_address:   '' as string,
        permanent_address: '' as string,
        city:              '' as string,
        zip:               '' as string,
        identity_number:   '' as string,
        image:             null as any,
        imagePreview:      '' as any
      }
    }
  },
  methods: {
    async addUserProfile(): Promise<void> {
      let token = this.$store.state.session.bearerToken
      let user_id: any = this.$route.params.user_id
      const fd = new FormData()
      fd.append('user_id', user_id)
      fd.append('first_name', this.user.first_name)
      fd.append('last_name', this.user.last_name)
      fd.append('mobile', this.user.mobile)
      fd.append('present_address', this.user.present_address)
      fd.append('permanent_address', this.user.permanent_address)
      fd.append('identity_number', this.user.identity_number)
      fd.append('zip', this.user.zip)
      fd.append('city', this.user.city)
      fd.append('image', this.user.image, this.user.image.name)
      console.log('form data', fd)

      await ProfileService.create(fd, token)
        .then((response: ResponseData) => {
          this.$toast.open({
            message: `Profile has been successfully added to the database!`,
            type: "success"
          })
          this.$router.push({ name: 'UserList' })
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    handleFileChange(e: any): void {
      this.user.image = e.target.files[0]
      this.user.imagePreview = URL.createObjectURL(e.target.files[0])
    }
  }
});
</script>