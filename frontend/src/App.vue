<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {Navbar},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Archivo Narrow',sans-serif, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.card {
  border: 1px solid;
  padding: 10px;
  box-shadow: 2px 2px 3px #918b8b;
}
</style>
