// joint paper module
import joint, {
  layout
} from '../../assets/libs/rappid.min.js'
import '../../jointconfig/joint.shapes.eqelement.js'
import _ from 'lodash'
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
  halo: null,
  keyboard: null,
  clipboard: null,
  selection: null
}
const getters = {}

const actions = {}

const mutations = {
  // 初始化
  init: (state, dom) => {
    let graph = new joint.dia.Graph({
      type: 'bpmn'
    })
    state.graph = graph
    let paper = new joint.dia.Paper({
      width: 1600,
      height: 900,
      model: state.graph,
      defaultLink: new joint.shapes.app.Link,
      perpendicularLinks: true
    })
    paper.drawGrid()
    state.paper = paper
    let commandManager = state.commandManager = new joint.dia.CommandManager({
      graph: graph
    })

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

    // 初始化keyboard
  },
  initStencil: (state, dom) => {
    let stencil = new joint.ui.Stencil({
      paper: state.paper,
      snaplines: state.snaplines,
      width: 1920,
      height: 200,
      // search: { '*': ['type'] },
      dropAnimation: {
        duration: 100,
        easing: 'swing'
      },
      dragEndClone: function (element) {
        // 分支箱/环网柜 缩小
        if (element.attributes.type.toLowerCase().indexOf('cabinet') > -1) {
          element.scale(2 * 1.2016129032258065, 2 * 1.3095238095238095)
        }
        return element.clone()
      }
    })
    dom.append(stencil.render().el)
    state.stencil.basic = stencil
    // }
  },
  stencilLoadConfig: (state, config) => {
    state.stencil.basic.render().load(config)
  },
  initializeKeyboardShortcuts: (state) => {
    let keyboard = state.keyboard = new joint.ui.Keyboard()
    let clipboard = state.clipboard = new joint.ui.Clipboard() // 初始化剪切板
    let selection = state.selection = new joint.ui.Selection({
      paper: state.paper
    })

    state.paper.on('blank:pointerdown', selection.startSelecting)
    state.paper.on('cell:pointerup', function (cellView, evt) {
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
      if ((evt.ctrlKey || evt.metaKey) && !(cellView.model instanceof joint.dia.Link)) {
        selection.collection.add(cellView.model)
      }
    })

    selection.on('selection-box:pointerdown', function (cellView, evt) {
      // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
      if (evt.ctrlKey || evt.metaKey) {
        selection.collection.remove(cellView.model)
      }
    })

    keyboard.on({
      'ctrl+c': function () {
        // Copy all selected elements and their associated links.
        clipboard.copyElements(selection.collection, state.graph)
      },
      'ctrl+v': function () {
        let pastedCells = clipboard.pasteCells(state.graph, {
          translate: {
            dx: 20,
            dy: 20
          },
          useLocalStorage: true
        })

        let elements = _.filter(pastedCells, function (cell) {
          return cell.isElement()
        })

        // Make sure pasted elements get selected immediately. This makes the UX better as
        // the user can immediately manipulate the pasted elements.
        selection.collection.reset(elements)
      },
      'ctrl+x shift+delete': function () {
        clipboard.cutElements(selection.collection, state.graph)
      },

      'delete backspace': function (evt) {
        evt.preventDefault()
        state.graph.removeCells(selection.collection.toArray())
      },

      'ctrl+z': function () {
        state.commandManager.undo()
        selection.cancelSelection()
      },

      'ctrl+y': function () {
        state.commandManager.redo()
        selection.cancelSelection()
      },

      'ctrl+a': function () {
        selection.collection.reset(state.graph.getElements())
      },

      'ctrl+plus': function (evt) {
        evt.preventDefault()
        state.paperScroller.zoom(0.2, {
          max: 5,
          grid: 0.2
        })
      },

      'ctrl+minus': function (evt) {
        evt.preventDefault()
        state.paperScroller.zoom(-0.2, {
          min: 0.2,
          grid: 0.2
        })
      },

      'keydown:shift': function (evt) {
        state.paperScroller.setCursor('crosshair')
      },

      'keyup:shift': function () {
        state.paperScroller.setCursor('grab')
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
