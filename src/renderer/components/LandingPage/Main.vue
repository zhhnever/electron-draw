<template>
  <div>
    <div id="toolbar"></div>
    <div class="list">
      <ul>
        <li class="selected">
          <img src="../../assets/images/icon.png" alt="">
          <span>基础</span>
        </li>
        <li>
          <img src="../../assets/images/icon.png" alt="">
          <span>架空线路设备</span>
        </li>
        <li>
          <img src="../../assets/images/icon.png" alt="">
          <span>厂站</span>
        </li>
        <li>
          <img src="../../assets/images/icon.png" alt="">
          <span>用电设备</span>
        </li>
        <li>
          <img src="../../assets/images/icon.png" alt="">
          <span>公共设备</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <ul>
        <li>
          <div id="basicStencil"></div>
        </li>
        <li>
          <div id=""></div>
        </li>
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
          <table class="altrowstable">
            <tbody>
              <tr>
                <td colspan="2">线路名称</td>
                <td>XXX线路</td>
              </tr>
              <tr>
                <td rowspan="7">户台KVA</td>
              </tr>
              <tr>
                <td>杆上公变</td>
                <td>{{ elementCounts.rect }}</td>
              </tr>
              <tr>
                <td>箱式公变</td>
                <td>{{ elementCounts.substation }}</td>
              </tr>
              <tr>
                <td>室内公变</td>
                <td>0</td>
              </tr>
              <tr>
                <td>专变</td>
                <td>{{ elementCounts.circle }}</td>
              </tr>
              <tr>
                <td>开关</td>
                <td>{{ elementCounts.switch }}</td>
              </tr>
              <!-- <tr>
                <td>双电源</td>
                <td>2</td>
              </tr> -->
              <!-- <tr>
                <td rowspan="10">线路</td>
              </tr>
              <tr>
                <td>专变</td>
                <td>$80</td>
              </tr>
              <tr>
                <td>配变总数</td>
                <td>1</td>
              </tr>
              <tr>
                <td>双电源</td>
                <td>2</td>
              </tr> -->
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
import $ from 'jquery'
import _ from 'lodash'
import BasicStencil from '../Stencil/Basic'
export default {
  data: function () {
    return {
      config: {
        groups: {
          'undo-redo': {
            index: 1
          },
          'clear': {
            index: 2
          },
          'export': {
            index: 3
          },
          'print': {
            index: 4
          },
          'fullscreen': {
            index: 5
          },
          'order': {
            index: 6
          },
          'layout': {
            index: 7
          },
          'zoom': {
            index: 8
          },
          'grid': {
            index: 9
          },
          'snapline': {
            index: 10
          }
        },
        tools: [{
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
        // {
        //   type: 'button',
        //   name: 'png',
        //   group: 'export',
        //   text: '导出PNG',
        //   attrs: {
        //     button: {
        //       id: 'btn-png',
        //       'data-tooltip': 'Open as PNG in a pop-up',
        //       'data-tooltip-position': 'top',
        //       'data-tooltip-position-selector': '.toolbar-container'
        //     }
        //   }
        // },
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
        }
        ],
        stencil: [
          {
            type: 'basic.isolationSwitch',
            size: {
              width: 15,
              height: 44
            },
            position: {
              x: 470,
              y: 20
            }
          },
          {
            type: 'basic.loadSwitch',
            size: {
              width: 15,
              height: 44
            },
            position: {
              x: 570,
              y: 20
            }
          }
        ]
      },
      paper: '',
      graph: '',
      commandManager: '',
      paperScroller: '',
      tabShow: true,
      table: {},
      selection: '',
      stencil: '',
      snaplines: '',
      elementIdArrary: [],
      elementCounts: {
        rect: 0,
        substation: 0,
        switch: 0,
        circle: 0
      }
    }
  },
  components: {
    'basic-stencil': BasicStencil
  },
  mounted: function () {
    const _this = this
    this.tabChangeJQuery() // 标签页切换
    joint.setTheme('modern') // 主题风格
    this.$store.commit('init', $('#paperScroller')) // 初始化paper
    this.$store.commit('initStencil', $('#basicStencil')) // 初始化工具栏
    this.$store.commit('stencilLoadConfig', this.config.stencil) // 加载工具栏config
    this.$store.commit('initializeKeyboardShortcuts') // 加载快捷键

    let paper = this.paper = this.$store.state.paper.paper
    let graph = this.graph = this.$store.state.paper.graph
    let commandManager = this.commandManager = this.$store.state.paper.commandManager
    let paperScroller = this.paperScroller = this.$store.state.paper.paperScroller
    let selection = this.selection = this.$store.state.paper.selection
    let snaplines = this.snaplines = this.$store.state.paper.snaplines
    let stencil = this.stencil = this.$store.state.paper.stencil.basic
    // 监听元素点击事件
    paper.on('element:pointerup link:options', cellView => {
      // console.log(cellView)
      let cell = cellView.model
      _this.cellPulgin(cellView)
      _this.createInspector(cell)
    })
    let toolbar = new joint.ui.Toolbar({
      references: {
        paperScroller: this.paperScroller,
        commandManager: this.commandManager
      },
      tools: this.config.tools
    })
    // 绑定事件
    toolbar.on({
      'png:pointerclick': function () {
        _this.openAsPNG()
      },
      'to-front:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toFront'),
      'to-back:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toBack'),
      'snapline:change': _.bind(this.changeSnapLines, this),
      'clear:pointerclick': function () {
        _this.graph.clear()
        _this.elementIdArrary = []
      },
      'print:pointerclick': function () {
        console.log(_this.paper)
        _this.paper.print()
      },
      'grid-size:change': _.bind(this.paper.setGridSize, this.paper)
    })
    $('#toolbar').append(toolbar.el)
    toolbar.render()

    // 画板新增元素之后,统计栏数量+1
    // 开关新增之后,给开关绑定事件
    graph.on('remove', cell => {
      let type = cell.get('type')
      switch (type) {
        case 'basic.Substation':
          _this.elementCounts.substation -= 1
          break
        case 'basic.Circle':
          _this.elementCounts.circle -= 1
          break
        case 'basic.Rect':
          _this.elementCounts.rect -= 1
          break
        case 'basic.switch':
          _this.elementCounts.switch -= 1
          break
      }
    })
  },
  methods: {
    cellPulgin: function (cellView) {
      let cell = cellView.model
      console.log(cell)
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
        options.pieToggles = [{
          name: 'left',
          position: 'w'
        },
        {
          name: 'right',
          position: 'e'
        },
        {
          name: 'top',
          position: 'n'
        },
        {
          name: 'bottom',
          position: 's'
        }
        ]
      }
      let halo = new joint.ui.Halo(options)
      halo.render()
    },
    createInspector: function (cell) {
      joint.ui.Inspector.create('#config', _.extend({
        cell: cell
      }, inspectorConfig.inspectorConfig[cell.get('type')]))
    },
    changeSnapLines: function (checked) {
      if (checked) {
        this.snaplines.startListening()
        this.stencil.options.snaplines = this.snaplines
      } else {
        this.snaplines.stopListening()
        this.stencil.options.snaplines = null
      }
    },
    openAsPNG: function () {
      this.paper.toPNG(function (dataURL) {
        new joint.ui.Lightbox({
          title: '(右键另存为即可保存图片)',
          image: dataURL
        }).open()
      }, {
        padding: 10,
        useComputedStyles: false,
        stylesheet: this.exportStylesheet
      })
    },
    changeLinkColor: function (element, color) {
      let childCells = this.graph.getSuccessors(element)
      childCells.map(child => {
        let links = this.graph.getConnectedLinks(child, {
          inbound: true
        })
        links.map(link => {
          link.attr({
            '.connection': {
              stroke: color
            }
          })
        })
      })
    },
    tabChangeJQuery: function () {
      $('.list').find('li').click(function () {
        let index = $(this).index()
        $(this).addClass('selected').siblings().removeClass('selected')
        $('.content').find('li').eq(index).siblings().hide(100, function () {
          $('.content').find('li').eq(index).show(200)
        })
      })
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
  border-top: #333333 solid 1px;
  background-color: rgb(240, 240, 240);
  overflow: scroll;
  overflow-x: hidden;
}

table.altrowstable {
  /* font-family: verdana, arial, sans-serif; */
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
}

table.altrowstable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}

table.altrowstable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}

.oddrowcolor {
  background-color: #d4e3e5;
}

.evenrowcolor {
  background-color: #c3dde0;
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