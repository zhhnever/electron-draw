<template>
    <div id="toolbar">
    </div>
</template>
<script>
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
      ]
    }
  },
  mounted: function () {
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
      tools: this.config
    }).render().el
    _('#toolbar').append(toolbar)
  }
}
</script>
<style scoped>

</style>
