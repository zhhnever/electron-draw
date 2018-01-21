import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'
import joint from './assets/libs/rappid.min.js'

Vue.use(Vuex)
Vue.use(store)
Vue.use(joint)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
