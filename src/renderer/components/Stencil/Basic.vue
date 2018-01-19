<template>
  <div></div>
</template>

<script>
import joint from '../../assets/libs/rappid.min.js'
export default {
  data: function () {
    return {
      config: [{
        type: 'eqelement.station',
        size: { width: 90, height: 40 },
        outPorts: [],
        attrs: {
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
            text: 'test',
            fill: '#c6c7e2',
            'font-family': 'Roboto Condensed',
            'font-weight': 'Normal',
            'font-size': 11,
            'stroke-width': 0
          }
        }
      }]
    }
  },
  mounted: function () {
    // let stencil = new joint.ui.Stencil({
    //   paper: this.paperScroller,
    //   snaplines: this.snaplines,
    //   width: 400,
    //   height: 200,
    //   // search: { '*': ['type'] },
    //   dropAnimation: { duration: 100, easing: 'swing' }
    // })
    // let r = new joint.shapes.basic.Rect({ position: { x: 10, y: 10 }, size: { width: 20, height: 20 } })
    // let c = new joint.shapes.basic.Circle({ position: { x: 50, y: 10 }, size: { width: 20, height: 20 } })
    // let t = new joint.shapes.basic.Text({
    //   position: { x: 130, y: 10 },
    //   size: { width: 20, height: 30 },
    //   attrs: { text: { text: 'Text', fill: '#7cbd31' } }
    // })
    // // stencil.load([r, c, t])
    // _('#bianya').append(stencil.render().el)
    // stencil.load([r, c, t])
  }
}
</script>