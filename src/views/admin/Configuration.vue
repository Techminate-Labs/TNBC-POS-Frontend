<template>
	<div>
		<div class="flex flex-nowrap justify-between mb-2">
			<h1 class="display-h1">Configuration</h1>
			<div class="text-right">
				<button
				class="base-btn-outline" 
				@click="$router.go(-1)">
				Back
				</button>
			</div>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-md">
			<div class="grid grid-col-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col py-2">
					<label class="label" for="app_name">App Name:</label>
					<input
					class="text-input" 
					type="text" 
					id="app_name" 
					v-model="configuration.app_name" 
					placeholder="Point Of Sale"
					>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="store_name">Store Name:</label>
					<input
					class="text-input" 
					type="text" 
					id="store_name" 
					v-model="configuration.store_name" 
					placeholder="ACME Inc."
					>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="currency">
						Currency
						<Multiselect
								v-model="configuration.currency"
								@select="handleCurrencySelection"
								:options="getCurrenciesOptions"
								:searchable="true"
								placeholder="US Dollar"
						/>
					</label>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="currency_symbl">
						Currency Symbol
						<Multiselect
								v-model="configuration.currency_symble"
								:options="getCurrenciesSymbolsOptions"
								:searchable="true"
								placeholder="$ - (US Dollar)"
							/>
					</label>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="tax_rate">Tax Rate (in %):</label>
					<input
					class="text-input"
					type="number" 
					id="tax_rate" 
					v-model="configuration.tax_rate" 
					placeholder="25"
					>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="tnbc_rate">TNBC Rate:</label>
					<input
					class="text-input" 
					type="number" 
					id="tnbc_rate" 
					v-model="configuration.tnbc_rate" 
					placeholder="0.02"
					>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="protocol">Bank Protocol:</label>
					<select v-model="configuration.protocol" class="text-input">
						<option :value="null">-- Please select an option --</option>
						<option value="http">http</option>
						<option value="https">https</option>
					</select>
				</div>
				<div class="flex flex-col py-2">
					<label class="label" for="bank">Bank:</label>
					<select v-model="configuration.bank" class="text-input">
						<option :value="null">-- Please select an option --</option>
						<option value="20.98.98.0">Testnet</option>
						<option value="54.183.16.194">The New Boston</option>
						<option value="45.56.92.194">Keysign</option>
					</select>
				</div>
			</div>
			<div class="">
				<div class="flex flex-col py-2">
					<label class="label" for="tnbc_pk">TNBC Public Key:</label>
					<input
					class="text-input" 
					type="text" 
					id="tnbc_pk" 
					v-model="configuration.tnbc_pk" 
					placeholder="a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0"
					>
				</div>
			</div>
			<div class="">
				<div class="flex flex-col py-2">
					<label class="label" for="time_zone">Time Zone:</label>
					<select v-model="configuration.time_zone" class="text-input">
						<option :value="null">-- Please select an option --</option>
						<option value="UTC+14">UTC+14</option>
						<option value="UTC+13">UTC+13</option>
						<option value="UTC+12">UTC+12</option>
						<option value="UTC+11">UTC+11</option>
						<option value="UTC+10">UTC+10</option>
						<option value="UTC+9">UTC+9</option>
						<option value="UTC+8">UTC+8</option>
						<option value="UTC+7">UTC+7</option>
						<option value="UTC+6">UTC+6</option>
						<option value="UTC+5">UTC+5</option>
						<option value="UTC+4">UTC+4</option>
						<option value="UTC+3">UTC+3</option>
						<option value="UTC+2">UTC+2</option>
						<option value="UTC+1">UTC+1</option>
						<option value="UTC+0">UTC+0</option>
						<option value="UTC-1">UTC-1</option>
						<option value="UTC-2">UTC-2</option>
						<option value="UTC-3">UTC-3</option>
						<option value="UTC-4">UTC-4</option>
						<option value="UTC-5">UTC-5</option>
						<option value="UTC-6">UTC-6</option>
						<option value="UTC-7">UTC-7</option>
						<option value="UTC-8">UTC-8</option>
						<option value="UTC-9">UTC-9</option>
						<option value="UTC-10">UTC-10</option>
						<option value="UTC-11">UTC-11</option>
						<option value="UTC-12">UTC-12</option>
					</select>
				</div>
			</div>
			<div class="grid grid-col-1 md:grid-cols-2 gap-4">
				<div class="bg-gray-100">
					<div class="border-2 border-gray-200 rounded-md p-4">
						<div class="flex flex-row justify-between">
							<p>App Logo</p>
							<label class="flex flex-row items-center px-4 py-2 hover:text-blue-800 rounded-lg uppercase cursor-pointer">
								<svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
								</svg>
								<span class="ml-2">Select a file</span>
								<input @change="handleAppLogoFile($event)" type='file' accept="image/*" class="hidden" />
							</label>
						</div>
						<img :src="configuration.app_logo" class="w-48 mb-6" alt="App Logo" />
						<div>
							<p class="uppercase text-sm font-light">Preview</p>
							<div class="flex flex-nowrap">
								<img :src="newAppLogoPreview" class="w-48 mb-6" />
								<CancelIcon class="w-6 h-6 hover:text-red-600 cursor-pointer" @click="cancelAppLogoUpload" />
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-100">
					<div class="border-2 border-gray-200 rounded-md p-4">
						<div class="flex flex-row justify-between">
							<p>Store Logo</p>
							<label class="flex flex-row items-center px-4 py-2 hover:text-blue-800 rounded-lg uppercase cursor-pointer">
								<svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
								</svg>
								<span class="ml-2">Select a file</span>
								<input @change="handleAppLogoFile($event)" type='file' accept="image/*" class="hidden" />
							</label>
						</div>
						<img :src="configuration.store_logo" class="w-48 mb-6" alt="App Logo" />
						<div>
							<p class="uppercase text-sm font-light">Preview</p>
							<div class="flex flex-nowrap">
								<img :src="newStoreLogoPreview" class="w-48 mb-6" />
								<CancelIcon class="w-6 h-6 hover:text-red-600 cursor-pointer" @click="cancelStoreLogoUpload" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="my-2 text-right">
				<button class="base-btn ml-2" @click="saveConfiguration">Save</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { currencies } from 'currencies.json'
