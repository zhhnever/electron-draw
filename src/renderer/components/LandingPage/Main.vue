<template>
  <div>
    <div id="toolbar"></div>
	<div class="list">
		<ul>
			<li class="selected"><img src="../../assets/images/icon.png" alt=""><span>项目#</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>项目！</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>项目……</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>项目￥</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>项目&</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>项目#</span></li>
		</ul>
	</div>
	<div class="content">
		<ul>
			<li><div id="basicStencil"></div></li>
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
        <div id="table" class="table"></div>        
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
        tools: [
          {
            type: 'zoom-out',
            name: 'zoom-out'
          },
          {
            type: 'zoom-in',
            name: 'zoom-in'
          },
          {
            type: 'zoom-to-fit',
            name: 'zoom-to-fit'
          },
          { type: 'undo' },
          { type: 'redo' },
          {
            type: 'zoom-slider',
            name: 'zoom-slider'
          },
          {
            type: 'separator'
          },
          {
            type: 'select-button-group',
            name: 'aaaaa',
            multi: true,
            selected: [1, 3],
            options: [
              {
                value: 'line-through',
                content: '<span style="text-decoration: line-through">S</span>',
                attrs: {
                  '.select-button-group-button': { 'data-tooltip': 'My tooltip' }
                }
              },
              {
                value: 'underline',
                content: '<span style="text-decoration: underline">U</span>'
              },
              {
                value: 'italic',
                content: '<span style="font-style: italic">I</span>'
              },
              {
                value: 'bold',
                content: '<span style="font-weight: bold">B</span>'
              }
            ]
          },
          {
            type: 'select-box',
            name: 'selectfont',
            width: 200,
            options: [
              { content: 'Arial' },
              { content: 'Helvetica' },
              { content: 'Times New Roman' },
              { content: 'Courier New' }
            ],
            defaultValue: 'Courier New'
          }
        ],
        stencil: [{
          type: 'basic.Rect',
          size: { width: 90, height: 40 },
          outPorts: [],
          attrs: {
            '.': {
              'data-tooltip': 'Substation',
              'data-tooltip-position': 'left',
              'data-tooltip-position-selector': '.joint-stencil'
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
  top: 128px;
  bottom: 0;
  border: 1px solid rgb(240, 240, 240);
}
#configuration {
  position: absolute;
  width: 300px;
  height: 100%;
  /* float: left; */
  left: 0;
  /* bottom: 0; */
  top: 168;
  border: 1px solid #cdcdcd;
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
  background-color:rgb(240, 240, 240);
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
