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
        devsInfomation: {},
        state: 0 //开关状态,0是关,1是开
    }, {
        initialize: function () {
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
            this.on('change:state', this.updateSwitchState, this); // 添加 监听状态改变的方法
        },
        changeLinkColor: function (graph, element, color) {
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
    joint.shapes.basic.Generic.define('devs.Equipment', {
        devsInfomation: {
            name: '',
            code: '',
            num: 1,
            power: '',
        },
        lablePostion: 'bottom'
    }, {
        initialize: function () {
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
            this.on('change:devsInfomation', this.updateDevsInfomation, this); // 添加 监听信息改变的方法
            this.on('change:lablePostion', this.changeLabelPosstion, this); // 添加 监听文本位置改变的方法          
        },
        changeLabelPosstion: (modal, change, opt) => {
            switch (change) {
                case 'bottom':
                    modal.attr({
                        '.label': {
                            'refY2': 35,
                            'refX2': 0,
                            transform: 'rotate(0)'
                        }
                    })
                    break;
                case 'top':
                    modal.attr({
                        '.label': {
                            'refY2': -35,
                            'refX2': 0,
                            transform: 'rotate(0)'
                        }
                    })
                    break;
                case 'left':
                    modal.attr({
                        '.label': {
                            'refY2': 0,
                            'refX2': -35,
                            transform: 'rotate(90)'
                        }
                    })
                    break;
                case 'right':
                    modal.attr({
                        '.label': {
                            'refY2': 0,
                            'refX2': 35,
                            transform: 'rotate(90)'
                        }
                    })
                    break;

                default:
                    break;
            }
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
                d: 'M 6.5 0 L 11.5 0 L 10 10 z',
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
                fill: 'transparent'
            },
            '.connection-wrap': {
                fill: 'transparent'
            }
        }
    });

    joint.shapes.basic.Generic.define('devs.HWCabinet',{
        devsInfomation: {
            name: '',
            code: '',
            num: 1,
            power: '',
        },
        switch:{
            
        }
    })

})(joint);

// 

// 隔离开关
joint.shapes.basic.isolationSwitch = joint.shapes.devs.Switch.extend({
    // markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/></g></g><text/>',
    markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/></g></g>',
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
                fill: 'transparent'
            },
            '.line1': {
                x1: "6.2",
                x2: "6.2",
                y1: "0",
                y2: "14.26",
                fill: 'transparent',
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
                fill: 'transparent',
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
                fill: 'transparent',
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
                fill: 'transparent',
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
    },joint.shapes.basic.Generic.prototype.defaults),
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
    markup: '<g class="rotatable"><g class="scalable"><rect/><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/></g></g>',    
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
                fill: 'transparent'
            },
            '.line1': {
                x1: "6.2",
                x2: "6.2",
                y1: "0.35",
                y2: "14.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line2': {
                x1: "6.2",
                x2: "6.2",
                y1: "42.43",
                y2: "31.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line3': {
                x1: "6.2",
                x2: "1.36",
                y1: "31.18",
                y2: "15.03",
                fill: 'transparent',
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
                fill: 'transparent',
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
                'refY': 0.5,
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
        }
    }, joint.shapes.basic.Generic.prototype.defaults),
    updateDevsInfomation: (modal, change, opt) => {
        // todo 更新信息
    }
})

// 柱上变压器(共)

joint.shapes.basic.poleTypeTransformerPublic = joint.shapes.basic.Generic.extend({
    // markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g><text/></g>',
    markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g></g>',
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
                x1: "11.6",
                x2: "11.6",
                y1: "4.67",
                y2: "0.3",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l2': {
                x1: "11.59",
                x2: "11.59",
                y1: "45.52",
                y2: "49.89",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.p2': {
                d: "M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z",
                fill: 'silver',
                'fill-rule': 'evenodd',
                stroke: 'black',
            },
            'p3': {
                d: "M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            text: {
                'font-size': 12,
                text: '柱上变压器',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black',
                ref: '.p2',
                'refX': 1,
                'refY': 18,
                'refX2': -10,
                transform: 'rotate(-90)'
            },
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
})

