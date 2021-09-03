import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios, { AxiosStatic } from 'axios';
import VueToast from 'vue-toast-notification';
// Import any of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';
import '@/index.css'

axios.defaults.baseURL = 'http://192.168.1.225:8088';

let toastOptions = {
  position: 'top-right',
  duration: 8000,
  dismissible: true
}

createApp(App).use(store).use(router).use(VueToast, toastOptions).mount('#app')