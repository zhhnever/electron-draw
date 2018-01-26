/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2017-11-20 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

 import joint from './rappid.min.js'
 import _ from 'lodash'
 (function(joint) {
    
  'use strict';
  joint.shapes.basic.Generic.define('devs.eqelement', {
      inPorts: [],
      outPorts: [],
      attrs: {
          '.': {
              magnet: false
          },
          '.label': {
              text: 'Model',
              'ref-x': .5,
              'ref-y': 10,
              'font-size': 18,
              'text-anchor': 'middle',
              fill: '#000'
          },
          '.body': {
              'ref-width': '100%',
              'ref-height': '100%',
              stroke: '#000'
          }
      },
      ports: {
          groups: {
              'in': {
                  position: {
                      name: 'top'
                  },
                  attrs: {
                      '.port-label': {
                          fill: '#000'
                      },
                      '.port-body': {
                          fill: '#fff',
                          stroke: '#300',
                          r: 10,
                          magnet: 'passive'
                      }
                  },
                  label: {
                      position: {
                          name: 'top',
                          args: {
                              y: 10
                          }
                      }
                  }
              },
              'out': {
                  position: {
                      name: 'bottom'
                  },
                  attrs: {
                      '.port-label': {
                          fill: '#000'
                      },
                      '.port-body': {
                          fill: '#fff',
                          stroke: '#030',
                          magnet: true
                      }
                  },
                  label: {
                      position: {
                          name: 'bottom',
                          args: {
                              y: 10
                          }
                      }
                  }
              }
          }
      }
  }, {
      markup: '<g class="rotatable"><rect class="body"/><text class="label"/></g>',
      portMarkup: '<path class="port-body"/>',
      portLabelMarkup: '<text class="port-label"/>',
      initialize: function() {
          joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
          this.on('change:inPorts change:outPorts', this.updatePortItems, this);
          this.updatePortItems();
      },
      updatePortItems: function(model, changed, opt) {
          // Make sure all ports are unique.
          var inPorts = joint.util.uniq(this.get('inPorts'));
          var outPorts = joint.util.difference(joint.util.uniq(this.get('outPorts')), inPorts);
          var inPortItems = this.createPortItems('in', inPorts);
          var outPortItems = this.createPortItems('out', outPorts);
          this.prop('ports/items', inPortItems.concat(outPortItems), joint.util.assign({ rewrite: true }, opt));
      },
      createPortItem: function(group, port) {
          return {
              id: port,
              group: group,
              attrs: {
                  '.port-label': {
                      text: port
                  }
              }
          };
      },
      createPortItems: function(group, ports) {
  
          return joint.util.toArray(ports).map(this.createPortItem.bind(this, group));
      },
      _addGroupPort: function(port, group, opt) {
  
          var ports = this.get(group);
          return this.set(group, Array.isArray(ports) ? ports.concat(port) : [port], opt);
      },
      addOutPort: function(port, opt) {
  
          return this._addGroupPort(port, 'outPorts', opt);
      },
  
      addInPort: function(port, opt) {
  
          return this._addGroupPort(port, 'inPorts', opt);
      },
  
      _removeGroupPort: function(port, group, opt) {
  
          return this.set(group, joint.util.without(this.get(group), port), opt);
      },
  
      removeOutPort: function(port, opt) {
  
          return this._removeGroupPort(port, 'outPorts', opt);
      },
  
      removeInPort: function(port, opt) {
  
          return this._removeGroupPort(port, 'inPorts', opt);
      },
  
      _changeGroup: function(group, properties, opt) {
  
          return this.prop('ports/groups/' + group, joint.util.isObject(properties) ? properties : {}, opt);
      },
  
      changeInGroup: function(properties, opt) {
  
          return this._changeGroup('in', properties, opt);
      },
  
      changeOutGroup: function(properties, opt) {
  
          return this._changeGroup('out', properties, opt);
      }
  });
  // 变电站
  joint.shapes.devs.eqelement.define('eqelement.station', {
      size: { width: 100, height: 40 },
      attrs: {
          '.body': { x: 0, y: 0, width: 90, height:40, stroke: '#33334e', 'stroke-width': 2,fill: 'transparent'},
          '.label': {  
              'text':'变电站',
              'font-size': 14, 
              'ref-x': 0.5, 
              'ref-y': 0.5, 
              ref: '.body', 
              'x-alignment': 'middle', 
              'y-alignment': 'middle', 
              fill: '#000',
              'font-family':'Alegreya Sans',
              'font-weight':500
           }
      },
      ports: {
          groups: {
              'out': {
                  attrs: {
                      '.port-body':{ d: 'M0 0 0 10 -10 10 -10 20 10 20 0 20 0 30 -5 30 0 38 5 30 0 30 0 20 10 20 10 10 0 10 0 0 Z',stroke: '#000',fill: 'transparent'},
                      '.port-label': {
                          fontSize: 9,
                          fill: '#000',
                          fontWeight: 600
                      }
                  },
                  label: {
                      position: {
                          name: 'bottom',
                          args: {
                              y: 12,
                              x: 0
                          }
                      }
                  }
              }
          }
      }
  });
  // 环网柜
  joint.shapes.devs.eqelement.define('eqelement.PowerRingnetcabinet', {
      size: { width: 90, height: 40 },
      attrs: {
          '.body': { x: 0, y: 0, width: 90, height: 40, stroke: '#33334e', 'stroke-width': 2,fill:'transparent'},
          '.label':{
              'text':'环网柜',
              'ref-x': 0.5, 
              'ref-y': 0.5, 
              ref: '.body', 
              'x-alignment': 'middle',
              'font-size':12,
              'font-family':'Alegreya Sans',
              'font-weight':500,
              'fill':'#000'
          }
      },
      ports: {
          groups: {
              'in': {
                  attrs: {
                      '.port-body': {d: 'M0 0 0 -10 -10 -10 -10 -20 0 -20 0 -30 -5 -30 0 -38 5 -30 0 -30 0 -20 10 -20 10 -10 0 -10 0 0 Z',fill: 'transparent',stroke: '#000','stroke-width': 1},
                      '.port-label': {
                          fontSize: 9,
                          fill: '#000',
                          fontWeight: 600
                      }
                  },
                  label: {
                      position: {
                          name: 'top',
                          args: {
                              y: -12,
                              x: 0
                          }
                      }
                  }
              },
              'out': {
                  attrs: {
                      '.port-body': {d: 'M0 0 0 10 -10 10 -10 20 10 20 0 20 0 30 -5 30 0 38 5 30 0 30 0 20 10 20 10 10 0 10 0 0 Z',fill: 'transparent',stroke: '#000','stroke-width': 1},
                      '.port-label': {
                          fontSize: 9,
                          fill: '#000',
                          fontWeight: 600
                      }
                  },
                  label: {
                      position: {
                          name: 'bottom',
                          args: {
                              y: 12,
                              x: 0
                          }
                      }
                  }
              }
          }
      }
  });
  // 路灯变压器
  joint.shapes.devs.eqelement.define('eqelement.LampTransformer', {
      size: { width: 40, height: 40 },
      markup: '<g class="rotatable"><g class="body"><rect class="body-r"/><circle class="body-C"/></g><text class="label"/></g>',
      attrs: {
          '.body':{ width: 40, height: 40 },
         '.body-r':{x: 0, y: 0, width: 40, height:40, stroke: '#33334e', 'stroke-width': 2,strokeStyle:'10,5',fill:'transparent'},
         '.body-C':{
              cx:20,
              cy:20,
              r:18,
              stroke:"#33334e",
              'stroke-width':"2",
              fill:"transparent"
         },
          '.label':{
              'text':'路灯变',
              'ref-x': 0.5, 'y': 48, ref: '.body', 'x-alignment': 'middle',
              'font-size':12,
              'font-family':'Alegreya Sans',
              'font-weight':500,
              'fill':'#000'
          }
      },
      ports: {
          groups: {
              'in': {
                  attrs: {
                      '.port-body': {d: 'M0 0 0 -15 -5 -15 0 -23 5 -15 0 -15 0 0 Z',fill: 'transparent',stroke: '#000',ref: '.body-r',},
                      '.port-label': {
                          fontSize: 9,
                          fill: '#000',
                          fontWeight: 600
                      }
                  },
                  label: {
                      position: {
                          name: 'top',
                          args: {
                              y: -6,
                              x: 10
                          }
                      }
                  }
              }
          }
      }
  });
 
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

joint.shapes.basic.switch = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable" ><g></g><path/></g>',

    defaults: _.defaultsDeep({
        type: 'basic.switch',
        size: { width: 35, height: 10 },
        attrs: {
            'path': { d: 'M0 0 H 20 V 10 H 0 Z M20 5 L35 5' ,stroke:'black'}
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
})