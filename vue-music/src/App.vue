<template>
  <div id="app">
    <search @searchshow='rankshow=false' @searchhide='rankshow=true'></search>
    <transition name="rank-slide">
      <rank v-show='rankshow'></rank>
    </transition>
  </div>
</template>

<script>
import Rank from './components/Rank'
import Search from './components/Search'

export default {
  name: 'app',
  components: {
    Rank,
    Search
  },
  data () {
    return {
      rankshow:true
    }
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

  .rank-slide-enter-active {
    transition: all .2s ease;
  }

  .rank-slide-leave-active {
    transition: all .2s ease-out;
  }

  .rank-slide-enter, .rank-slide-leave-active {
    /*margin-top: 100vh;*/
    transform: translateY(-100%);
  }
</style>
