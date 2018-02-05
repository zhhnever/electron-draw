/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2017-11-20 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

import joint from './rappid.min.js'
import _ from 'lodash'
(function (joint) {
    // 定义开关基类,初始化监听状态改变,
    // 状态改变之后 改变线路颜色
    'use strict';
    joint.shapes.basic.Generic.define('devs.Switch', {
        devsInfomation: {
        },
        state: 0//开关状态,0是关,1是开
    }, {
        initialize: function () {
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
            this.on('change:state', this.updateSwitchState, this); // 添加 监听状态改变的方法
        },
        changeLinkColor: function (graph,element, color) {
            let childCells = graph.getSuccessors(element)
            childCells.map(child => {
              let links = graph.getConnectedLinks(child, {
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
          }
    });
    // 定义设备基类
    joint.shapes.basic.Generic.define('devs.Equipment',{
        devsInfomation: {
            name:'',
            code:'',
            num:1,
            power:'',
        },
    },{
        initialize: function () {
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
            this.on('change:devsInfomation', this.devsInfomation, this); // 添加 监听状态改变的方法
        }
    })
    
    joint.dia.Link.define('app.Link', {
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
                d: 'M 10 0 L 0 5 L 10 10 z',
                stroke: 'transparent',
                fill: '#222138',
                transform: 'scale(0.001)'
            },
            '.marker-target': {
                d: 'M 10 0 L 0 5 L 10 10 z',
                stroke: 'transparent',
                fill: '#222138',
                transform: 'scale(0.001)'
            },
            '.connection': {
                stroke: '#222138',
                strokeDasharray: '0',
                strokeWidth: 1,
                fill: 'none'
            },
            '.connection-wrap': {
                fill: 'none'
            }
        }
    });

})(joint);

// // 开关
// joint.shapes.basic.switch = joint.shapes.devs.Switch.extend({
//     markup: '<g class="rotatable" ><g></g><path/></g>',
//     defaults: _.defaultsDeep({
//         type: 'basic.switch',
//         size: {
//             width: 35,
//             height: 10
//         },
//         attrs: {
//             'path': {
//                 d: 'M0 0 H 20 V 10 H 0 Z M20 5 L35 5',
//                 stroke: 'black'
//             }
//         }
//     }, joint.shapes.basic.Generic.prototype.defaults)
// })

// console.log(joint.shapes.basic.Generic.prototype.defaults)
joint.shapes.basic.Substation = joint.shapes.basic.Generic.extend({
    markup: [
        '<g class="rotatable">',
        '<g class="scalable">',
        '<path/>',
        '</g>',
        '<g class="one">',
        '<g class="one-circle"><circle/><text/></g>',
        '</g>',
        '<g class="two">',
        '<g class="two-circle"><circle/><text/></g>',
        '</g>',
        '<g class="three">',
        '<g class="three-circle"><circle/><text/></g>',
        '</g>',
        '<g class="four">',
        '<g class="four-circle"><circle/><text/></g>',
        '</g>',
        '',
        '</g>'
    ].join(''),

    defaults: _.defaultsDeep({
        type: 'basic.Substation',
        size: {
            width: 100,
            height: 50
        },
        attrs: {
            'path': {
                d: 'M0 0 V40',
                stroke: 'black'
            },
            '.one circle': {
                r: 20,
                stroke: 'black',
                refX2: 20,
                refY2: 25,
                fill: "transparent",
                strokeWidth: 1
            },
            '.one text': {
                'font-size': 14,
                text: '公变',
                refX2: 20,
                refY2: 25,
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black'
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

// 隔离开关
joint.shapes.basic.isolationSwitch = joint.shapes.devs.Switch.extend({
    markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/></g><text/></g>',
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
                'stroke-opacity': "0",
                fill: 'none'
            },
            '.line1': {
                x1: "6.2",
                x2: "6.2",
                y1: "0.35",
                y2: "14.26",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line2': {
                x1: "6.2",
                x2: "6.2",
                y1: "26.54",
                y2: "43.23",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line3': {
                x1: "6.2",
                x2: "0.35",
                y1: "26.26",
                y2: "13.65",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line4': {
                x1: "0.72",
                x2: "11.78",
                y1: "14.3",
                y2: "14.3",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            text: {
                'font-size': 14,
                text: '隔离开关',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black',
                'ref': 'rect',
                'refX': 1,
                'refY': 0.5,
                'refX2': -10,
                transform: 'rotate(-90)'
            }
        }
    }),
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
            modal.changeLinkColor(graph,modal,'red')
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
            modal.changeLinkColor(graph,modal,'black')            
        }
    }
})

// 负荷开关
joint.shapes.basic.loadSwitch = joint.shapes.devs.Switch.extend({
    markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/></g><text/></g>',
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
                'stroke-opacity': "0",
                fill: 'none'
            },
            '.line1': {
                x1: "5.62",
                x2: "5.62",
                y1: "0.35",
                y2: "14.28",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line2': {
                x1: "5.62",
                x2: "5.62",
                y1: "42.43",
                y2: "31.28",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line3': {
                x1: "5.62",
                x2: "1.36",
                y1: "31.18",
                y2: "15.03",
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line4': {
                x1: "11.05",
                x2: "0.35",
                y1: "14.59",
                y2: "14.59",
                fill: 'none',
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
                fill: 'none',
            },
            '.ell2': {
                cx: '5.61',
                cy: '17.99',
                rx: '2.67',
                ry: '2.79',
                fill: 'none',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            text: {
                'font-size': 14,
                text: '负荷开关',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black',
                'ref': 'rect',
                'refX': 1,
                'refY': 0.5,
                'refX2': -10,
                transform: 'rotate(-90)'
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
                    y2:17.03
                }
            })
            modal.changeLinkColor(graph,modal,'red')
        } else if (change === '1') {
            modal.attr({
                '.line4': {
                    x1: 11.05,
                    x2: 0.36
                },
                '.line3': {
                    y2: 15.03,
                    x2:0.36
                }
            })
            modal.changeLinkColor(graph,modal,'black')            
        }
    }
})