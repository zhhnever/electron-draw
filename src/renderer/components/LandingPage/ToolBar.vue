<template>
  <div>
    <div id="toolbar"></div>
    <div id="element-icon" class="wrap">
      <ul class="list">
        <li class="active" v-on:click="changeTab" name="1"></li>
        <li  v-on:click="changeTab" name="2"></li>
        <li  v-on:click="changeTab" name="3"></li>
        <li  v-on:click="changeTab" name="4"></li>
      </ul>
      <div class="contain">
        <div v-if="tabShow" class="content">
          <!-- <h1> 123123</h1> -->
          <div id="bianya"></div>
        </div>
        <div v-if="!tabShow" class="content">2</div>
        <div v-if="!tabShow" class="content">3</div>
        <div v-if="!tabShow" class="content">4</div>
      </div>
    </div>
    <div class="main">
      <div id="configuration" class="configuration">
        <div></div>
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
  // mounted: function () {
  //   // let MyToolbarComponent = Vue.extend({
  //   //   template: temp
  //   // })
  //   // new MyToolbarComponent().$mount('#ato')
  // },
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
    paper.on('blank:pointerdown', paperScroller.startPanning)
    paper.on('element:pointerup', this.cellPulgin)
    _('#paperScroller').append(paperScroller.el)
    paperScroller.render().center()

    let snaplines = new joint.ui.Snaplines({
      paper: paper
    })
    snaplines.startListening()

    // let r = new joint.shapes.basic.Rect({
    //   position: { x: 30, y: 40 },
    //   size: { width: 120, height: 80 },
    //   attrs: { text: { text: 'Rect' } }
    // })
    // graph.addCell(r)

    // let c = new joint.shapes.basic.Circle({
    //   position: { x: 40, y: 70 },
    //   attrs: { text: { text: 'Circle' } }
    // })
    // graph.addCell(c)
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
      let target = event.target
      let targetIndex = event.target.attributes.name.value
      console.log(targetIndex)
      target.className = 'active'
      let isShow = this.tabShowIndex[targetIndex - 1]
      console.log(isShow)
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
  position: relative;
  width: 1400px;
  height: 800px;
  /* padding: 100px; */
  /* margin-left: 100px; */
  float: right;
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
  position: relative;
  width: 200px;
  height: 100%;
  float: left;
}
#bianya {
  height: 200px;
}
.wrap {
  height: 150px;
  width: 100%;
  box-sizing: border-box;
}
.wrap ul{
  list-style: none;
  overflow: hidden;
}
.wrap ul li{
  box-sizing: border-box;
  height: 30px;
  width: 90px;
  float: left;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgb(240, 240, 240)
}
.contain{
  position: relative;
  height: 100px;

}
.contain .content{
  box-sizing: border-box;
  position: absolute;
  top: -1px;
  height: 100px;
  width: 100%;
  border: 1px solid rgb(240, 240, 240);
  /* z-index: -1; */
  padding: 5px;
}
.active{
  background-color: aqua;
  border-bottom: none;
}
.actived {
  display: block;
}
</style>
