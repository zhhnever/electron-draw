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
<<<<<<< HEAD
  },
  halo: null
=======
  }
>>>>>>> cf859e13d98f6746507ccd6a30bf7d03b0167845
}
const getters = {}

const actions = {}

const mutations = {
<<<<<<< HEAD
  // 初始化
=======
>>>>>>> cf859e13d98f6746507ccd6a30bf7d03b0167845
  init: (state, dom) => {
    let graph = new joint.dia.Graph()
    state.graph = graph
    let paper = new joint.dia.Paper({
      width: 1600,
      height: 900,
<<<<<<< HEAD
      gridSize: 2,
=======
      gridSize: 10,
>>>>>>> cf859e13d98f6746507ccd6a30bf7d03b0167845
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
<<<<<<< HEAD
  },
  stencilLoadConfig: (state, config) => {
    state.stencil.basic.render().load(config)
=======
>>>>>>> cf859e13d98f6746507ccd6a30bf7d03b0167845
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
