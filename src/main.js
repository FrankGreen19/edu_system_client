import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import axios from 'axios'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.prototype.axios = axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
