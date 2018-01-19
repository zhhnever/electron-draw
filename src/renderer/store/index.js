import Vue from 'vue'
import Vuex from 'vuex'
import paper from './modules/paper'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    paper
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
