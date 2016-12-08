<template>
  <div id="app">
    <rank></rank>
  </div>
</template>

<script>
import Rank from './components/Rank'

export default {
  name: 'app',
  components: {
    Rank
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
