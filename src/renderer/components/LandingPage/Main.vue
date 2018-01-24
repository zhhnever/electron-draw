<template>
  <div>
    <div id="toolbar"></div>
    <div class="list">
      <ul>
        <li class="selected"><img src="../../assets/images/icon.png" alt="">
          <span>项目#</span>
        </li>
        <li><img src="../../assets/images/icon.png" alt="">
          <span>项目！</span>
        </li>
        <li><img src="../../assets/images/icon.png" alt="">
          <span>项目……</span>
        </li>
        <li><img src="../../assets/images/icon.png" alt="">
          <span>项目￥</span>
        </li>
        <li><img src="../../assets/images/icon.png" alt="">
          <span>项目&</span>
        </li>
        <li><img src="../../assets/images/icon.png" alt="">
          <span>项目#</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <ul>
        <li>
          <div id="basicStencil"></div>
        </li>
        <li>2222222222</li>
        <li>3333333333</li>
        <li>4444444444</li>
        <li>5555555555</li>
        <li>6666666666</li>
      </ul>
    </div>
    <div class="main">
      <div id="configuration" class="configuration">
        <div id="config" class="config"></div>
        <div id="table" class="table">
          <table class="table-pane">
            <tbody>
              <tr>
                <td>January</td>
                <td>$100</td>
              </tr>
              <tr>
                <td>February</td>
                <td>$80</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="paperScroller"></div>
    </div>

  </div>
</template>

