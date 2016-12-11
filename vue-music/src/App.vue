<template>
  <div id="app" class="clearfix">
    <search v-show="!blurBgShow" @searchshow='rankshow=false' @searchhide='rankshow=true'></search>
    <transition name="rank-slide">
      <rank v-show='rankshow&&!blurBgShow'></rank>
    </transition>
    <transition name="play-slide" v-on:after-enter="showBlurBg" v-on:before-leave="hideBlurBg">
      <play v-if="playPageShow"></play>
    </transition>
    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music"
               v-bind:src="dataUrl"
               autoplay="autoplay"
               @timeupdate="updateTime"
               v-on:ended="playContinue"></audio>
        <div class="play-bar-image-container" @touchstart="showPlayPage" @click="showPlayPage">
          <img class="play-bar-image" v-bind:src="coverImgUrl">
        </div>
        <p class="play-bar-text" @touchstart="showPlayPage" @click="showPlayPage">{{song.name}}</p>
        <img class="play-bar-button"
             v-bind:src="playing?iconPause:iconPlay"
             @touchend="tapButton"
             @click="tapButton">
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Rank from './components/Rank'
import Search from './components/Search'
import Play from './components/Play'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    Rank,
    Search,
    Play
  },
  data () {
    return {
      rankshow:true,
      playPageShow:false,
      blurBgShow:false,
      iconPlay: require('./assets/icon-play.png'),
      iconPause: require('./assets/icon-pause.png'),
    }
  },
  methods:{
    tapButton:function(event){
      event.preventDefault();
      this.playing ? this.pause() : this.play()
    },
    showBlurBg:function(){
      this.blurBgShow = true;
    },
    showPlayPage:function(){
      this.playPageShow = true;
    },
    updateTime:function(){
      this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime))
      this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration))
    },
    hideBlurBg:function(){
      this.blurBgShow = false;
    },
    ...mapMutations([
      'play', 'pause', 'playContinue'
    ])
  },
  computed: {
    ...mapState({
      dataUrl (state) {
        return 'http://ws.stream.qqmusic.qq.com/' + state.song.id + '.m4a?fromtag=46'
      }
    }),
    ...mapState([
      'playing', 'song', 'coverImgUrl'
    ])
  },
  watch: {
    playing: function (val) {
      if (val) {
        document.getElementById('music').play()
      } else {
        document.getElementById('music').pause()
      }
    },
    song: function (song) {
      this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
        params: {
          mid: song.mid
        },
        jsonp: 'callback'
      }).then((response) => {
        this.$store.state['coverImgUrl'] = response.data.url
      })
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
  *{
    padding: 0px;
    margin: 0px;
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

  #play-bar{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    height: 50px;
    z-index: 2;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width:68vh;
  }

  img.play-bar-button{
    width: 20px;
    height: 20px;
    float: right;
    padding-right: 15px;
  }
  .play-bar-text{
    flex-grow: 1;
    margin-left:10px;
    text-align: left;
  }

  #play-bar .play-bar-image{
    width: 40px;
    height: 40px;
    padding-left: 15px;
  }

  .clearfix::before,.clearfix::after{
    content: " ";
    display: table;
  }
  .clearfix::after{
    clear: both;
  }
  .clearfix{
    *zoom:1;
  }

  .play-slide-enter-active {
    transition: all .2s ease;
  }

  .play-slide-leave-active {
    transition: all .2s ease-out;
  }

  .play-slide-enter, .play-slide-leave-active {
    /*margin-top: 100vh;*/
    transform: translateY(100vh);
  }

  .bar-slide-enter-active {
    transition: all .2s ease;
  }

  .bar-slide-leave-active {
    transition: all .2s ease-out;
  }

  .bar-slide-enter, .bar-slide-leave-active {
    margin-bottom: -50px;
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