import Multiselect from '@vueform/multiselect'

// components
import CancelIcon from '@/components/icons/CancelIcon.vue'

// types and services
import { Configuration } from '@/types/Configuration'
import ConfigurationService from '@/services/ConfigurationService'

export default defineComponent({
	name: 'Configuration',
	components: { CancelIcon, Multiselect },
	data() {
		return {
			configuration: {} as Configuration,
			newStoreLogo: null as any,
			newStoreLogoPreview: '' as any,
			newAppLogo: null as any,
			newAppLogoPreview: '' as any,
			currencyValue: { code: '', symbol: '' } as Object
		}
	},
	methods: {
		async fetchConfiguration(): Promise<void> {
			let token = this.$store.state.session.bearerToken
			await ConfigurationService.list(token)
				.then((response) => {
					this.configuration = response.data
				})
				.catch((e: Error) => {
					this.$toast.open({
						message: `There was an error fetching the configuration.`,
						type: "error"
					})
					console.log(e)
				});
		},
		async saveConfiguration(): Promise<void> {
			const fd = new FormData()
			fd.append('app_name', this.configuration.app_name)
			fd.append('store_name', this.configuration.store_name)
			fd.append('currency', this.configuration.currency)
			fd.append('currency_symble', this.configuration.currency_symble)
			fd.append('tnbc_pk', this.configuration.tnbc_pk)
			fd.append('tnbc_rate', this.configuration.tnbc_rate)
			fd.append('tax_rate', this.configuration.tax_rate)
			fd.append('protocol', this.configuration.protocol)
			fd.append('bank', this.configuration.bank)
			fd.append('time_zone', this.configuration.time_zone)
			fd.append('app_logo', this.newAppLogo)
			fd.append('store_logo', this.newStoreLogo)
			fd.append('_method', 'PUT')

			this.$store.dispatch('settings/setTaxRate', this.configuration.tax_rate)
			this.$store.dispatch('settings/setTNBCRate', this.configuration.tnbc_rate)
			this.$store.dispatch('settings/setCurrency', { 
				currency: this.configuration.currency, 
				currencySign: this.configuration.currency_symble  
			})
			this.$store.dispatch('settings/setTNBCRate', this.configuration.tnbc_rate)

			let token = this.$store.state.session.bearerToken
			await ConfigurationService.update(fd, token)
				.then((json) => {
					console.log('json', json)
					this.$toast.open({
						message: `Your configuration has been updated.`,
						type: "success"
					})
				})
				.catch(({ response }) => {
					this.$toast.open({
						message: `${response.data.message}`,
						type: "error"
					})
					console.log(response)
				});
		},
		handleAppLogoFile(e: any): void {
			this.newAppLogoPreview = URL.createObjectURL(e.target.files[0])
			this.newAppLogo = e.target.files[0]
		},
		handleStoreLogoFile(e: any): void {
			this.newStoreLogoPreview = URL.createObjectURL(e.target.files[0])
			this.newStoreLogo = e.target.files[0]
		},
		cancelAppLogoUpload(): void {
			this.newAppLogo = null
			this.newAppLogoPreview = ''
		},
		cancelStoreLogoUpload(): void {
			this.newStoreLogo = null
			this.newStoreLogoPreview = ''
		},
		handleCurrencySelection(option: string): void {
			const symbol = currencies.filter((currency) => currency.code === option)[0].symbol
			this.configuration.currency_symble = symbol
		},
		codeWithSymbol({ code, symbol }: any) {
			return `${code} - [${symbol}]`
		}
	},
	computed: {
		getCurrenciesOptions(){
			let _: Array<any> = []
			currencies.map(function(currency: any) {
				_.push({
					value: currency.code,
					label: currency.name
				})
			})
			return _
		},
		getCurrenciesSymbolsOptions(){
			let _: Array<any> = []
			currencies.map(function(currency: any) {
				_.push({
					value: currency.symbol,
					label: `${currency.symbol} - (${currency.name})`
				})
			})
			return _
		}
	},
	mounted() {
		this.fetchConfiguration()
	}
});
</script>