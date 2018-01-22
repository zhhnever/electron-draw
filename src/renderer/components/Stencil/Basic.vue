<template>
  <div id="basicStencil"></div>
</template>

<script>
import joint from '../../assets/libs/rappid.min.js'
import _ from 'jquery'
export default {
  name: 'basic-stencil',
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

  }
}
</script>