// 柱上变压器(专)
joint.shapes.basic.poleTypeTransformer = joint.shapes.basic.Generic.extend({
    // markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g><text/></g>',
    markup: '<g class="rotatable"><g class="scalable"><path class="p1"/><line class="l1"/><line class="l2"/><path class="p2"/><path class="p3"/></g></g>',
    defaults: _.defaultsDeep({
        type: 'basic.poleTypeTransformer',
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
                x1: "11.6",
                x2: "11.6",
                y1: "4.67",
                y2: "0.3",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l2': {
                x1: "11.59",
                x2: "11.59",
                y1: "45.52",
                y2: "49.89",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.p2': {
                d: "M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            'p3': {
                d: "M11.75,4.59a11.37,11.37,0,0,0-.47,22.74,11.37,11.37,0,0,0,.47-22.74Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            text: {
                'font-size': 12,
                text: '柱上变压器',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black',
                ref: '.p2',
                'refX': 1,
                'refY': 18,
                'refX2': -10,
                transform: 'rotate(-90)'
            },
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
})

// 断合器
joint.shapes.basic.circuitBreaker = joint.shapes.devs.Switch.extend({
    // markup: '<g class="rotatable"><g class="scalable"><rect/><line class="l1"/><line class="l2"/></g><text/></g>',
    markup: '<g class="rotatable"><g class="scalable"><rect/><line class="l1"/><line class="l2"/></g></g>',
    defaults: _.defaultsDeep({
        type: 'basic.circuitBreaker',
        size: {
            width: 10.2,
            height: 44
        },
        attrs: {
            rect: {
                width: "7.89",
                height: "22.41",
                x: "0.34",
                y: "6.23",
                fill: '#8c8c8c',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l1': {
                x1:"4.38",x2:"4.38",y1:"0.34",y2:"5.95",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l2': {
                x1:"4.38",x2:"4.38",y1:"34.24",y2:"28.64",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            text: {
                'font-size': 12,
                text: '断合器',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black',
                ref: 'rect',
                'refX': 1,
                'refY': 0.5,
                'refX2': -10,
                'refY2': -10,                
                transform: 'rotate(-90)'
            },
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
})
// 柜体---->开关站柜体,变电柜柜体
joint.shapes.basic.cabinet = joint.shapes.basic.Generic.extend({
    markup:'<g class="rotatable"><g class="scalable"><rect/><line/></g></g>',
    defaults: _.defaultsDeep({
        type: 'basic.cabinet',
        size: {
            width: 44,
            height: 44
        },
        attrs: {
            rect: {
                width:44,
                height:44,
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            line:{
                x1:'5',
                y1:'5',
                x2:'39',
                y2:'5',
                stroke: 'black',
                'stroke-width': '3px'
            }
        },
   
    },joint.shapes.basic.Generic.prototype.defaults)
})

// 文本框
joint.shapes.basic.Generic.define('basic.textBox', {
    // see joint.css for more element styles
    attrs: {
        '.content': {
            text: '',
            style:'margin:0;text-align:center',
        },        
        rect: {
            fill: 'transparent',
            stroke: '#000000',
            width: 80,
            height: 100
        },
    },
    content: '',
    fontSize:'12px',
}, {
    markup: [
        '<g class="rotatable">',
        '<g class="scalable"><rect/></g>',
        '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><p class="content"/></body></foreignObject>',
        '</g>'
    ].join(''),

    initialize: function() {

        this.listenTo(this, 'change:size', this.updateSize);
        this.listenTo(this, 'change:content', this.updateContent);
        this.listenTo(this, 'change:fontSize', this.updateFontSize);        
        this.updateSize(this, this.get('size'));
        this.updateContent(this, this.get('content'));
        this.updateFontSize(this, this.get('fontSize'));        
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    updateSize: function(cell, size) {
        // Selector `foreignObject' doesn't work accross all browsers, we'r using class selector instead.
        // We have to clone size as we don't want attributes.div.style to be same object as attributes.size.

        this.attr({
            '.fobj': joint.util.assign({}, size),
            p: {
                style:`font-size:${this.get('fontSize')};margin:0;text-align:center;height:${size.height}px;width:${size.width}px`
            }
        });
    },
    // 改变字体大小
    updateFontSize: function(cell, fontSize){
        let size = this.get('size')
        this.attr({
            fontSize: fontSize,
            p: {
                style:`font-size:${fontSize};margin:0;text-align:center;height:${size.height}px;width:${size.width}px`
            }
        })
    },
    updateContent: function(cell, content) {

        if (joint.env.test('svgforeignobject')) {
            // Content element is a <div> element.
            this.attr({
                '.content': {
                    html: content
                }
            });

        } else {
            // Content element is a <text> element.
            // SVG elements don't have innerHTML attribute.
            this.attr({
                '.content': {
                    text: content
                }
            });
        }
    },

    // Here for backwards compatibility:
    setForeignObjectSize: function() {

        this.updateSize.apply(this, arguments);
    },

    // Here for backwards compatibility:
    setDivContent: function() {

        this.updateContent.apply(this, arguments);
    }
});

// 文本标签
joint.shapes.basic.textLabel =  joint.shapes.basic.Generic.extend({
    markup:'<g class="rotatable"><text/></g>',
    defaults: _.defaultsDeep({
        type: 'basic.textLabel',
        size: {
            width: 44,
            height: 24
          },
        attrs: {
            text:{
                text:'',
                'font-size':14,
                fill:'#000000'
            }
        },
    },joint.shapes.basic.Generic.prototype.defaults)
})

// 环网柜A
joint.shapes.basic.HWCabinetA = joint.shapes.basic.Generic.extend({
    markup:[
        '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/></g>',
        '<g class="inPorts">',
        '<g class="port1"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
        '<g class="port2"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>', 
        '<g class="port3"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',       
        '</g>',
        '</g>'].join(''),
    defaults: _.defaultsDeep({
        type: 'basic.HWCabinetA',
        size: {
            width: 124,
            height: 84
        },
        attrs: {
            '.port1':{
                ref:'.line',
                'ref-x':10,
                'ref-y':0,                       
            },
            '.port2':{
                ref:'.line',
                'ref-x':40,
                'ref-y':0,  
            },
            '.port3':{
                ref:'.line',
                'ref-x':70,
                'ref-y':0,  
            },
            '.rect': {
                width:44,
                height:44,
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.rect1': {
                width: "7.89",
                height: "22.41",
                x: "0.34",
                y: "6.23",
                fill: '#8c8c8c',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l1': {
                x1:"4.38",x2:"4.38",y1:"0.34",y2:"5.95",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l2': {
                x1:"4.38",x2:"4.38",y1:"34.24",y2:"28.64",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l3': {
                x1:"4.38",x2:"4.38",y1:"35.24",y2:"40.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l4': {
                x1:"0.38",x2:"8.76",y1:"40.24",y2:"40.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },            
            '.l5': {
                x1:"0.38",x2:"4.38",y1:"40.24",y2:"55.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l6': {
                x1:"4.38",x2:"4.38",y1:"55.24",y2:"65.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.p5': {
                d :"M1.2 65.24 H7.2 L4.38,70.24 L1.2 65.24Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px',
                magnet:true                                                                             
            },
            '.line':{
                x1:'5',
                y1:'5',
                x2:'39',
                y2:'5',
                stroke: 'black',
                'stroke-width': '3px',
            },
            '.line1': {
                x1: "6.2",
                x2: "6.2",
                y1: "0.35",
                y2: "14.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line2': {
                x1: "6.2",
                x2: "6.2",
                y1: "42.43",
                y2: "31.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line3': {
                x1: "6.2",
                x2: "1.36",
                y1: "31.18",
                y2: "15.03",
                fill: 'transparent',
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
                fill: 'transparent',
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
                d :"M3.2 42.43 H9.2 L6.2,47.43 L3.2 42.43Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px',
                magnet:true                                                                             
            },

        },

    },joint.shapes.basic.Generic.prototype.defaults)
})

// 环网柜B
joint.shapes.basic.HWCabinetB = joint.shapes.basic.Generic.extend({
    markup:[
        '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/></g>',
        '<g class="inPorts">',
        '<g class="port1"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
        '<g class="port2"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>', 
        '<g class="port3"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',         
        '<g class="port4"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',       
        '</g>',
        '</g>'].join(''),
    defaults: _.defaultsDeep({
        type: 'basic.HWCabinetB',
        size: {
            width: 124,
            height: 84
        },
        attrs: {
            '.port1':{
                ref:'.line',
                'ref-x':10,
                'ref-y':0,                       
            },
            '.port2':{
                ref:'.line',
                'ref-x':40,
                'ref-y':0,  
            },
            '.port3':{
                ref:'.line',
                'ref-x':70,
                'ref-y':0,  
            },
            '.port4':{
                ref:'.line',
                'ref-x':100,
                'ref-y':0,  
            },
            '.rect': {
                width:44,
                height:44,
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.rect1': {
                width: "7.89",
                height: "22.41",
                x: "0.34",
                y: "6.23",
                fill: '#8c8c8c',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l1': {
                x1:"4.38",x2:"4.38",y1:"0.34",y2:"5.95",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l2': {
                x1:"4.38",x2:"4.38",y1:"34.24",y2:"28.64",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l3': {
                x1:"4.38",x2:"4.38",y1:"35.24",y2:"40.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l4': {
                x1:"0.38",x2:"8.76",y1:"40.24",y2:"40.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },            
            '.l5': {
                x1:"0.38",x2:"4.38",y1:"40.24",y2:"55.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l6': {
                x1:"4.38",x2:"4.38",y1:"55.24",y2:"65.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.p5': {
                d :"M1.2 65.24 H7.2 L4.38,70.24 L1.2 65.24Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px',
                magnet:true                                                                             
            },
            '.line':{
                x1:'5',
                y1:'5',
                x2:'39',
                y2:'5',
                stroke: 'black',
                'stroke-width': '3px',
            },
            '.line1': {
                x1: "6.2",
                x2: "6.2",
                y1: "0.35",
                y2: "14.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line2': {
                x1: "6.2",
                x2: "6.2",
                y1: "42.43",
                y2: "31.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line3': {
                x1: "6.2",
                x2: "1.36",
                y1: "31.18",
                y2: "15.03",
                fill: 'transparent',
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
                fill: 'transparent',
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
                d :"M3.2 42.43 H9.2 L6.2,47.43 L3.2 42.43Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px',
                magnet:true                                                                             
            },

        },

    },joint.shapes.basic.Generic.prototype.defaults)
})

// 环网柜B
joint.shapes.basic.HWCabinetC = joint.shapes.basic.Generic.extend({
    markup:[
        '<g class="rotatable"><g class="scalable"><rect class="rect"/><line class="line"/></g>',
        '<g class="inPorts">',
        '<g class="port1"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',
        '<g class="port2"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>', 
        '<g class="port3"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',         
        '<g class="port4"><rect class="rect1"/><line class="l1"/><line class="l2"/><line class="l3"/><line class="l4"/><line class="l5"/><line class="l6"/><path class="p5"/></g>',         
        '<g class="port5"><line class="line1"/><line class="line2"/><line class="line3"/><line class="line4"/><ellipse class="ell1"/><ellipse class="ell2"/><path class="p4"/></g>',       
        '</g>',
        '</g>'].join(''),
    defaults: _.defaultsDeep({
        type: 'basic.HWCabinetC',
        size: {
            width: 124,
            height: 84
        },
        attrs: {
            '.port1':{
                ref:'.line',
                'ref-x':10,
                'ref-y':0,                       
            },
            '.port2':{
                ref:'.line',
                'ref-x':40,
                'ref-y':0,  
            },
            '.port3':{
                ref:'.line',
                'ref-x':70,
                'ref-y':0,  
            },
            '.port4':{
                ref:'.line',
                'ref-x':100,
                'ref-y':0,  
            },
            '.port5':{
                ref:'.line',
                'ref-x':130,
                'ref-y':0,  
            },
            '.rect': {
                width:44,
                height:44,
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.rect1': {
                width: "7.89",
                height: "22.41",
                x: "0.34",
                y: "6.23",
                fill: '#8c8c8c',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l1': {
                x1:"4.38",x2:"4.38",y1:"0.34",y2:"5.95",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l2': {
                x1:"4.38",x2:"4.38",y1:"34.24",y2:"28.64",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l3': {
                x1:"4.38",x2:"4.38",y1:"35.24",y2:"40.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l4': {
                x1:"0.38",x2:"8.76",y1:"40.24",y2:"40.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },            
            '.l5': {
                x1:"0.38",x2:"4.38",y1:"40.24",y2:"55.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.l6': {
                x1:"4.38",x2:"4.38",y1:"55.24",y2:"65.24",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px'
            },
            '.p5': {
                d :"M1.2 65.24 H7.2 L4.38,70.24 L1.2 65.24Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px',
                magnet:true                                                                             
            },
            '.line':{
                x1:'5',
                y1:'5',
                x2:'39',
                y2:'5',
                stroke: 'black',
                'stroke-width': '3px',
            },
            '.line1': {
                x1: "6.2",
                x2: "6.2",
                y1: "0.35",
                y2: "14.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line2': {
                x1: "6.2",
                x2: "6.2",
                y1: "42.43",
                y2: "31.28",
                fill: 'transparent',
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '1px'
            },
            '.line3': {
                x1: "6.2",
                x2: "1.36",
                y1: "31.18",
                y2: "15.03",
                fill: 'transparent',
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
                fill: 'transparent',
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
                d :"M3.2 42.43 H9.2 L6.2,47.43 L3.2 42.43Z",
                fill: 'transparent',
                stroke: 'black',
                'stroke-width': '1px',
                magnet:true                                                                             
            },

        },

    },joint.shapes.basic.Generic.prototype.defaults)
})