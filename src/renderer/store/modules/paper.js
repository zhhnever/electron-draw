// joint paper module
import joint from '../../assets/libs/rappid.min.js'

const state = {
  paper: null,
  snaplines: null,
  graph: null,
  commandManager: null,
  toolbar: null,
  paperScroller: null,
  stencil: {
    basic: null
  },
  halo: null
}
const getters = {}

const actions = {}

const mutations = {
  // 初始化
  init: (state, dom) => {
    let graph = new joint.dia.Graph()
    state.graph = graph
    let paper = new joint.dia.Paper({
      width: 1600,
      height: 900,
      gridSize: 2,
      model: state.graph
    })
    paper.drawGrid()
    state.paper = paper
    let commandManager = state.commandManager = new joint.dia.CommandManager({ graph: graph })

    let paperScroller = state.paperScroller = new joint.ui.PaperScroller({
      paper: paper,
      autoResizePaper: true,
      padding: 50
    })
    dom.append(paperScroller.el)
    let snaplines = new joint.ui.Snaplines({
      paper: paper
    })
    snaplines.startListening()
    state.snaplines = snaplines
    paperScroller.render().center()
  },
  initStencil: (state, dom) => {
    let stencil = new joint.ui.Stencil({
      paper: state.paper,
      snaplines: state.snaplines,
      width: 400,
      height: 200,
      // search: { '*': ['type'] },
      dropAnimation: { duration: 100, easing: 'swing' }
    })
    dom.append(stencil.render().el)
    state.stencil.basic = stencil
  },
  stencilLoadConfig: (state, config) => {
    state.stencil.basic.render().load(config)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
