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
@media screen and (min-width: 68vh){
  body{
    width: 68vh;
    margin: 0 auto;
  }
}

body{
  margin: 0 auto;
  padding: 0px;
  background-color: #eee;
}
#app {
  font-family: 'Microsoft yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
</style>
