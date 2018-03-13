import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'
import VueElectron from 'vue-electron'

Vue.use(Vuex)
Vue.use(store)
Vue.use(VueElectron)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
