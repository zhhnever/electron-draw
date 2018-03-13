// import joint from '../../assets/libs/rappid.min.js'

const state = {
  toolbar: null
}
const getters = {}
const actions = {}
const mutations = {
  initToolBar: function (state, toolbar) {
    state.toolbar = toolbar
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
