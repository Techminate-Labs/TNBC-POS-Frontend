<template>
	<div>
		<div>
			<h1>We Accept TNBC</h1>
			<qrcode-vue :value="value" :size="size" level="H" />
			<p>Public key: a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0</p>
		</div>
	</div>  
</template>

<script>
import { defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue'

export default defineComponent({
	name: 'GeneratedQrCode',
	components: { QrcodeVue },
	data(){
		return {
			value: 'a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0'
		}
	}
})
</script>

<style>

</style>