/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2017-11-20 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


var App = App || {};
App.config = App.config || {};

(function () {

  'use strict';

  var options = {

    colorPalette: [{
        content: 'transparent',
        icon: 'src/renderer/assets/images/transparent-icon.png'
      },
      {
        content: '#f6f6f6'
      },
      {
        content: '#FFFFFF'
      },
      {
        content: '#dcd7d7'
      },
      {
        content: '#8f8f8f'
      },
      {
        content: '#c6c7e2'
      },
      {
        content: '#feb663'
      },
      {
        content: '#fe854f'
      },
      {
        content: '#b75d32'
      },
      {
        content: '#31d0c6'
      },
      {
        content: '#7c68fc'
      },
      {
        content: '#61549C'
      },
      {
        content: '#6a6c8a'
      },
      {
        content: '#4b4a67'
      },
      {
        content: '#3c4260'
      },
      {
        content: '#33334e'
      },
      {
        content: '#222138'
      }
    ],

    fontWeight: [{
        value: '300',
        content: '<span style="font-weight: 300">Light</span>'
      },
      {
        value: 'Normal',
        content: '<span style="font-weight: Normal">Normal</span>'
      },
      {
        value: 'Bold',
        content: '<span style="font-weight: Bolder">Bold</span>'
      }
    ],

    fontFamily: [{
        value: 'Alegreya Sans',
        content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>'
      },
      {
        value: 'Averia Libre',
        content: '<span style="font-family: Averia Libre">Averia Libre</span>'
      },
      {
        value: 'Roboto Condensed',
        content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>'
      }
    ],

    strokeStyle: [{
        value: '0',
        content: '架空线'
      },
      {
        value: '10,5',
        content: '地下电缆'
      }
    ],

    side: [{
        value: 'top',
        content: '上方'
      },
      {
        value: 'right',
        content: '右方'
      },
      {
        value: 'bottom',
        content: '下方'
      },
      {
        value: 'left',
        content: '左方'
      }
    ],

    portLabelPositionRectangle: [{
        value: {
          name: 'top',
          args: {
            y: -12
          }
        },
        content: 'Above'
      },
      {
        value: {
          name: 'right',
          args: {
            y: 0
          }
        },
        content: 'On Right'
      },
      {
        value: {
          name: 'bottom',
          args: {
            y: 12
          }
        },
        content: 'Below'
      },
      {
        value: {
          name: 'left',
          args: {
            y: 0
          }
        },
        content: 'On Left'
      }
    ],

    portLabelPositionEllipse: [{
        value: 'radial',
        content: 'Horizontal'
      },
      {
        value: 'radialOriented',
        content: 'Angled'
      }
    ],

    imageIcons: [{
        value: 'assets/image-icon1.svg',
        content: '<img height="42px" src="assets/image-icon1.svg"/>'
      },
      {
        value: 'assets/image-icon2.svg',
        content: '<img height="80px" src="assets/image-icon2.svg"/>'
      },
      {
        value: 'assets/image-icon3.svg',
        content: '<img height="80px" src="assets/image-icon3.svg"/>'
      },
      {
        value: 'assets/image-icon4.svg',
        content: '<img height="80px" src="assets/image-icon4.svg"/>'
      }
    ],

    imageGender: [{
        value: 'assets/member-male.png',
        content: '<img height="50px" src="assets/member-male.png" style="margin: 5px 0 0 2px;"/>'
      },
      {
        value: 'assets/member-female.png',
        content: '<img height="50px" src="assets/member-female.png" style="margin: 5px 0 0 2px;"/>'
      }
    ],

    arrowheadSize: [{
        value: 'scale(0.001)',
        content: 'None'
      },
      {
        value: 'scale(1)',
        content: 'Small'
      },
      {
        value: 'scale(2)',
        content: 'Medium'
      },
      {
        value: 'scale(4)',
        content: 'Large'
      }
    ],

    strokeWidth: [{
        value: 1,
        content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>'
      },
      {
        value: 2,
        content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>'
      },
      {
        value: 4,
        content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>'
      },
      {
        value: 8,
        content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>'
      }
    ],

    router: [{
        value: 'normal',
        content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>'
      },
      {
        value: 'orthogonal',
        content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>'
      },
      {
        value: 'oneSide',
        content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>'
      }
    ],

    connector: [{
        value: 'normal',
        content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>'
      },
      {
        value: 'rounded',
        content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>'
      },
      {
        value: 'smooth',
        content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>'
      }
    ],

    labelPosition: [{
        value: 30,
        content: 'Close to source'
      },
      {
        value: 0.5,
        content: 'In the middle'
      },
      {
        value: -30,
        content: 'Close to target'
      },
    ],

    portMarkup: [{
        value: '<rect class="port-body" width="20" height="20" x="-10" y="-10"/>',
        content: 'Rectangle'
      },
      {
        value: '<circle class="port-body" r="10"/>',
        content: 'Circle'
      },
      {
        value: '<path class="port-body" d="M -10 -10 10 -10 0 10 z"/>',
        content: 'Triangle'
      }
    ],
    switchState: [{
        value: '1',
        content: '开'
      },
      {
        value: '0',
        content: '关'
      }
    ],
    stationLabePostion: [{
      value: 'bottom',
      content: '下方'
    }, {
      value: 'top',
      content: '上方'
    }, {
      value: 'left',
      content: '左边'
    }, {
      value: 'right',
      content: '右边'
    }, ],
    strokeOpacity: [{
        value: '0',
        content: '无'
      },
      {
        value: '1',
        content: '有'
      },
    ],
    fontSize: [{
        value: '8px',
        content: '8'
      },
      {
        value: '10px',
        content: '10'
      }, {
        value: '12px',
        content: '12'
      }, {
        value: '14px',
        content: '14'
      }, {
        value: '18px',
        content: '18'
      }, {
        value: '20px',
        content: '20'
      }, {
        value: '24px',
        content: '24'
      }, {
        value: '36px',
        content: '36'
      }, {
        value: '48px',
        content: '48'
      },
    ]
  };

  App.config.inspector = {
    'app.Link': {
      inputs: {
        attrs: {
          '.connection': {
            strokeDasharray: {
              type: 'select-box',
              options: options.strokeStyle,
              group: 'connection',
              label: '线路种类',
              when: {
                ne: {
                  'attrs/.connection/stroke': 'transparent'
                }
              },
              index: 5
            }
          },
          '.marker-source': {
            transform: {
              type: 'select-box',
              options: options.arrowheadSize,
              group: 'marker-source',
              label: '线头样式',
              index: 1
            },
            fill: {
              type: 'color-palette',
              options: options.colorPalette,
              group: 'marker-source',
              label: '线头颜色',
              when: {
                ne: {
                  'attrs/.marker-source/transform': 'scale(0.001)'
                }
              },
              index: 2
            }
          },
        },
        router: {
          name: {
            type: 'select-button-group',
            options: options.router,
            group: 'connection',
            label: '线路走向方式',
            index: 1,
            defaultValue: options.router['orthogonal']
          },
          args: {
            side: {
              type: 'select-box',
              options: options.side,
              placeholder: '选择方向',
              group: 'connection',
              label: '转角方向',
              when: {
                eq: {
                  'router/name': 'oneSide'
                },
                otherwise: {
                  unset: true
                }
              },
              index: 2
            }
          }
        },
      },
      groups: {
        connection: {
          label: 'Connection',
          index: 1
        },
        'marker-source': {
          label: 'Source marker',
          index: 2
        },
        'marker-target': {
          label: 'Target marker',
          index: 3
        },
        labels: {
          label: 'Labels',
          index: 4
        }
      }
    },
    'basic.textLabel': {
      inputs: {
        attrs: {
          text: {
            text: {
              type: 'content-editable',
              label: '文本',
              group: 'presentation',
              index: 1
            },
            // 'font-size': {
            //   type: 'range',
            //   min: 5,
            //   max: 30,
            //   label: '字体大小',
            //   group: 'presentation',
            //   index: 2
            // }
          },
        }
      },
      groups: {
        presentation: {
          label: '属性',
          index: 1
        }
      },
    },
    // 隔离开关配置
    'basic.isolationSwitch': {
      inputs: {
        attrs: {
          text: {
            text: {
              type: 'content-editable',
              label: '编号',
              group: 'presentation',
              index: 1
            }
          },
        },
        state: {
          type: 'select',
          options: options.switchState,
          defaultValue: '1',
          label: '开关状态',
          group: 'presentation',
          index: 2
        }
      },
      groups: {
        presentation: {
          label: '状态',
          index: 1
        }
      },

    },
    // 负荷开关配置
    'basic.loadSwitch': {
      inputs: {
        attrs: {
          text: {
            text: {
              type: 'content-editable',
              label: '编号',
              group: 'presentation',
              index: 1
            }
          },
        },
        state: {
          type: 'select',
          options: options.switchState,
          defaultValue: '1',
          label: '开关状态',
          group: 'presentation',
          index: 2
        }
      },
      groups: {
        presentation: {
          label: '状态',
          index: 1
        }
      },
    },
    'basic.KGStation': {
      inputs: {
        attrs: {
          '.label': {
            text: {
              type: 'content-editable',
              label: '名称',
              group: 'presentation',
              index: 1
            }
          },
        },
        devsInfomation: {
          code: {
            type: 'content-editable',
            label: '编码',
            group: 'property',
            index: 3
          },
          num: {
            type: 'content-editable',
            label: '数量',
            group: 'property',
            index: 4
          },
          power: {
            type: 'content-editable',
            label: '功率',
            group: 'property',
            index: 5
          },
        },
        lablePostion: {
          type: 'select',
          options: options.stationLabePostion,
          defaultValue: '1',
          label: '名称位置',
          group: 'presentation',
          index: 2
        }
      },
      groups: {
        presentation: {
          label: '基础',
          index: 1
        },
        property: {
          label: '属性',
          index: 1
        }
      },
    },
    'basic.textBox': {
      inputs: {
        attrs: {
          rect: {
            'stroke-opacity': {
              type: 'select',
              options: options.strokeOpacity,
              defaultValue: '1',
              label: '有无边框',
              group: 'presentation',
              index: 3
            }
          }
        },
        content: {
          type: 'textarea',
          label: '文本',
          group: 'presentation',
          index: 1
        },
        fontSize: {
          type: 'select',
          options: options.fontSize,
          defaultValue: '12px',
          label: '文本大小',
          group: 'presentation',
          index: 2
        }
      },
      groups: {
        presentation: {
          label: '基础',
          index: 1
        }
      },
    }
  };

})();

export default {
  inspectorConfig: App.config.inspector
}