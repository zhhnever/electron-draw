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
			<li><div id="bianya"></div></li>
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
import Vue from 'vue'
import _ from 'jquery'
export default {
  data: function () {
    return {
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
      paper: '',
      graph: '',
      commandManager: '',
      paperScroller: '',
      tabShow: true
    }
  },
  mounted: function () {
    // 新增paper
    let graph = this.graph = new joint.dia.Graph()
    let paper = this.paper = new joint.dia.Paper({
      width: 1600,
      height: 900,
      gridSize: 10,
      model: graph })
    paper.drawGrid()
    let commandManager = this.commandManager = new joint.dia.CommandManager({ graph: graph })
    // 新增工具栏
    let toolbar = new joint.ui.Toolbar({
      references: {
        paperScroller: {
          options: {
            paper: { on: function () { } }
          },
          zoom: function () { },
          zoomToFit: function () { }
        },
        commandManager: this.commandManager
      },
      tools: this.tools
    }).render().el
    _('#toolbar').append(toolbar)

    let paperScroller = this.paperScroller = new joint.ui.PaperScroller({
      paper: paper,
      autoResizePaper: true,
      padding: 50
    })
    // 绑定事件
    paper.on('blank:pointerdown', paperScroller.startPanning)
    paper.on('element:pointerup', this.cellPulgin)
    _('#paperScroller').append(paperScroller.el)
    paperScroller.render().center()

    let snaplines = new joint.ui.Snaplines({
      paper: paper
    })
    snaplines.startListening()
    this.newStencil()
  },
  methods: {
    click: function () {
    },
    newStencil: function () {
      let stencil = new joint.ui.Stencil({
        paper: this.paperScroller,
        width: 400,
        height: 200,
        // search: { '*': ['type'] },
        dropAnimation: { duration: 100, easing: 'swing' }
      })
      let r = new joint.shapes.basic.Rect({ position: { x: 10, y: 10 }, size: { width: 20, height: 20 } })
      let c = new joint.shapes.basic.Circle({ position: { x: 50, y: 10 }, size: { width: 20, height: 20 } })
      let t = new joint.shapes.basic.Text({
        position: { x: 130, y: 10 },
        size: { width: 20, height: 30 },
        attrs: { text: { text: 'Text', fill: '#7cbd31' } }
      })
      // stencil.load([r, c, t])
      _('#bianya').append(stencil.render().el)
      stencil.load([r, c, t])
    },
    cellPulgin: function (cellView) {
      console.log(cellView)
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
    changeTab: function (event) {
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
  /* width: 100%; */
  /* height: 800px; */
  /* padding: 100px; */
  /* margin-left: 100px; */
  right: 0;
  left: 300px;
  top: 168px;
  bottom: 0;
  border: 1px solid rgb(240, 240, 240);
}
/* #paperScroller {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
} */
#configuration {
  position: absolute;
  width: 300px;
  height: 100%;
  /* float: left; */
  left: 0;
  /* bottom: 0; */
  top: 168;
  border: 1px solid #cdcdcd
}
#bianya {
  height: 80px;
  /* margin-top: 20px */
}

.list{
	width: 100%;height: 30px;
}

.list ul{
	padding: 0;margin: 0;width: 100%;height: 100%;background-color: #cdcdcd;user-select: none;
}

.list ul li{
	display: inline-block;padding: 0 5px;margin: 0;
}
.list ul .selected{
	background-color: #fcfcfc;
}
.list ul li img{
	width: 20px;vertical-align: middle;margin-bottom: 3px;
}
.list ul li span{
	font-size: 12px;line-height: 30px;
}

.content{
	width: 100%;height: 100px;background-color: #fcfcfc;
}
.content ul{
	padding: 0;margin: 0;width: 100%;height: 100%;
}
.content ul li{
	padding: 0;margin: 0;width: 100%;height: 100%;display: none;
}
.content ul li:first-child{
	display: block;
}
</style>
