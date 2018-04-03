/*! */

import joint from '../assets/libs/rappid.min.js'
import _ from 'lodash'
(function (joint) {
// 定义开关基类,初始化监听状态改变,
// 状态改变之后 改变线路颜色
  'use strict'
  joint.shapes.basic.Generic.define('devs.Switch', {
    devsInfomation: {
      code: '',
      type: ''
    },
    state: 0 // 开关状态,0是关,1是开
  }, {
    initialize: function () {
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
      this.on('change:devsInfomation', this.updateDevsInfomation, this) // 添加 监听信息改变的方法
      this.on('change:state', this.updateSwitchState, this)// 添加 监听状态改变的方法
    },
    changeLinkColor: function (graph, element, color) {
      let childCells = graph.getSuccessors(element)
      childCells.map(child => {
        let links = graph.getConnectedLinks(child, {inbound: true})
        links.map(link => {
          link.attr({'.connection': {stroke: color}})
        })
      })
    },
    updateDevsInfomation: (modal, change, opt) => {
      let graph = modal.graph
      let textLabel = null
      let aRect = modal.getBBox()
      let labelText = ''

      if (!modal.labelId || modal.labelId === '') {
        textLabel = new joint.shapes.basic.TextBox({
          position: {x: aRect.x - 13, y: aRect.y + aRect.height + 5},
          attrs: { rect: { 'stroke-opacity': 0 } },
          content: '',
          size: { width: 50, height: 30 },
          targetElement: modal.id
        })
      } else {
        textLabel = graph.getCell(modal.labelId)
      }
      // console.log(change)
      Object.keys(change).forEach(function (key) {
        if (change[key] && change[key] !== '') labelText += change[key] + '/'
      })
      // labelText = `${change.name}/${change.code}/${change.type}/${change.num}/${change.power}`
      setTimeout(() => {
        modal.labelId = textLabel.id
        textLabel.setDivContent(this, labelText)
        graph.addCell(textLabel)
        modal.embed(textLabel)
      }, 20)
    }
  })
  // 定义设备基类
  joint.shapes.basic.Generic.define('devs.Equipment',
    {
      devsInfomation: {
        name: '',
        code: '', // 编码
        type: '0', // 型号
        num: 1,
        power: ''
      },
      lablePostion: 'bottom',
      labelId: '' // 文本标签的id
    }, {
      initialize: function () {
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
        this.on('change:devsInfomation', this.updateDevsInfomation, this) // 添加 监听信息改变的方法
        this.on('change:lablePostion', this.changeLabelPosition, this) // 添加 监听文本位置改变的方法
      },
      changeLabelPosition: (modal, change, opt) => {
        switch (change) {
          case 'bottom':
            modal.attr({
              '.label': {
                'refY2': 35,
                'refX2': 0,
                transform: 'rotate(0)'
              }
            })
            break
          case 'top':
            modal.attr({
              '.label': {
                'refY2': -35,
                'refX2': 0,
                transform: 'rotate(0)'
              }
            })
            break
          case 'left':
            modal.attr({
              '.label': {
                'refY2': 0,
                'refX2': -35,
                transform: 'rotate(90)'
              }
            })
            break
          case 'right':
            modal.attr({
              '.label': {
                'refY2': 0,
                'refX2': 35,
                transform: 'rotate(90)'
              }
            })
            break

          default:
            break
        }
      },
      updateDevsInfomation: (modal, change, opt) => {
        let graph = modal.graph
        let textLabel = null
        let aRect = modal.getBBox()
        let labelText = ''

        if (!modal.labelId || modal.labelId === '') {
          textLabel = new joint.shapes.basic.TextBox({
            attrs: { rect: { 'stroke-opacity': 0 } },
            content: '',
            size: { width: 70, height: 30 },
            targetElement: modal.id
          })
          console.log(textLabel)
          // position: {x: aRect.x - (aRect.x - this.size.width) / 2, y: aRect.y + aRect.height + 5},
          console.log()
          textLabel.position(aRect.x - (textLabel.attributes.size.width - aRect.width) / 2, aRect.y + aRect.height + 5)
        } else {
          textLabel = graph.getCell(modal.labelId)
        }
        Object.keys(change).forEach(function (key) {
          if (key === 'name') {
            labelText += change[key] + '-'
            return
          }
          if (key === 'code') {
            labelText += change[key] + '<br/>'
            return
          }
          if (change[key] && change[key] !== '') labelText += change[key] + '/'
        })
        setTimeout(() => {
          modal.labelId = textLabel.id
          textLabel.setDivContent(this, labelText)
          graph.addCell(textLabel)
          modal.embed(textLabel)
        }, 20)
      }
    })

  joint.dia.Link.define('app.Link', {
    devsInfomation: {
      name: '', // 名称
      length: '', // 长度
      type: '', // 型号
      insulation: true, // 是否绝缘
      main: true // 是否主干线
    },
    router: {
      name: 'normal'
    },
    connector: {
      name: 'normal'
    },
    attrs: {
      '.tool-options': {
        'data-tooltip-class-name': 'small',
        'data-tooltip': '点击设置线路属性',
        'data-tooltip-position': 'left'
      },
      '.marker-source': {
        d: 'M 10 5 L 0 10 L 0 0 z',
        stroke: '#000000',
        fill: 'transparent',
        transform: 'scale(0.001)'
      },
      '.marker-target': {
        d: 'M 10 5 L 0 10 L 0 0 z',
        stroke: '#000000',
        fill: 'transparent',
        transform: 'scale(0.001)'
      },
      '.connection': {
        stroke: '#000000',
        strokeDasharray: '0',
        strokeWidth: 1,
        fill: 'transparent'
      },
      '.connection-wrap': {
        fill: 'transparent'
      }
    }
  })

  joint.shapes.basic.Generic.define('devs.HWCabinet', {
    devsInfomation: {
      name: '',
      code: '',
      type: 1
    }
  }, {
    initialize: function () {
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
      this.on('change:devsInfomation', this.updateDevsInfomation, this) // 添加 监听信息改变的方法
      this.on('change:switch', this.updateSwitch, this) // 添加
    },
    updateDevsInfomation: (modal, change, opt) => {
      let graph = modal.graph
      let textLabel = null
      let aRect = modal.getBBox()
      let labelText = ''

      if (!modal.labelId || modal.labelId === '') {
        textLabel = new joint.shapes.basic.TextBox({
          position: {x: aRect.x - 13, y: aRect.y + aRect.height + 5},
          attrs: { rect: { 'stroke-opacity': 0 } },
          content: '',
          size: { width: 180, height: 30 },
          targetElement: modal.id
        })
      } else {
        textLabel = graph.getCell(modal.labelId)
      }
      // console.log(change)
      Object.keys(change).forEach(function (key) {
        if (change[key] && change[key] !== '') labelText += change[key] + '/'
      })
      // labelText = `${change.name}/${change.code}/${change.type}/${change.num}/${change.power}`
      setTimeout(() => {
        modal.labelId = textLabel.id
        textLabel.setDivContent(this, labelText)
        graph.addCell(textLabel)
        modal.embed(textLabel)
      }, 20)
    },
    updateSwitch: (modal, change, opt) => {
      let graph = modal.graph
      let textLabel = null
      let aRect = modal.getBBox()
      let labelText = ''
      let path = opt.propertyPath // [switch,A,change]
      let p = path.split('/')[2]
      let sIndex = path.split('/')[1]
      if (p !== 'code') return
      let s = modal.attributes.switch[sIndex]
      if (!s || s.labelId === '') {
        textLabel = new joint.shapes.basic.TextLabel({
          position: {x: aRect.x + s.lablePostion.x, y: aRect.y + s.lablePostion.y},
          attrs: { text: { 'text': '' } },
          size: { width: 12, height: 12 },
          targetElement: modal.id + '&' + sIndex
        })
      } else {
        textLabel = graph.getCell(s.labelId)
      }
      labelText = opt.propertyValue
      // labelText = `${change.name}/${change.code}/${change.type}/${change.num}/${change.power}`
      setTimeout(() => {
        modal.attributes.switch[sIndex].labelId = textLabel.id
        textLabel.attr('text/text', labelText)
        graph.addCell(textLabel)
        modal.embed(textLabel)
      }, 20)
    }
  })

  joint.shapes.basic.Generic.define('devs.PortCabinet', {}, {
    markup: [
      '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/></g>',
      '</g>'
    ].join(''),
    portMarkup: '<path class="port-body"/>',
    // portLabelMarkup: '<text class="port-label"/>',
    initialize: function () {
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
      this.on('change:inPorts change:outPorts', this.updatePortItems, this)
      this.on('change:size', this.changeSize, this)
      this.updatePortItems()
    },
    changeSize: function (model, changed, opt) {
      console.log(model)
      if (model.attributes.ports.items.length > 0) {
      }
    },
    updatePortItems: function (model, changed, opt) {
      // Make sure all ports are unique.
      let inPorts = joint.util.uniq(this.get('inPorts'))
      let outPorts = joint.util.difference(joint.util.uniq(this.get('outPorts')), inPorts)
      let inPortItems = this.createPortItems('in', inPorts)
      let outPortItems = this.createPortItems('out', outPorts)
      this.prop('ports/items', inPortItems.concat(outPortItems), joint.util.assign({
        rewrite: true
      }, opt))
    },
    createPortItem: function (group, port) {
      return {
        id: port,
        group: group,
        attrs: {
          '.port-label': {
            text: port
          }
        }
      }
    },
    createPortItems: function (group, ports) {
      return joint.util.toArray(ports).map(this.createPortItem.bind(this, group))
    },
    _addGroupPort: function (port, group, opt) {
      let ports = this.get(group)
      return this.set(group, Array.isArray(ports) ? ports.concat(port) : [port], opt)
    },
    addOutPort: function (port, opt) {
      return this._addGroupPort(port, 'outPorts', opt)
    },

    addInPort: function (port, opt) {
      return this._addGroupPort(port, 'inPorts', opt)
    },

    _removeGroupPort: function (port, group, opt) {
      return this.set(group, joint.util.without(this.get(group), port), opt)
    },

    removeOutPort: function (port, opt) {
      return this._removeGroupPort(port, 'outPorts', opt)
    },

    removeInPort: function (port, opt) {
      return this._removeGroupPort(port, 'inPorts', opt)
    },

    _changeGroup: function (group, properties, opt) {
      return this.prop('ports/groups/' + group, joint.util.isObject(properties) ? properties : {}, opt)
    },

    changeInGroup: function (properties, opt) {
      return this._changeGroup('in', properties, opt)
    },

    changeOutGroup: function (properties, opt) {
      return this._changeGroup('out', properties, opt)
    }
  })
})(joint)

