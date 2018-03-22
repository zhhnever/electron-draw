import Vue from 'vue'
import Vuex from 'vuex'
import paper from './modules/paper'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    paper
  }
})
export default store
