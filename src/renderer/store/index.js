import Vue from 'vue'
import Vuex from 'vuex'
import paper from './modules/paper'
import toolbar from './modules/toolbar'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    paper,
    toolbar
  }
})
export default store
