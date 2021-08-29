import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios, { AxiosStatic } from 'axios';
import '@/index.css'

axios.defaults.baseURL = 'http://192.168.1.225:8088';

createApp(App).use(store).use(router).mount('#app')