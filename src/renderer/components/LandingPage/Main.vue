<template>
  <div>
    <div id="toolbar"></div>
    <div class="list">
      <ul>
        <li class="selected" name='basic'>
          <span>配电设备</span>
        </li>
        <li name='hw'>
          <span>环网柜</span>
        </li>
        <li name='switch'>
          <span>开断设备</span>
        </li>
        <li name='others'>
          <span>其他</span>
        </li>
      </ul>
    </div>
    <div class="list-content">
      <ul>
        <li>
          <div id="basicStencil"></div>
        </li>
      </ul>
    </div>
    <div class="main">
      <div id="configuration" class="contentLeft">
        <div class="attrSetting">
          <div class="attrSettingHead">
            属性设置
          </div>
          <div id="config" class="attrSettingContent">
          </div>
        </div>
        <div class="deviceStatistics">
          <div class="deviceStatisticsHead">
            设备统计
          </div>
          <div id="table" class="deviceStatisticsContent">
            <table class="altrowstable">
              <tbody>
                <tr>
                  <td colspan="2">线路名称</td>
                  <td colspan="2">XXX线路</td>
                </tr>
                <tr>
                  <td rowspan="7">户台KVA</td>
                </tr>
                <tr>
                  <td>杆上公变</td>
                  <td colspan="2">{{ elementCounts.poleTypeTransformerPublic.user }}/{{ elementCounts.poleTypeTransformerPublic.num }}/{{ elementCounts.poleTypeTransformerPublic.power }}</td>
                </tr>
                <tr>
                  <td>箱式公变</td>
                  <td colspan="2">{{ elementCounts.KGStation.XB.user }}/{{ elementCounts.KGStation.XB.num }}/{{ elementCounts.KGStation.XB.power }}</td>
                </tr>
                <tr>
                  <td>室内公变</td>
                  <td colspan="2">0</td>
                </tr>
                <tr>
                  <td>专变</td>
                  <td colspan="2">{{ elementCounts.poleTypeTransformer.user }}/{{ elementCounts.poleTypeTransformer.num }}/{{ elementCounts.poleTypeTransformer.power }}</td>
                </tr>
                <tr>
                  <td>双电源</td>
                  <td colspan="2">{{ elementCounts.switch }}</td>
                </tr>
                <tr>
                  <td>配电总数</td>
                  <td colspan="2">{{ elementCounts.KGStation.PD.user }}/{{ elementCounts.KGStation.PD.num }}/{{ elementCounts.KGStation.PD.power }}</td>
                </tr>
                <tr>
                  <td id="linkRow" rowspan="5">线路KM</td>
                </tr>
                <tr id="insulationLink">
                  <td rowspan="2">绝缘线</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr id="uninsulationLink">
                  <td>非绝缘线</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>总长</td>
                  <td colspan="2">{{ elementCounts.link.total }}</td>
                </tr>
                <tr>
                  <td rowspan="3">电缆KM</td>
                </tr>
                <tr id="mianCable">
                  <td>主干</td>
                  <td colspan="2">{{ elementCounts.link.mainCable }}</td>
                </tr>
                <tr id="cable">
                  <td>分干</td>
                  <td colspan="2">{{ elementCounts.link.cable }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="paperScroller"></div>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import joint from '../../assets/libs/rappid.min.js'
import '../../jointconfig/joint.shapes.eqelement.js'
import inspectorConfig from '../../jointconfig/inspector.js'
import $ from 'jquery'
import _ from 'lodash'
import fs from 'fs'
import eCounts from '../../jointconfig/elementCounts.js'
import canvg from 'canvg'
import jqprint from '../../assets/libs/jqprint'

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
        tools: [
          {
            type: 'button',
            name: 'save',
            text: '保存',
            attrs: {
              button: {
                'data-tooltip': '保存',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          {
            type: 'button',
            name: 'open',
            text: '打开',
            attrs: {
              button: {
                'data-tooltip': '打开',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          // {
          //   type: 'button',
          //   name: 'count',
          //   text: '统计',
          //   attrs: {
          //     button: {
          //       'data-tooltip': '统计',
          //       'data-tooltip-position': 'top',
          //       'data-tooltip-position-selector': '.toolbar-container'
          //     }
          //   }
          // },
          {
            type: 'undo',
            name: 'undo',
            attrs: {
              button: {
                'data-tooltip': '撤销',
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
                'data-tooltip': '前进',
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
                'data-tooltip': '清除画板',
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
                'data-tooltip': '打印',
                'data-tooltip-position': 'top',
                'data-tooltip-position-selector': '.toolbar-container'
              }
            }
          },
          // {
          //   type: 'button',
          //   name: 'tuopu',
          //   group: 'print',
          //   text: '拓扑图',
          //   attrs: {
          //     button: {
          //       id: 'btn-topu',
          //       'data-tooltip': 'Open a Print Dialog',
          //       'data-tooltip-position': 'top',
          //       'data-tooltip-position-selector': '.toolbar-container'
          //     }
          //   }
          // },
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
        ]
      },
      paper: '',
      graph: '',
      stencil: '',
      snaplines: '',
      commandManager: '',
      paperScroller: '',
      tabShow: true,
      table: {},
      selection: '',
      stencilConfig: {
        basic: [
          {
            type: 'basic.KGStation',
            size: {
              width: 44,
              height: 44
            },
            position: {
              x: 70,
              y: 20
            },
            attrs: {
              '.': {
                'data-tooltip': '配电站',
                'data-tooltip-position': 'bottom',
                'data-tooltip-position-selector': '.joint-stencil'
              },
              text: {
                text: 'PD'
              },
              '.label': {
                text: '配电站'
              }
            },
            devsInfomation: {
              name: '',
              code: '',
              num: 1,
              power: ''
            }
          },
          {
            type: 'basic.KGStation',
            size: {
              width: 44,
              height: 44
            },
            position: {
              x: 170,
              y: 20
            },
            attrs: {
              '.': {
                'data-tooltip': '箱式变',
                'data-tooltip-position': 'bottom',
                'data-tooltip-position-selector': '.joint-stencil'
              },
              text: {
                text: 'XB'
              },
              '.label': {
                text: '箱式变'
              }
            },
            devsInfomation: {
              name: '',
              code: '',
              num: 1,
              power: ''
            }
          },
          {
            type: 'basic.poleTypeTransformerPublic',
            size: {
              width: 20,
              height: 44
            },
            position: {
              x: 270,
              y: 20
            },
            attrs: {
              '.': {
                'data-tooltip': '柱上变压(公)',
                'data-tooltip-position': 'bottom',
                'data-tooltip-position-selector': '.joint-stencil'
              },
              text: {
                text: '柱上变压'
              }
            },
            devsInfomation: {
              name: '',
              code: '',
              num: 1,
              power: ''
            }
          },
          {
            type: 'basic.poleTypeTransformer',
            size: {
              width: 20,
              height: 44
            },
            position: {
              x: 370,
              y: 20
            },
            attrs: {
              '.': {
                'data-tooltip': '柱上变压(专)',
                'data-tooltip-position': 'bottom',
                'data-tooltip-position-selector': '.joint-stencil'
              },
              text: {
                text: '柱上变压'
              }
            }
          }
        ],
        hw: [{
          type: 'basic.cabinet',
          size: {
            width: 44,
            height: 44
          },
          position: {
            x: 70,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '环网柜(自定义)',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        },
        {
          type: 'basic.HWCabinetA',
          size: {
            width: 64,
            height: 44
          },
          position: {
            x: 170,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '环网柜(A)',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        },
        {
          type: 'basic.HWCabinetB',
          size: {
            width: 64,
            height: 44
          },
          position: {
            x: 290,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '环网柜(B)',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        },
        {
          type: 'basic.HWCabinetC',
          size: {
            width: 64,
            height: 44
          },
          position: {
            x: 410,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '环网柜(C)',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        },
        {
          type: 'basic.FDCabinet',
          size: {
            width: 52,
            height: 28
          },
          position: {
            x: 530,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '分支箱',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        }
        ],
        switch: [{
          type: 'basic.isolationSwitch',
          size: {
            width: 15,
            height: 44
          },
          position: {
            x: 70,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '隔离开关',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        },
        {
          type: 'basic.loadSwitch',
          size: {
            width: 15,
            height: 44
          },
          position: {
            x: 170,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '负荷开关',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        },
        {
          type: 'basic.circuitBreakerSwitch',
          size: {
            width: 10.2,
            height: 44
          },
          position: {
            x: 270,
            y: 20
          },
          attrs: {
            '.': {
              'data-tooltip': '断合器',
              'data-tooltip-position': 'bottom',
              'data-tooltip-position-selector': '.joint-stencil'
            }
          }
        }
        ],
        others: [{
          type: 'basic.textBox',
          size: {
            width: 44,
            height: 44
          },
          position: {
            x: 70,
            y: 20
          },
          content: '文本框'
        },
        {
          type: 'basic.textLabel',
          size: {
            width: 44,
            height: 24
          },
          position: {
            x: 170,
            y: 30
          },
          attrs: {
            text: {
              text: '标签',
              'font-size': 40
            }
          }
        }
        ]
      },
      elementIdArrary: [],
      elementCounts: eCounts.createNew()
    }
  },
  mounted: function () {
    const _this = this
    const ipcRenderer = this.$electron.ipcRenderer

    this.tabChangeJQuery() // 标签页切换
    joint.setTheme('modern') // 主题风格
    this.$store.commit('init', $('#paperScroller')) // 初始化paper
    this.$store.commit('initStencil', $('#basicStencil')) // 初始化stencil
    this.$store.commit('stencilLoadConfig', this.stencilConfig.basic) // 加载stencil config
    this.$store.commit('initializeKeyboardShortcuts') // 加载快捷键
    this.initializeTooltips()
    let paper = this.paper = this.$store.state.paper.paper
    let graph = this.graph = this.$store.state.paper.graph
    let commandManager = this.commandManager = this.$store.state.paper.commandManager
    let paperScroller = this.paperScroller = this.$store.state.paper.paperScroller
    let selection = this.selection = this.$store.state.paper.selection
    let snaplines = this.snaplines = this.$store.state.paper.snaplines
    let stencil = this.stencil = this.$store.state.paper.stencil.basic

    // electron的渲染进程
    // 接收来自主线程的保存和打开文件事件
    ipcRenderer.on('selected-file', function (event, path) {
      if (path) {
        fs.readFile(path[0], {
          encoding: 'utf-8'
        }, (err, data) => {
          if (err) {
            console.log(err)
          }
          if (data) {
            console.log(data)
            let graphData = JSON.parse(data)
            graph.fromJSON(graphData)
          }
        })
      }
    })
    ipcRenderer.on('saved-file', function (event, path) {
      if (path) {
        let data = JSON.stringify(graph.toJSON())
        fs.writeFile(path, data, {
          encoding: 'utf-8'
        }, function (err) {
          if (err) {
            console.log('写入失败')
          }
        })
      }
    })
    // 监听元素点击事件
    paper.on('element:pointerup link:options', cellView => {
      // console.log(cellView)
      let cell = cellView.model
      _this.cellPulgin(cellView)
      _this.createInspector(cell)
    })
    // 工具栏
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
      'snapline:change': _.bind(this.changeSnapLines, this),
      'clear:pointerclick': function () {
        _this.graph.clear()
        _this.elementIdArrary = []
      },
      'print:pointerclick': function () {
        // let svgXml = $('#paperScroller .joint-paper')[0]
        // console.log(svgXml)
        // document.getElementById('canvas').setAttribute('height', svgXml.height.baseVal.value)
        // document.getElementById('canvas').setAttribute('width', svgXml.width.baseVal.value)
        // canvg(document.getElementById('canvas'), '<svg>' + svgXml.innerHTML + '</svg>', {
        //   ignoreMouse: true,
        //   ignoreAnimation: true
        // })
        // setTimeout(function () {
        //   let image = _this.convertCanvasToImage(document.getElementById('canvas'))
        $('#paperScroller .joint-paper').print()
        // }, 200)
        // _this.paper.print()
        // $('#canvas').attr('height',_this.paper.)
      },
      'tuopu:pointerclick': function () {
        // 生成拓扑图
        let sources = _this.graph.getSources()
        sources.map(rootNode => {
          let childNode = _this.graph.getSuccessors(rootNode, {
            breadthFirst: true
          })
        })
      },
      'grid-size:change': _.bind(this.paper.setGridSize, this.paper),
      'open:pointerclick': function () {
        ipcRenderer.send('open-file-dialog')
      },
      'save:pointerclick': function () {
        ipcRenderer.send('save-file-dialog')
      },
      'count:pointerclick': function () {
        _this.count()
      }
    })
    $('#toolbar').append(toolbar.el)
    toolbar.render()

    graph.on('add change:devsInfomation remove', cell => {
      this.count(cell)
    })
  },
  methods: {
    // 打开halo
    cellPulgin: function (cellView) {
      let cell = cellView.model
      if (cell.isLink()) {
        return
      }
      let options = {
        cellView: cellView
      }
      let halo = new joint.ui.Halo(options)
      if (cell.get('type') !== 'basic.textBox' && cell.get('type') !== 'basic.cabinet') {
        // halo.removeHandle('resize')
      }
      halo.render()
    },
    // 左侧属性编辑栏的方法
    createInspector: function (cell) {
      joint.ui.Inspector.create('#config', _.extend({
        cell: cell
      }, inspectorConfig.inspectorConfig[cell.get('type')]))
    },
    // 工具栏勾选对齐线的方法
    changeSnapLines: function (checked) {
      if (checked) {
        this.snaplines.startListening()
        this.stencil.options.snaplines = this.snaplines
      } else {
        this.snaplines.stopListening()
        this.stencil.options.snaplines = null
      }
    },
    // 打开为png,暂时无用
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
    // 标签页切换
    tabChangeJQuery: function () {
      const _this = this
      $('.list').find('li').click(function () {
        let index = $(this).index()
        $(this).addClass('selected').siblings().removeClass('selected')
        let name = $(this).attr('name')
        _this.$store.commit('stencilLoadConfig', _this.stencilConfig[name]) // 加载stencil config
        // $('.list-content').find('li').eq(index).siblings().hide(100, function () {
        //   $('.list-content').find('li').eq(index).show(200)
        // })
      })
    },
    count: function (cell) {
      this.elementCounts = eCounts.createNew()
      let elements = this.graph.getElements()
      elements.map(element => {
        let type = element.attributes.type.split('.')[1]
        if (type.toLowerCase().indexOf('switch') !== -1 || type === 'textBox' || type === 'textLabel' || type.toLowerCase().indexOf('cabinet') !== -1) return // 开关类/标签文本框不统计
        let devsInfomation = element.attributes.devsInfomation
        if (element.attributes.attrs.text.text === 'PD') {
          this.elementCounts[type].PD.num += devsInfomation.num ? parseInt(devsInfomation.num)
            : 0
          this.elementCounts[type].PD.user += 1
          this.elementCounts[type].PD.power += devsInfomation.power ? parseInt(devsInfomation.power)
            : 0
          return
        }
        if (element.attributes.attrs.text.text === 'XB') {
          this.elementCounts[type].XB.num += devsInfomation.num ? parseInt(devsInfomation.num)
            : 0
          this.elementCounts[type].XB.user += 1
          this.elementCounts[type].XB.power += devsInfomation.power ? parseInt(devsInfomation.power)
            : 0
          return
        }
        this.elementCounts[type].num += devsInfomation.num ? parseInt(devsInfomation.num)
          : 0
        this.elementCounts[type].user += 1
        this.elementCounts[type].power += devsInfomation.power ? parseInt(devsInfomation.power)
          : 0
      })
      let links = this.graph.getLinks()
      if (links.length <= 0) return
      links.map((link, index) => {
        // 通过线条样式判断是线路还是电缆
        let linkInfo = link.attributes.devsInfomation
        let linkLength = linkInfo.length ? parseFloat(linkInfo.length) : 0
        if (link.attributes.attrs['.connection'].strokeDasharray === '0') {
          // 判断是否绝缘线
          if (linkInfo.insulation) {
            if (!this.elementCounts.link.insulation[linkInfo.type]) this.elementCounts.link.insulation[linkInfo.type] = 0
            this.elementCounts.link.insulation[linkInfo.type] += linkLength
          } else {
            if (!this.elementCounts.link.uninsulation[linkInfo.type]) this.elementCounts.link.uninsulation[linkInfo.type] = 0
            this.elementCounts.link.uninsulation[linkInfo.type] += linkLength
          }
        } else {
          if (linkInfo.main) {
            this.elementCounts.link.mainCable += linkLength
          } else {
            this.elementCounts.link.cable += linkLength
          }
        }
        if ((index + 1) === links.length) {
          let insulationLength = this.elementCounts.link.insulation.length === 0 ? 1 : this.elementCounts.link.insulation.length
          let uninsulationLength = this.elementCounts.link.uninsulation.length === 0 ? 1 : this.elementCounts.link.insulation.length
          $('linkRow').attr('rowspan', (uninsulationLength + insulationLength + 2))
          for (let key in this.elementCounts.link.insulation) {
          }
        }
      })
    },
    initializeTooltips: function () {
      new joint.ui.Tooltip({
        rootTarget: document.body,
        target: '[data-tooltip]',
        direction: 'auto',
        padding: 10
      })
    },
    convertCanvasToImage: function (canvas) {
      let image = new Image()
      image.src = canvas.toDataURL('image/png')
      return image
    }
  }
}
</script>
<style scoped>
@import url("../../assets/libs/rappid.min.css");
@import url("../../assets/css/style.css");
.main {
  width: 100%;
  height: 100%;
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
  background-color: white;
  border-bottom: 1px solid #37accb;
  user-select: none;
}

.list ul li {
  /* display: inline-block; */
  float: left;
  position: relative;
  /* padding: 0px 10px; */
  background-color: #37accb;
  border-right: 1px solid #37accb;
  width: 100px;
  text-align: center;
}

.list ul .selected {
  background-color: white;
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

.list-content {
  width: 100%;
  height: 100px;
  background-color: rgb(240, 240, 240);
}

.list-content ul {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.list-content ul li {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: none;
}

.list-content ul li:first-child {
  display: block;
}

.copyElements {
  background-image: url("data:image/svg+xml;charset=utf8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2218.75px%22%20height%3D%2218.75px%22%20viewBox%3D%220%200%2018.75%2018.75%22%20enable-background%3D%22new%200%200%2018.75%2018.75%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Cpath%20fill%3D%22%236A6C8A%22%20d%3D%22M12.852%2C0.875h-9.27c-0.853%2C0-1.547%2C0.694-1.547%2C1.547v10.816h1.547V2.422h9.27V0.875z%20M15.172%2C3.965h-8.5%20c-0.849%2C0-1.547%2C0.698-1.547%2C1.547v10.816c0%2C0.849%2C0.698%2C1.547%2C1.547%2C1.547h8.5c0.85%2C0%2C1.543-0.698%2C1.543-1.547V5.512%20C16.715%2C4.663%2C16.021%2C3.965%2C15.172%2C3.965L15.172%2C3.965z%20M15.172%2C16.328h-8.5V5.512h8.5V16.328z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%20");
}

.deviceStatisticsContent {
  padding-left: 20px;
}
</style>