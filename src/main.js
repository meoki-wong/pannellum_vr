import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
let axiosInstence = axios.create({
  baseURL: 'http://39.98.222.11:8080',
})
Vue.prototype.$axios = axiosInstence
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')