//

// 隔离开关
joint.shapes.basic.isolationSwitch = joint.shapes.devs.Switch.extend({
  // markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/></g></g><text/>',
  markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/></g><text class="label"/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.isolationSwitch',
    size: {
      width: 35,
      height: 10
    },
    attrs: {
      rect: {
        stroke: 'black',
        width: 11.78,
        height: 43.23,
        'stroke-opacity': '0',
        fill: 'transparent'
      },
      '.line1': {
        x1: '6.2',
        x2: '6.2',
        y1: '0',
        y2: '14.26',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line2': {
        x1: '6.2',
        x2: '6.2',
        y1: '26.54',
        y2: '43.23',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line3': {
        x1: '6.2',
        x2: '0.35',
        y1: '26.26',
        y2: '13.65',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line4': {
        x1: '0.72',
        x2: '11.78',
        y1: '14.3',
        y2: '14.3',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.label': {
        'font-size': 14,
        text: '隔离开关',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        'ref': '.line2',
        'refX': 1.5,
        'refY': 25,
        // 'refX2': 10,
        'refY2': ''
        // transform: 'rotate(-90)'
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults),
  updateSwitchState: (modal, change, opt) => {
    // console.log(modal)
    let graph = modal.graph
    if (change === '0') {
      modal.attr({
        '.line4': {
          x1: 3.72,
          x2: 8.78
        },
        '.line3': {
          y2: 15.65
        }
      })
      modal.changeLinkColor(graph, modal, 'red')
    } else if (change === '1') {
      modal.attr({
        '.line4': {
          x1: 0.72,
          x2: 11.78
        },
        '.line3': {
          y2: 13.65
        }
      })
      modal.changeLinkColor(graph, modal, 'black')
    }
  }
})
// 负荷开关
joint.shapes.basic.loadSwitch = joint.shapes.devs.Switch.extend({
  // markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/></g><text/></g>',
  markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/></g><text class="label"/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.loadSwitch',
    size: {
      width: 35,
      height: 10
    },
    attrs: {
      rect: {
        stroke: 'black',
        width: 11.78,
        height: 43.23,
        'stroke-opacity': '0',
        fill: 'transparent'
      },
      '.line1': {
        x1: '6.2',
        x2: '6.2',
        y1: '0.35',
        y2: '14.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line2': {
        x1: '6.2',
        x2: '6.2',
        y1: '42.43',
        y2: '31.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line3': {
        x1: '6.2',
        x2: '1.36',
        y1: '31.18',
        y2: '15.03',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line4': {
        x1: '11.05',
        x2: '0.35',
        y1: '14.59',
        y2: '14.59',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.ell1': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent'
      },
      '.ell2': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.label': {
        'font-size': 14,
        text: '负荷开关',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        'ref': '.line2',
        'refX': 1.5,
        'refY': 20,
        // 'refX2': 10,
        'refY2': ''
        // transform: 'rotate(-90)'
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults),
  updateSwitchState: (modal, change, opt) => {
    // console.log(modal)
    let graph = modal.graph
    if (change === '0') {
      modal.attr({
        '.line4': {
          x2: 2.35,
          x1: 9.05
        },
        '.line3': {
          x2: -0.36,
          y2: 17.03
        }
      })
      modal.changeLinkColor(graph, modal, 'red')
    } else if (change === '1') {
      modal.attr({
        '.line4': {
          x1: 11.05,
          x2: 0.36
        },
        '.line3': {
          y2: 15.03,
          x2: 0.36
        }
      })
      modal.changeLinkColor(graph, modal, 'black')
    }
  }
})
// 断路器
joint.shapes.basic.circuitBreakerSwitch = joint.shapes.devs.Switch.extend({
  // markup: '<g class="rotatable"><g class="scalable"><rect/><line class="l1"/><line class="l2"/></g><text/></g>',
  markup: '<g class="rotatable"><g class="scalable"><rect/><line class="l1"/><line class="l2"/></g><text class="label"/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.circuitBreakerSwitch',
    size: {
      width: 10.2,
      height: 44
    },
    attrs: {
      rect: {
        width: '7.89',
        height: '22.41',
        x: '0.34',
        y: '6.23',
        fill: '#8c8c8c',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l1': {
        x1: '4.38',
        x2: '4.38',
        y1: '0.34',
        y2: '5.95',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l2': {
        x1: '4.38',
        x2: '4.38',
        y1: '34.24',
        y2: '28.64',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.label': {
        'font-size': 12,
        text: '断路器',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.l2',
        'refX': 0,
        'refY': 15
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})
joint.shapes.basic.KGStation = joint.shapes.devs.Equipment.extend({
  markup: '<g class="rotatable"><g class="scalable"><rect/><text/></g><g><text class="label"/></g></g>',
  defaults: _.defaultsDeep({
    type: 'basic.KGStation',
    size: {
      width: 35,
      height: 35
    },
    attrs: {
      rect: {
        stroke: 'black',
        width: 40,
        height: 40,
        fill: 'transparent'
      },
      text: {
        'font-size': 14,
        text: 'KG',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        'ref': 'rect',
        'refX': 0.5,
        'refY': 0.5
      },
      '.label': {
        'font-size': 14,
        text: '开关站',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        'ref': 'rect',
        'refX': 0.5,
        'refY': 0.5,
        'refY2': 35
      }
    },
    devsInfomation: {
      name: '',
      code: '', // 编码
      type: '', // 型号
      num: 1,
      power: ''
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})
// 柱上变压器(公)
joint.shapes.basic.poleTypeTransformerPublic = joint.shapes.devs.Equipment.extend({
  // markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g><text/></g>',
  markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g><text class="label"/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.poleTypeTransformerPublic',
    size: {
      width: 20,
      height: 44
    },
    attrs: {
      '.p1': {
        d: 'M11.75,22.71a11.38,11.38,0,0,0-.47,22.74,11.38,11.38,0,0,0,.47-22.74Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l1': {
        x1: '11.6',
        x2: '11.6',
        y1: '4.67',
        y2: '0.3',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l2': {
        x1: '11.59',
        x2: '11.59',
        y1: '45.52',
        y2: '49.89',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.p2': {
        d: 'M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z',
        fill: 'silver',
        'fill-rule': 'evenodd',
        stroke: 'black'
      },
      'p3': {
        d: 'M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.label': {
        'font-size': 12,
        text: '柱上公变',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.l2',
        'refX': 0,
        'refY': 15
      }
    },
    devsInfomation: {
      name: '',
      type: '',
      code: '',
      num: 1,
      power: ''
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})
// 柱上变压器(专)
joint.shapes.basic.poleTypeTransformer = joint.shapes.devs.Equipment.extend({
  // markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g><text/></g>',
  markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g><text class="label"/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.poleTypeTransformer',
    devsInfomation: {
      name: '',
      code: '',
      type: '',
      num: 1,
      power: ''
    },
    size: {
      width: 20,
      height: 44
    },
    attrs: {
      '.p1': {
        d: 'M11.75,22.71a11.38,11.38,0,0,0-.47,22.74,11.38,11.38,0,0,0,.47-22.74Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l1': {
        x1: '11.6',
        x2: '11.6',
        y1: '4.67',
        y2: '0.3',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l2': {
        x1: '11.59',
        x2: '11.59',
        y1: '45.52',
        y2: '49.89',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.p2': {
        d: 'M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      'p3': {
        d: 'M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.label': {
        'font-size': 12,
        text: '柱上专变',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.l2',
        'refX': 0,
        'refY': 15
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 柜体---->环网柜柜体
joint.shapes.basic.cabinet = joint.shapes.devs.Equipment.extend({
  markup: '<g class="rotatable"><g class="scalable"><rect/><line/></g><text class="label"/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.cabinet',
    size: {
      width: 124,
      height: 84
    },
    attrs: {
      rect: {
        width: 124,
        height: 84,
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      line: {
        x1: '5',
        y1: '5',
        x2: '119',
        y2: '5',
        stroke: 'black',
        'stroke-width': '3px'
      },
      '.label': {
        'font-size': 12,
        text: '环网柜',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: 'rect',
        'refX': 0.5,
        'refY': 54
      }
    }

  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 文本框
joint.shapes.basic.Generic.define('basic.TextBox', {
  // see joint.css for more element styles
  attrs: {
    '.content': {
      html: '',
      style: 'margin:0;text-align:center'
    },
    rect: {
      fill: 'transparent',
      stroke: '#000000',
      width: 80,
      height: 100
    }
  },
  content: '',
  fontSize: '12px',
  targetElement: '' // 目标元素的id,这个标签属于这个id指向的元素
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable"><rect/></g>',
    '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><p class="content"/></body></foreignObject>',
    '</g>'
  ].join(''),

  initialize: function () {
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
    this.listenTo(this, 'change:size', this.updateSize)
    this.listenTo(this, 'change:content', this.updateContent)
    this.listenTo(this, 'change:fontSize', this.updateFontSize)
    this.updateSize(this, this.get('size'))
    this.updateContent(this, this.get('content'))
    this.updateFontSize(this, this.get('fontSize'))
    // console.log(this)
  },

  updateSize: function (cell, size) {
    // Selector `foreignObject' doesn't work accross all browsers, we'r using class selector instead.
    // We have to clone size as we don't want attributes.div.style to be same object as attributes.size.
    this.attr({
      // '.fobj': style,
      '.fobj': joint.util.assign({}, size),
      p: {
        style: `font-size:${this.get('fontSize')};margin:0;color:#000000;text-align:center;word-break: break-all;height:${size.height}px;width:${size.width}px;display:inline-block`
      }
    })
  },
  // 改变字体大小
  updateFontSize: function (cell, fontSize) {
    let size = this.get('size')
    this.attr({
      fontSize: fontSize,
      p: {
        style: `font-size:${fontSize};margin:0;text-align:center;color:#000000;word-break: break-all;height:${size.height}px;width:${size.width}px;display:inline-block`
      }
    })
  },
  updateContent: function (cell, content) {
    this.attributes.content = content
    if (joint.env.test('svgforeignobject')) {
      // Content element is a <div> element.
      this.attr({
        '.content': {
          html: content
        }
      })
    } else {
      // Content element is a <text> element.
      // SVG elements don't have innerHTML attribute.
      this.attr({
        '.content': {
          text: content
        }
      })
    }
  },

  // Here for backwards compatibility:
  setForeignObjectSize: function () {
    this.updateSize.apply(this, arguments)
  },

  // Here for backwards compatibility:
  setDivContent: function () {
    this.updateContent.apply(this, arguments)
  }
})

// 文本标签
joint.shapes.basic.TextLabel = joint.shapes.basic.Generic.extend({
  markup: '<g class="rotatable"><text/></g>',
  defaults: _.defaultsDeep({
    type: 'basic.TextLabel',
    size: {
      width: 44,
      height: 24
    },
    attrs: {
      text: {
        text: '',
        'font-size': 14,
        fill: '#000000'
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 环网柜A
joint.shapes.basic.HWCabinetA = joint.shapes.devs.HWCabinet.extend({
  markup: [
    '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/>',
    '<g class="inPorts">',
    '<g class="port1"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
    '<g class="port2"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',
    '<g class="port3"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
    '</g>',
    '</g>',
    '<text class="label"/>',
    '</g>'
  ].join(''),
  defaults: _.defaultsDeep({
    type: 'basic.HWCabinetA',
    size: {
      width: 124,
      height: 84
    },
    attrs: {
      '.port1': {
        ref: '.line',
        'ref-x': '10%',
        'ref-y': 0
      },
      '.port2': {
        ref: '.line',
        'ref-x': '45%',
        'ref-y': 0
      },
      '.port3': {
        ref: '.line',
        'ref-x': '80%',
        'ref-y': 0
      },
      '.rect': {
        width: 124,
        height: 84,
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.rect1': {
        width: '7.89',
        height: '22.41',
        x: '0.34',
        y: '6.23',
        fill: '#8c8c8c',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l1': {
        x1: '4.38',
        x2: '4.38',
        y1: '0.34',
        y2: '5.95',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l2': {
        x1: '4.38',
        x2: '4.38',
        y1: '34.24',
        y2: '28.64',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l3': {
        x1: '4.38',
        x2: '4.38',
        y1: '35.24',
        y2: '40.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l4': {
        x1: '0.38',
        x2: '8.76',
        y1: '40.24',
        y2: '40.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l5': {
        x1: '0.38',
        x2: '4.38',
        y1: '40.24',
        y2: '55.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l6': {
        x1: '4.38',
        x2: '4.38',
        y1: '55.24',
        y2: '65.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.p5': {
        d: 'M-1.2 65.24 H9.2 L4.38,75.24 L-1.2 65.24Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px',
        magnet: true
      },
      '.line': {
        x1: '5',
        y1: '5',
        x2: '119',
        y2: '5',
        stroke: 'black',
        'stroke-width': '3px'
      },
      '.line1': {
        x1: '6.2',
        x2: '6.2',
        y1: '0.35',
        y2: '14.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line2': {
        x1: '6.2',
        x2: '6.2',
        y1: '42.43',
        y2: '31.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line3': {
        x1: '6.2',
        x2: '1.36',
        y1: '31.18',
        y2: '15.03',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line4': {
        x1: '11.05',
        x2: '0.35',
        y1: '14.59',
        y2: '14.59',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.ell1': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent'
      },
      '.ell2': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.p4': {
        d: 'M1.2 42.43 H11.2 L6.2,52.43 L1.2 42.43Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px',
        magnet: true
      },
      '.label': {
        'font-size': 12,
        text: '环网柜',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.rect',
        'refX': 0.5,
        'refY': 54
      }
    },
    switch: {
      loadSwitchA: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port1',
        labelId: '',
        lablePostion: {
          x: 30,
          y: 48
        }
      },
      circuitBreaker: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port2',
        labelId: '',
        lablePostion: {
          x: 80,
          y: 48
        }
      },
      loadSwitchB: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port3',
        labelId: '',
        lablePostion: {
          x: 130,
          y: 48
        }
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 环网柜B
joint.shapes.basic.HWCabinetB = joint.shapes.devs.HWCabinet.extend({
  markup: [
    '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/>',
    '<g class="inPorts">',
    '<g class="port1"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
    '<g class="port2"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',
    '<g class="port3"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',
    '<g class="port4"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
    '</g>',
    '</g>',
    '<text class="label"/>',
    '</g>'
  ].join(''),
  defaults: _.defaultsDeep({
    type: 'basic.HWCabinetB',
    size: {
      width: 124,
      height: 84
    },
    attrs: {
      '.port1': {
        ref: '.line',
        'ref-x': '6%',
        'ref-y': 0
      },
      '.port2': {
        ref: '.line',
        'ref-x': '32%',
        'ref-y': 0
      },
      '.port3': {
        ref: '.line',
        'ref-x': '62%',
        'ref-y': 0
      },
      '.port4': {
        ref: '.line',
        'ref-x': '84%',
        'ref-y': 0
      },
      '.rect': {
        width: 124,
        height: 84,
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.rect1': {
        width: '7.89',
        height: '22.41',
        x: '0.34',
        y: '6.23',
        fill: '#8c8c8c',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l1': {
        x1: '4.38',
        x2: '4.38',
        y1: '0.34',
        y2: '5.95',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l2': {
        x1: '4.38',
        x2: '4.38',
        y1: '34.24',
        y2: '28.64',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l3': {
        x1: '4.38',
        x2: '4.38',
        y1: '35.24',
        y2: '40.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l4': {
        x1: '0.38',
        x2: '8.76',
        y1: '40.24',
        y2: '40.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l5': {
        x1: '0.38',
        x2: '4.38',
        y1: '40.24',
        y2: '55.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l6': {
        x1: '4.38',
        x2: '4.38',
        y1: '55.24',
        y2: '65.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.p5': {
        d: 'M-1.2 65.24 H9.2 L4.38,75.24 L-1.2 65.24Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px',
        magnet: true
      },
      '.line': {
        x1: '5',
        y1: '5',
        x2: '119',
        y2: '5',
        stroke: 'black',
        'stroke-width': '3px'
      },
      '.line1': {
        x1: '6.2',
        x2: '6.2',
        y1: '0.35',
        y2: '14.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line2': {
        x1: '6.2',
        x2: '6.2',
        y1: '42.43',
        y2: '31.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line3': {
        x1: '6.2',
        x2: '1.36',
        y1: '31.18',
        y2: '15.03',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line4': {
        x1: '11.05',
        x2: '0.35',
        y1: '14.59',
        y2: '14.59',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.ell1': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent'
      },
      '.ell2': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.p4': {
        d: 'M1.2 42.43 H11.2 L6.2,52.43 L1.2 42.43Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px',
        magnet: true
      },
      '.label': {
        'font-size': 12,
        text: '环网柜',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.rect',
        'refX': 0.5,
        'refY': 54
      }

    },
    switch: {
      loadSwitchA: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port1',
        labelId: '',
        lablePostion: {
          x: 25,
          y: 48
        }
      },
      circuitBreakerA: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port2',
        labelId: '',
        lablePostion: {
          x: 65,
          y: 48
        }
      },
      circuitBreakerB: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port3',
        labelId: '',
        lablePostion: {
          x: 105,
          y: 48
        }
      },
      loadSwitchB: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port4',
        labelId: '',
        lablePostion: {
          x: 132,
          y: 48
        }
      }
    }

  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 环网柜C
joint.shapes.basic.HWCabinetC = joint.shapes.devs.HWCabinet.extend({
  markup: [
    '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/>',
    '<g class="inPorts" >',
    '<g class="port1"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
    '<g class="port2" transform=""><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',
    '<g class="port3"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',
    '<g class="port4"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',
    '<g class="port5"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
    '</g>',
    '</g>',
    '<text class="label"/>',
    '</g>'
  ].join(''),
  defaults: _.defaultsDeep({
    type: 'basic.HWCabinetC',
    size: {
      width: 124,
      height: 84
    },
    attrs: {
      '.port1': {
        ref: '.line',
        'ref-x': '3%',
        'ref-y': 0
      },
      '.port2': {
        ref: '.line',
        'ref-x': '24%',
        'ref-y': 0
      },
      '.port3': {
        ref: '.line',
        'ref-x': '45%',
        'ref-y': 0
      },
      '.port4': {
        ref: '.line',
        'ref-x': '68%',
        'ref-y': 0
      },
      '.port5': {
        ref: '.line',
        'ref-x': '85%',
        'ref-y': 0
      },
      '.rect': {
        width: 124,
        height: 84,
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.rect1': {
        width: '7.89',
        height: '22.41',
        x: '0.34',
        y: '6.23',
        fill: '#8c8c8c',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l1': {
        x1: '4.38',
        x2: '4.38',
        y1: '0.34',
        y2: '5.95',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l2': {
        x1: '4.38',
        x2: '4.38',
        y1: '34.24',
        y2: '28.64',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l3': {
        x1: '4.38',
        x2: '4.38',
        y1: '35.24',
        y2: '40.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l4': {
        x1: '0.38',
        x2: '8.76',
        y1: '40.24',
        y2: '40.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l5': {
        x1: '0.38',
        x2: '4.38',
        y1: '40.24',
        y2: '55.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.l6': {
        x1: '4.38',
        x2: '4.38',
        y1: '55.24',
        y2: '65.24',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.p5': {
        d: 'M-1.2 65.24 H9.2 L4.38,75.24 L-1.2 65.24Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px',
        magnet: true
      },
      '.line': {
        x1: '5',
        y1: '5',
        x2: '119',
        y2: '5',
        stroke: 'black',
        'stroke-width': '3px'
      },
      '.line1': {
        x1: '6.2',
        x2: '6.2',
        y1: '0.35',
        y2: '14.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line2': {
        x1: '6.2',
        x2: '6.2',
        y1: '42.43',
        y2: '31.28',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line3': {
        x1: '6.2',
        x2: '1.36',
        y1: '31.18',
        y2: '15.03',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.line4': {
        x1: '11.05',
        x2: '0.35',
        y1: '14.59',
        y2: '14.59',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.ell1': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent'
      },
      '.ell2': {
        cx: '5.61',
        cy: '17.99',
        rx: '2.67',
        ry: '2.79',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1px'
      },
      '.p4': {
        d: 'M1.2 42.43 H11.2 L6.2,52.43 L1.2 42.43Z',
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px',
        magnet: true
      },
      '.label': {
        'font-size': 12,
        text: '环网柜',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.rect',
        'refX': 0.5,
        'refY': 54
      }
    },
    switch: {
      loadSwitchA: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port1',
        labelId: '',
        lablePostion: {
          x: 20,
          y: 48
        }
      },
      circuitBreakerA: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port2',
        labelId: '',
        lablePostion: {
          x: 50,
          y: 48
        }
      },
      circuitBreakerB: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port3',
        labelId: '',
        lablePostion: {
          x: 75,
          y: 48
        }
      },
      circuitBreakerC: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port4',
        labelId: '',
        lablePostion: {
          x: 110,
          y: 48
        }
      },
      loadSwitchB: {
        type: '',
        code: '',
        state: '1',
        portIndex: 'port5',
        labelId: '',
        lablePostion: {
          x: 133,
          y: 48
        }
      }
    }

  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 分支箱
joint.shapes.basic.FDCabinet = joint.shapes.devs.PortCabinet.extend({
  markup: [
    '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/></g>',
    '<text class="label" />',
    '</g>'
  ].join(''),
  portMarkup: '<path class="port-body"/>',
  defaults: _.defaultsDeep({
    type: 'basic.FDCabinet',
    size: {
      width: 124,
      height: 64
    },
    attrs: {
      '.rect': {
        width: 124,
        height: 64,
        fill: 'transparent',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.line': {
        x1: '10',
        y1: '32',
        x2: '114',
        y2: '32',
        stroke: 'black',
        'stroke-width': '3px'
      },
      '.label': {
        'font-size': 12,
        text: '分支箱',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: '.rect',
        'refX': 0.5,
        'refY': 54
      }
    },
    ports: {
      groups: {
        'in': {
          position: {
            name: 'line',
            args: {
              start: {
                x: 10,
                y: 38
              },
              end: {
                x: 114,
                y: 38
              }
            }
          },
          attrs: {
            '.port-body': {
              d: 'M 0 0 L 0 10 M-5 10 L5 10 L0 20 L-5 10 Z',
              stroke: 'black',
              'stroke-width': '1px',
              magnet: true
            }
          }
        },
        'out': {
          position: {
            name: 'line',
            args: {
              start: {
                x: 10,
                y: 38
              },
              end: {
                x: 114,
                y: 38
              }
            }
          },
          attrs: {
            '.port-body': {
              d: 'M 0 0 L 0 -10 M-5 -10 L5 -10 L0 -20 L-5 -10 Z',
              stroke: 'black',
              'stroke-width': '1px',
              magnet: true
            }
          }
        }
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})

// 杆塔/连接点
joint.shapes.basic.Tower = joint.shapes.basic.Generic.extend({
  markup: [
    '<g class="rotatable"><g class="scalable"><circle /></g>',
    '<text class="label" />',
    '</g>'
  ].join(''),
  defaults: _.defaultsDeep({
    type: 'basic.Tower',
    size: {
      width: 44,
      height: 44
    },
    attrs: {
      'circle': {
        r: '22',
        fill: '#000000',
        stroke: 'black',
        'stroke-width': '1px'
      },
      '.label': {
        'font-size': 12,
        text: '连接点',
        'y-alignment': 'middle',
        'x-alignment': 'middle',
        fill: 'black',
        ref: 'circle',
        'refX': 0.5,
        'refY': 26
      }
    },
    devsInfomation: {
      code: ''
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
})
