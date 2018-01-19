// joint paper module
const state = {
  paper: {},
  snaplines: {},
  graph: {},
  commandManager: {}
}
// const getters = {}

const actions = {}

const mutations = {
  initPaper: (state, paper) => {
    state.paper = paper
  },
  initSnaplines: (state, snaplines) => {
    state.snaplines = snaplines
  },
  initGraph: (state, graph) => {
    state.graph = graph
  },
  initCommandManager: (state, commandManager) => {
    state.commandManager = commandManager
  }
}

export {
  state,
  actions,
  mutations
}
