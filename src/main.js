import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:10089/pi_api'
Vue.config.productionTip = false

let app = null
console.log('-----测试是否进入子应用', window.__MICRO_APP_ENVIRONMENT__);
// 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  console.log('-----test mounted-----');
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
}

// 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
  console.log('----test unmounted----');
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
}


// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  console.log('----======');
  window.mount()
}


