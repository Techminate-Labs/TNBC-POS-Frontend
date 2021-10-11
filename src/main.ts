import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
// import axios, { AxiosStatic } from 'axios';
import VueToast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-default.css';
import '@/index.css'

// axios.defaults.baseURL = 'http://192.168.1.225:8088';

let toastOptions = {
  position: 'top-right',
  duration: 6000,
  dismissible: true
}

createApp(App).use(store).use(router).use(VueToast, toastOptions).mount('#app')