<script>
import joint from '../../assets/libs/rappid.min.js'
import '../../assets/libs/joint.shapes.eqelement.js'
import inspectorConfig from '../../assets/libs/inspector.js'
import Vue from 'vue'
import _ from 'jquery'
import BasicStencil from '../Stencil/Basic'
export default {
  data: function () {
    return {
      config: {
        groups: {
          'undo-redo': { index: 1 },
          'clear': { index: 2 },
          'export': { index: 3 },
          'print': { index: 4 },
          'fullscreen': { index: 5 },
          'order': { index: 6 },
          'layout': { index: 7 },
          'zoom': { index: 8 },
          'grid': { index: 9 },
          'snapline': { index: 10 }
        },
        tools: [
          {
            type: 'undo',
            name: 'undo',
            attrs: {
              button: {
                'data-tooltip': 'Undo',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'redo',
            name: 'redo',
            attrs: {
              button: {
                'data-tooltip': 'Redo',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'button',
            name: 'clear',
            group: 'clear',
            text: '清除画板',
            attrs: {
              button: {
                id: 'btn-clear',
                'data-tooltip': 'Clear Paper',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'button',
            name: 'png',
            group: 'export',
            text: '导出PNG',
            attrs: {
              button: {
                id: 'btn-png',
                'data-tooltip': 'Open as PNG in a pop-up',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'button',
            name: 'print',
            group: 'print',
            text: '打印',
            attrs: {
              button: {
                id: 'btn-print',
                'data-tooltip': 'Open a Print Dialog',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'button',
            name: 'to-front',
            group: 'order',
            text: '上一层',
            attrs: {
              button: {
                id: 'btn-to-front',
                'data-tooltip': 'Bring Object to Front',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'button',
            name: 'to-back',
            group: 'order',
            text: '下一层',
            attrs: {
              button: {
                id: 'btn-to-back',
                'data-tooltip': 'Send Object to Back',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'label',
            name: 'zoom-slider-label',
            group: 'zoom',
            text: '缩放:'
          },
          {
            type: 'zoom-slider',
            name: 'zoom-slider',
            group: 'zoom'
          },
          {
            type: 'zoom-in',
            name: 'zoom-in',
            group: 'zoom',
            attrs: {
              button: {
                'data-tooltip': 'Zoom In',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'separator',
            group: 'grid'
          },
          {
            type: 'label',
            name: 'grid-size-label',
            group: 'grid',
            text: 'Grid size:',
            attrs: {
              label: {
                'data-tooltip': 'Change Grid Size',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'range',
            name: 'grid-size',
            group: 'grid',
            text: 'Grid size:',
            min: 1,
            max: 50,
            step: 1,
            value: 10
          },
          {
            type: 'separator',
            group: 'snapline'
          },
          {
            type: 'checkbox',
            name: 'snapline',
            group: 'snapline',
            label: 'Snaplines:',
            value: true,
            attrs: {
              input: {
                id: 'snapline-switch'
              },
              label: {
                'data-tooltip': 'Enable/Disable Snaplines',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'fullscreen',
            name: 'fullscreen',
            group: 'fullscreen',
            attrs: {
              button: {
                'data-tooltip': 'Toggle Fullscreen Mode',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          }
        ],
        stencil: [{
          type: 'basic.Rect',
          size: { width: 90, height: 50 },
          position: { x: 10, y: 20 },
          outPorts: [],
          attrs: {
            '.': {
              'data-tooltip': 'Substation',
              'data-tooltip-position': 'middle',
              'data-tooltip-position-selector': '.joint-stencil',
              'name': 'Substation',
              'data-element-code': ''
            },
            rect: {
              rx: 2,
              ry: 2,
              width: 50,
              height: 30,
              fill: 'transparent',
              stroke: '#31d0c6',
              'stroke-width': 2,
              'stroke-dasharray': '0'
            },
            text: {
              text: 'Substation',
              fill: '#000',
              'font-family': 'Roboto Condensed',
              'font-weight': 'bold',
              'font-size': 14,
              'stroke-width': 0,
              'y-alignment': 'middle'
            }
          }
        },
        {
          type: 'basic.Circle',
          size: { width: 50, height: 50 },
          position: { x: 140, y: 20 },
          attrs: {
            '.': {
              'data-tooltip': 'Ellipse',
              'data-tooltip-position': 'top',
              'data-tooltip-position-selector': '.joint-stencil'
            },
            circle: {
              width: 50,
              height: 30,
              fill: 'transparent',
              stroke: '#31d0c6',
              'stroke-width': 2,
              'stroke-dasharray': '0'
            },
            text: {
              text: 'ellipse',
              fill: '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0
            }
          }
        }]
      },
      paper: '',
      graph: '',
      commandManager: '',
      paperScroller: '',
      tabShow: true
    }
  },
  components: {
    'basic-stencil': BasicStencil
  },
  mounted: function () {
    const _this = this
    joint.setTheme('modern')
    this.$store.commit('init', _('#paperScroller')) // 初始化paper
    this.$store.commit('initStencil', _('#basicStencil')) // 初始化工具栏
    this.$store.commit('stencilLoadConfig', this.config.stencil) // 加载工具栏config

    this.$store.commit('initializeKeyboardShortcuts') // 加载工具栏config
    let paper = this.paper = this.$store.state.paper.paper
    let graph = this.graph = this.$store.state.paper.graph
    let commandManager = this.commandManager = this.$store.state.paper.commandManager
    let paperScroller = this.paperScroller = this.$store.state.paper.paperScroller
    paper.on('element:pointerup link:options', cellView => {
      // console.log(cellView)
      let cell = cellView.model
      _this.cellPulgin(cellView)
      _this.createInspector(cell)

      console.log(cell.get('type'))
    })
    let toolbar = new joint.ui.Toolbar({
      references: {
        paperScroller: this.paperScroller,
        commandManager: this.commandManager
      },
      tools: this.config.tools
    }).render()
    _('#toolbar').append(toolbar.el)
  },
  methods: {
    cellPulgin: function (cellView) {
      let cell = cellView.model
      if (cell.isLink()) return
      let options = {
        graph: this.graph,
        paper: this.paper,
        cellView: cellView,
        rotateAngleGrid: 2,
        type: 'surrounding',
        clone: function (cell, opt) {
          let clone = cell.clone().unset('z')
          if (opt.fork) clone.translate(cell.get('size').width + 20, 0)
          if (opt.clone) clone.translate(20, 20)
          return clone
        }
      }
      if (cell.get('multiplePieToggleButtons')) {
        options.pieToggles = [
          { name: 'left', position: 'w' },
          { name: 'right', position: 'e' },
          { name: 'top', position: 'n' },
          { name: 'bottom', position: 's' }
        ]
      }
      let halo = new joint.ui.Halo(options)
      halo.render()
      // this.paperScroller.append(halo.el)
      console.log(this.graph.getCells())
    },
    createInspector: function (cell) {
      joint.ui.Inspector.create('#config', _.extend({
        cell: cell
      }, inspectorConfig.inspectorConfig[cell.get('type')]))
    }
  }
}
</script>
<style scoped>
@import url("../../assets/libs/rappid.min.css");
.main {
  width: 100%;
  height: 100%;
  /* margin-top: 200px; */
}
#paperScroller {
  position: absolute;
  right: 0;
  left: 300px;
  top: 188px;
  bottom: 0;
  border: 1px solid rgb(240, 240, 240);
}
#configuration {
  position: absolute;
  width: 300px;
  /* height: 100%; */
  bottom: 0px;
  left: 0;
  top: 188px;
  border: 1px solid #cdcdcd;
}
.config {
  position: absolute;
  width: 100%;
  bottom: 300px;
  left: 0;
  top: 0;
}
.table {
  position: absolute;
  width: 300px;
  bottom: 0px;
  left: 0;
  height: 300px;
  padding: 20px;
}
.table-pane{
  border: 1px solid #000000;
}
.table-pane td{
  border: 1px solid #000000;
}
#bianya {
  height: 80px;
  /* margin-top: 20px */
}

.list {
  width: 100%;
  height: 30px;
}

.list ul {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #cdcdcd;
  user-select: none;
}

.list ul li {
  display: inline-block;
  padding: 0 5px;
  margin: 0;
}
.list ul .selected {
  background-color: rgb(240, 240, 240);
}
.list ul li img {
  width: 20px;
  vertical-align: middle;
  margin-bottom: 3px;
}
.list ul li span {
  font-size: 12px;
  line-height: 30px;
}

.content {
  width: 100%;
  height: 100px;
  background-color: rgb(240, 240, 240);
}
.content ul {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.content ul li {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: none;
}
.content ul li:first-child {
  display: block;
}
</style>
