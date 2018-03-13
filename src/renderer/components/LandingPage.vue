<template>
  <div id="wrapper">
    <toolbar></toolbar>
  </div>
</template>

<script>
import ToolBar from './LandingPage/Main'

export default {
  name: 'landing-page',
  components: { 'toolbar': ToolBar },
  methods: {
    open (link) {
      require('electron').shell.openExternal(link)
    }
  }
}
</script>

<style>
/* @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro"); */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  overflow-x:hidden;
  overflow: hidden; 
}

#wrapper {
  width: 100%;
  /* height: 100%; */
}

</style>
