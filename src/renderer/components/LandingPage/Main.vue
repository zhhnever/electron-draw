<template>
  <div>
    <div id="toolbar"></div>
	<div class="list">
		<ul>
			<li class="selected"><img src="../../assets/images/icon.png" alt=""><span>基础#</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>架空设备</span></li>
			<li><img src="../../assets/images/icon.png" alt=""><span>线路</span></li>
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
      tabShow: true,
      inspectorOptions: {
        colorPalette: [
          { content: 'transparent', icon: 'assets/transparent-icon.png' },
          { content: '#f6f6f6' },
          { content: '#dcd7d7' },
          { content: '#8f8f8f' },
          { content: '#c6c7e2' },
          { content: '#feb663' },
          { content: '#fe854f' },
          { content: '#b75d32' },
          { content: '#31d0c6' },
          { content: '#7c68fc' },
          { content: '#61549C' },
          { content: '#6a6c8a' },
          { content: '#4b4a67' },
          { content: '#3c4260' },
          { content: '#33334e' },
          { content: '#222138' }
        ],

        fontWeight: [
          { value: '300', content: '<span style="font-weight: 300">Light</span>' },
          { value: 'Normal', content: '<span style="font-weight: Normal">Normal</span>' },
          { value: 'Bold', content: '<span style="font-weight: Bolder">Bold</span>' }
        ],

        fontFamily: [
          { value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
          { value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
          { value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
        ],

        strokeStyle: [
          { value: '0', content: 'Solid' },
          { value: '2,5', content: 'Dotted' },
          { value: '10,5', content: 'Dashed' }
        ],

        side: [
          { value: 'top', content: 'Top Side' },
          { value: 'right', content: 'Right Side' },
          { value: 'bottom', content: 'Bottom Side' },
          { value: 'left', content: 'Left Side' }
        ],

        portLabelPositionRectangle: [
          { value: { name: 'top', args: { y: -12 } }, content: 'Above' },
          { value: { name: 'right', args: { y: 0 } }, content: 'On Right' },
          { value: { name: 'bottom', args: { y: 12 } }, content: 'Below' },
          { value: { name: 'left', args: { y: 0 } }, content: 'On Left' }
        ],

        portLabelPositionEllipse: [
          { value: 'radial', content: 'Horizontal' },
          { value: 'radialOriented', content: 'Angled' }
        ],

        imageIcons: [
          { value: 'assets/image-icon1.svg', content: '<img height="42px" src="assets/image-icon1.svg"/>' },
          { value: 'assets/image-icon2.svg', content: '<img height="80px" src="assets/image-icon2.svg"/>' },
          { value: 'assets/image-icon3.svg', content: '<img height="80px" src="assets/image-icon3.svg"/>' },
          { value: 'assets/image-icon4.svg', content: '<img height="80px" src="assets/image-icon4.svg"/>' }
        ],

        imageGender: [
          { value: 'assets/member-male.png', content: '<img height="50px" src="assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
          { value: 'assets/member-female.png', content: '<img height="50px" src="assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
        ],

        arrowheadSize: [
          { value: 'scale(0.001)', content: 'None' },
          { value: 'scale(1)', content: 'Small' },
          { value: 'scale(2)', content: 'Medium' },
          { value: 'scale(4)', content: 'Large' }
        ],

        strokeWidth: [
          { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
          { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
          { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
          { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
        ],

        router: [
          { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
          { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
          { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
        ],

        connector: [
          { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
          { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
          { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
        ],

        labelPosition: [
          { value: 30, content: 'Close to source' },
          { value: 0.5, content: 'In the middle' },
          { value: -30, content: 'Close to target' }
        ],

        portMarkup: [
          { value: '<rect class="port-body" width="20" height="20" x="-10" y="-10"/>', content: 'Rectangle' },
          { value: '<circle class="port-body" r="10"/>', content: 'Circle' },
          { value: '<path class="port-body" d="M -10 -10 10 -10 0 10 z"/>', content: 'Triangle' }
        ]
      }
    }
  },
  mounted: function () {
    const _this = this
    this.initInspectorConfig()
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
    paper.on('element:pointerup', function (cellView) {
      let cell = cellView.model
      _this.cellPulgin(cellView)
      _this.createInspector(cell)
    })
    _('#paperScroller').append(paperScroller.el)
    paperScroller.render().center()

    let snaplines = new joint.ui.Snaplines({
      paper: paper
    })
    snaplines.startListening()
    this.newStencil()
  },
  methods: {
    initInspectorConfig: function () {
      this.inspector = {
        'app.Link': {
          inputs: {
            attrs: {
              '.connection': {
                strokeWidth: {
                  type: 'select-button-group',
                  options: this.inspectorOptions.strokeWidth,
                  group: 'connection',
                  label: 'Link thickness',
                  when: { ne: { 'attrs/.connection/stroke': 'transparent' } },
                  index: 4
                },
                strokeDasharray: {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  group: 'connection',
                  label: 'Link style',
                  when: { ne: { 'attrs/.connection/stroke': 'transparent' } },
                  index: 5
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  group: 'connection',
                  label: 'Color',
                  index: 6
                }
              },
              '.marker-source': {
                transform: {
                  type: 'select-box',
                  options: this.inspectorOptions.colorPalette.arrowheadSize,
                  group: 'marker-source',
                  label: 'Source arrowhead',
                  index: 1
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette.colorPalette,
                  group: 'marker-source',
                  label: 'Color',
                  when: { ne: { 'attrs/.marker-source/transform': 'scale(0.001)' } },
                  index: 2
                }
              },
              '.marker-target': {
                transform: {
                  type: 'select-box',
                  options: this.inspectorOptions.colorPalette.arrowheadSize,
                  group: 'marker-target',
                  label: 'Target arrowhead',
                  index: 1
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  group: 'marker-target',
                  label: 'Color',
                  when: { ne: { 'attrs/.marker-target/transform': 'scale(0.001)' } },
                  index: 2
                }
              }
            },
            router: {
              name: {
                type: 'select-button-group',
                options: this.inspectorOptions.router,
                group: 'connection',
                label: 'Connection type',
                index: 1
              },
              args: {
                side: {
                  type: 'select-box',
                  options: this.inspectorOptions.side,
                  placeholder: 'Pick a side',
                  group: 'connection',
                  label: 'Anchors side',
                  when: { eq: { 'router/name': 'oneSide' }, otherwise: { unset: true } },
                  index: 2
                }
              }
            },
            connector: {
              name: {
                type: 'select-button-group',
                options: this.inspectorOptions.connector,
                group: 'connection',
                label: 'Connection style',
                index: 3
              }
            },
            labels: {
              type: 'list',
              group: 'labels',
              label: 'Labels',
              attrs: {
                label: {
                  'data-tooltip': 'Set (possibly multiple) labels for the link',
                  'data-tooltip-position': 'right',
                  'data-tooltip-position-selector': '.joint-inspector'
                }
              },
              item: {
                type: 'object',
                properties: {
                  attrs: {
                    text: {
                      text: {
                        type: 'text',
                        label: 'text',
                        defaultValue: 'label',
                        index: 1,
                        attrs: {
                          label: {
                            'data-tooltip': 'Set text of the label',
                            'data-tooltip-position': 'right',
                            'data-tooltip-position-selector': '.joint-inspector'
                          }
                        }
                      }
                    }
                  },
                  position: {
                    type: 'select-box',
                    options: this.inspectorOptions.labelPosition || [],
                    defaultValue: 0.5,
                    label: 'Position',
                    index: 2,
                    attrs: {
                      label: {
                        'data-tooltip': 'Position the label relative to the source of the link',
                        'data-tooltip-position': 'right',
                        'data-tooltip-position-selector': '.joint-inspector'
                      }
                    }
                  }
                }
              }
            }
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
        'basic.Rect': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              rect: {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/rect/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/rect/stroke': 'transparent' } },
                      { ne: { 'attrs/rect/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'basic.Circle': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              circle: {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/circle/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/circle/stroke': 'transparent' } },
                      { ne: { 'attrs/circle/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'basic.Image': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              image: {
                'xlink:href': {
                  type: 'select-box',
                  options: this.inspectorOptions.imageIcons,
                  label: 'Image',
                  group: 'presentation',
                  index: 1
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'app.RectangularModel': {
          inputs: {
            attrs: {
              '.label': {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 5
                }
              },
              '.body': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.body/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.body/stroke': 'transparent' } },
                      { ne: { 'attrs/.body/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            },
            ports: {
              groups: {
                'in': {
                  attrs: {
                    '.port-body': {
                      fill: {
                        type: 'color-palette',
                        options: this.inspectorOptions.colorPalette,
                        label: 'Fill',
                        when: { not: { equal: { inPorts: [] } } },
                        group: 'inPorts',
                        index: 1
                      }
                    }
                  },
                  position: {
                    name: {
                      type: 'select-box',
                      options: this.inspectorOptions.side,
                      label: 'Position',
                      when: { not: { equal: { inPorts: [] } } },
                      group: 'inPorts',
                      index: 3
                    }
                  },
                  label: {
                    position: {
                      type: 'select-box',
                      options: this.inspectorOptions.portLabelPositionRectangle,
                      label: 'Text Position',
                      when: { not: { equal: { inPorts: [] } } },
                      group: 'inPorts',
                      index: 4
                    }
                  },
                  markup: {
                    type: 'select-box',
                    options: this.inspectorOptions.portMarkup,
                    label: 'Port Shape',
                    group: 'inPorts',
                    index: 5
                  }
                },
                'out': {
                  attrs: {
                    '.port-body': {
                      fill: {
                        type: 'color-palette',
                        options: this.inspectorOptions.colorPalette,
                        label: 'Fill',
                        when: { not: { equal: { outPorts: [] } } },
                        group: 'outPorts',
                        index: 2
                      }
                    }
                  },
                  position: {
                    name: {
                      type: 'select-box',
                      options: this.inspectorOptions.side,
                      label: 'Position',
                      when: { not: { equal: { outPorts: [] } } },
                      group: 'outPorts',
                      index: 4
                    }
                  },
                  label: {
                    position: {
                      type: 'select-box',
                      options: this.inspectorOptions.portLabelPositionRectangle,
                      label: 'Text Position',
                      when: { not: { equal: { outPorts: [] } } },
                      group: 'outPorts',
                      index: 5
                    }
                  },
                  markup: {
                    type: 'select-box',
                    options: this.inspectorOptions.portMarkup,
                    label: 'Port Shape',
                    group: 'outPorts',
                    index: 6
                  }
                }
              }
            },
            inPorts: {
              type: 'list',
              label: 'Ports',
              item: {
                type: 'text'
              },
              group: 'inPorts',
              index: 0
            },
            outPorts: {
              type: 'list',
              label: 'Ports',
              item: {
                type: 'text'
              },
              group: 'outPorts',
              index: 0
            }
          },
          groups: {
            inPorts: {
              label: 'Input Ports',
              index: 1
            },
            outPorts: {
              label: 'Output Ports',
              index: 2
            },
            presentation: {
              label: 'Presentation',
              index: 3
            },
            text: {
              label: 'Text',
              index: 4
            }
          }
        },
        'app.CircularModel': {
          inputs: {
            attrs: {
              '.label': {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 5
                }
              },
              '.body': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.body/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.body/stroke': 'transparent' } },
                      { ne: { 'attrs/.body/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            },
            ports: {
              groups: {
                'in': {
                  attrs: {
                    '.port-body': {
                      fill: {
                        type: 'color-palette',
                        options: this.inspectorOptions.colorPalette,
                        label: 'Fill',
                        when: { not: { equal: { inPorts: [] } } },
                        group: 'inPorts',
                        index: 1
                      }
                    }
                  },
                  position: {
                    args: {
                      startAngle: {
                        type: 'range',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        unit: '°',
                        label: 'Position',
                        when: { not: { equal: { inPorts: [] } } },
                        group: 'inPorts',
                        index: 3
                      }
                    }
                  },
                  label: {
                    position: {
                      name: {
                        type: 'select-button-group',
                        options: this.inspectorOptions.portLabelPositionEllipse,
                        label: 'Text direction',
                        when: { not: { equal: { inPorts: [] } } },
                        group: 'inPorts',
                        index: 4
                      }
                    }
                  },
                  markup: {
                    type: 'select-box',
                    options: this.inspectorOptions.portMarkup,
                    label: 'Port Shape',
                    group: 'inPorts',
                    index: 5
                  }
                },
                'out': {
                  attrs: {
                    '.port-body': {
                      fill: {
                        type: 'color-palette',
                        options: this.inspectorOptions.colorPalette,
                        label: 'Fill',
                        when: { not: { equal: { outPorts: [] } } },
                        group: 'outPorts',
                        index: 2
                      }
                    }
                  },
                  position: {
                    args: {
                      startAngle: {
                        type: 'range',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 180,
                        unit: '°',
                        label: 'Position',
                        when: { not: { equal: { outPorts: [] } } },
                        group: 'outPorts',
                        index: 4
                      }
                    }
                  },
                  label: {
                    position: {
                      name: {
                        type: 'select-button-group',
                        options: this.inspectorOptions.portLabelPositionEllipse,
                        label: 'Text Position',
                        when: { not: { equal: { outPorts: [] } } },
                        group: 'outPorts',
                        index: 5
                      }
                    }
                  },
                  markup: {
                    type: 'select-box',
                    options: this.inspectorOptions.portMarkup,
                    label: 'Port Shape',
                    group: 'outPorts',
                    index: 6
                  }
                }
              }
            },
            inPorts: {
              type: 'list',
              label: 'Ports',
              item: {
                type: 'text'
              },
              group: 'inPorts',
              index: 0
            },
            outPorts: {
              type: 'list',
              label: 'Ports',
              item: {
                type: 'text'
              },
              group: 'outPorts',
              index: 0
            }
          },
          groups: {
            inPorts: {
              label: 'Input Ports',
              index: 1
            },
            outPorts: {
              label: 'Output Ports',
              index: 2
            },
            presentation: {
              label: 'Presentation',
              index: 3
            },
            text: {
              label: 'Text',
              index: 4
            }
          }
        },
        'fsa.StartState': {
          inputs: {
            attrs: {
              circle: {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            }
          }
        },
        'fsa.EndState': {
          inputs: {
            attrs: {
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              '.inner': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Inner fill',
                  group: 'presentation',
                  index: 2
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'fsa.State': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              circle: {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/circle/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/circle/stroke': 'transparent' } },
                      { ne: { 'attrs/circle/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'pn.Place': {
          inputs: {
            attrs: {
              '.label': {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 5
                }
              },
              '.root': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.root/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.root/stroke': 'transparent' } },
                      { ne: { 'attrs/.root/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            },
            tokens: {
              type: 'number',
              min: 1,
              max: 500,
              group: 'data',
              index: 1
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 2
            },
            text: {
              label: 'Text',
              index: 3
            },
            data: {
              label: 'Data',
              index: 1
            }
          }
        },
        'pn.Transition': {
          inputs: {
            attrs: {
              '.label': {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/.label/text': '' } },
                  index: 5
                }
              },
              rect: {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/rect/stroke': 'transparent' } },
                  index: 2
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/rect/stroke': 'transparent' } },
                      { ne: { 'attrs/rect/stroke-width': 0 } }
                    ]
                  },
                  index: 3
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'erd.Entity': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'erd.WeakEntity': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'outer',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'outer',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'outer',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'outer',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              '.inner': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'inner',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'inner',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'inner',
                  when: { ne: { 'attrs/.inner/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'inner',
                  when: {
                    and: [
                      { ne: { 'attrs/.inner/stroke': 'transparent' } },
                      { ne: { 'attrs/.inner/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            text: {
              label: 'Text',
              index: 1
            },
            outer: {
              label: 'Outer rectangle',
              index: 2
            },
            inner: {
              label: 'Inner rectangle',
              index: 3
            }
          }
        },
        'erd.Relationship': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'erd.IdentifyingRelationship': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'outer',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'outer',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'outer',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'outer',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              '.inner': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'inner',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'inner',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'inner',
                  when: { ne: { 'attrs/.inner/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'inner',
                  when: {
                    and: [
                      { ne: { 'attrs/.inner/stroke': 'transparent' } },
                      { ne: { 'attrs/.inner/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            text: {
              label: 'Text',
              index: 1
            },
            outer: {
              label: 'Outer polygon',
              index: 2
            },
            inner: {
              label: 'Inner polygon',
              index: 3
            }
          }
        },
        'erd.Key': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'outer',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'outer',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'outer',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'outer',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              '.inner': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'inner',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'inner',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'inner',
                  when: { ne: { 'attrs/.inner/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'inner',
                  when: {
                    and: [
                      { ne: { 'attrs/.inner/stroke': 'transparent' } },
                      { ne: { 'attrs/.inner/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            text: {
              label: 'Text',
              index: 1
            },
            outer: {
              label: 'Outer ellipse',
              index: 2
            },
            inner: {
              label: 'Inner ellipse',
              index: 3
            }
          }
        },
        'erd.Normal': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'erd.Multivalued': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'outer',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'outer',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'outer',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'outer',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              '.inner': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'inner',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'inner',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'inner',
                  when: { ne: { 'attrs/.inner/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'inner',
                  when: {
                    and: [
                      { ne: { 'attrs/.inner/stroke': 'transparent' } },
                      { ne: { 'attrs/.inner/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            text: {
              label: 'Text',
              index: 1
            },
            outer: {
              label: 'Outer ellipse',
              index: 2
            },
            inner: {
              label: 'Inner ellipse',
              index: 3
            }
          }
        },
        'erd.Derived': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              '.outer': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'outer',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'outer',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'outer',
                  when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'outer',
                  when: {
                    and: [
                      { ne: { 'attrs/.outer/stroke': 'transparent' } },
                      { ne: { 'attrs/.outer/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              '.inner': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'inner',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'inner',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'inner',
                  when: { ne: { 'attrs/.inner/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'inner',
                  when: {
                    and: [
                      { ne: { 'attrs/.inner/stroke': 'transparent' } },
                      { ne: { 'attrs/.inner/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            text: {
              label: 'Text',
              index: 1
            },
            outer: {
              label: 'Outer ellipse',
              index: 2
            },
            inner: {
              label: 'Inner ellipse',
              index: 3
            }
          }
        },
        'erd.ISA': {
          inputs: {
            attrs: {
              text: {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'text',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'attrs/text/text': '' } },
                  index: 5
                }
              },
              polygon: {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/polygon/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/polygon/stroke': 'transparent' } },
                      { ne: { 'attrs/polygon/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'Text',
              index: 2
            }
          }
        },
        'uml.Class': {
          inputs: {
            attrs: {
              '.uml-class-name-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'name',
                  index: 4
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'name',
                  index: 5
                }
              },
              '.uml-class-attrs-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'attributes',
                  index: 4
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'attributes',
                  index: 5
                }
              },
              '.uml-class-methods-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'methods',
                  index: 4
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'methods',
                  index: 5
                }
              }
            },
            name: {
              type: 'text',
              group: 'name',
              index: 1,
              label: 'Class name'
            },
            attributes: {
              type: 'list',
              item: {
                type: 'text'
              },
              group: 'attributes',
              index: 1,
              label: 'Attributes'
            },
            methods: {
              type: 'list',
              item: {
                type: 'text'
              },
              group: 'methods',
              index: 1,
              label: 'Methods'
            }
          },
          groups: {
            name: {
              label: 'Class name',
              index: 1
            },
            attributes: {
              label: 'Attributes',
              index: 2
            },
            methods: {
              label: 'Methods',
              index: 3
            }
          }
        },
        'uml.Interface': {
          inputs: {
            attrs: {
              '.uml-class-name-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'name',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'name',
                  index: 2
                }
              },
              '.uml-class-attrs-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'attributes',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'attributes',
                  index: 2
                }
              },
              '.uml-class-methods-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'methods',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'methods',
                  index: 2
                }
              }
            },
            name: {
              type: 'text',
              group: 'name',
              index: 0,
              label: 'Interface name'
            },
            attributes: {
              type: 'list',
              item: {
                type: 'text'
              },
              group: 'attributes',
              index: 0,
              label: 'Attributes'
            },
            methods: {
              type: 'list',
              item: {
                type: 'text'
              },
              group: 'methods',
              index: 0,
              label: 'Methods'
            }
          },
          groups: {
            name: {
              label: 'Interface name',
              index: 1
            },
            attributes: {
              label: 'Attributes',
              index: 2
            },
            methods: {
              label: 'Methods',
              index: 3
            }
          }
        },
        'uml.Abstract': {
          inputs: {
            attrs: {
              '.uml-class-name-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'name',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'name',
                  index: 2
                }
              },
              '.uml-class-attrs-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'attributes',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'attributes',
                  index: 2
                }
              },
              '.uml-class-methods-rect': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'methods',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'methods',
                  index: 2
                }
              }
            },
            name: {
              type: 'text',
              group: 'name',
              index: 0,
              label: 'Abstract class name'
            },
            attributes: {
              type: 'list',
              item: {
                type: 'text'
              },
              group: 'attributes',
              index: 0,
              label: 'Attributes'
            },
            methods: {
              type: 'list',
              item: {
                type: 'text'
              },
              group: 'methods',
              index: 0,
              label: 'Methods'
            }
          },
          groups: {
            name: {
              label: 'Abstract class name',
              index: 1
            },
            attributes: {
              label: 'Attributes Text',
              index: 2
            },
            methods: {
              label: 'Methods Text',
              index: 3
            }
          }
        },
        'uml.State': {
          inputs: {
            name: {
              group: 'text',
              index: 1,
              type: 'text'
            },
            events: {
              group: 'events',
              index: 1,
              type: 'list',
              item: {
                type: 'text'
              }
            },
            attrs: {
              '.uml-state-name': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'text',
                  when: { ne: { 'name': '' } },
                  index: 5
                }
              },
              '.uml-state-body': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.uml-state-body/stroke': 'transparent' } },
                  index: 4
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.uml-state-body/stroke': 'transparent' } },
                      { ne: { 'attrs/.uml-state-body/stroke-width': 0 } }
                    ]
                  },
                  index: 5
                }
              },
              '.uml-state-separator': {
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Horizontal rule outline',
                  group: 'presentation',
                  index: 3
                }
              },
              '.uml-state-events': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'events',
                  when: { ne: { 'events': 0 } },
                  index: 5
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 1
            },
            text: {
              label: 'State name text',
              index: 2
            },
            events: {
              label: 'State events text',
              index: 3
            }
          }
        },
        'org.Member': {
          inputs: {
            attrs: {
              '.rank': {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'rank',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'rank',
                  when: { ne: { 'attrs/.rank/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'rank',
                  when: { ne: { 'attrs/.rank/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'rank',
                  when: { ne: { 'attrs/.rank/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'rank',
                  when: { ne: { 'attrs/.rank/text': '' } },
                  index: 5
                }
              },
              '.name': {
                text: {
                  type: 'content-editable',
                  label: 'Text',
                  group: 'name',
                  index: 1
                },
                'font-size': {
                  type: 'range',
                  min: 5,
                  max: 80,
                  unit: 'px',
                  label: 'Font size',
                  group: 'name',
                  when: { ne: { 'attrs/.name/text': '' } },
                  index: 2
                },
                'font-family': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontFamily,
                  label: 'Font family',
                  group: 'name',
                  when: { ne: { 'attrs/.name/text': '' } },
                  index: 3
                },
                'font-weight': {
                  type: 'select-box',
                  options: this.inspectorOptions.fontWeight,
                  label: 'Font thickness',
                  group: 'name',
                  when: { ne: { 'attrs/.name/text': '' } },
                  index: 4
                },
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'name',
                  when: { ne: { 'attrs/.name/text': '' } },
                  index: 5
                }
              },
              '.card': {
                fill: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Fill',
                  group: 'presentation',
                  index: 1
                },
                stroke: {
                  type: 'color-palette',
                  options: this.inspectorOptions.colorPalette,
                  label: 'Outline',
                  group: 'presentation',
                  index: 2
                },
                'stroke-width': {
                  type: 'range',
                  min: 0,
                  max: 30,
                  step: 1,
                  defaultValue: 1,
                  unit: 'px',
                  label: 'Outline thickness',
                  group: 'presentation',
                  when: { ne: { 'attrs/.card/stroke': 'transparent' } },
                  index: 3
                },
                'stroke-dasharray': {
                  type: 'select-box',
                  options: this.inspectorOptions.strokeStyle,
                  label: 'Outline style',
                  group: 'presentation',
                  when: {
                    and: [
                      { ne: { 'attrs/.card/stroke': 'transparent' } },
                      { ne: { 'attrs/.card/stroke-width': 0 } }
                    ]
                  },
                  index: 4
                }
              },
              image: {
                'xlink:href': {
                  type: 'select-button-group',
                  options: this.inspectorOptions.imageGender,
                  label: 'Gender',
                  group: 'gender',
                  index: 1
                }
              }
            }
          },
          groups: {
            presentation: {
              label: 'Presentation',
              index: 4
            },
            rank: {
              label: 'Rank',
              index: 2
            },
            name: {
              label: 'Name',
              index: 3
            },
            gender: {
              label: 'Gender',
              index: 1
            }
          }
        }
      }
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
    },
    createInspector: function (cell) {
      return joint.ui.Inspector.create('#config', _.extend({
        cell: cell
      }, this.inspector[cell.get('type')]))
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
