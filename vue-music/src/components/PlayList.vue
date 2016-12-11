<template>
	<div class="play-list">
		<div class="title">
			<img :src="playMode|urlFilter">
			<p class="title-text">{{playMode | textFilter}}{{playList.length}}首歌曲</p>
			<p class="title-button" @touched.prevent="hidePlayList" @click="hidePlayList">完成</p>
		</div>
		<div class="music-list">
			<ul>
				<li class="list-item" v-for="(item,num) in playList" @click="play(num)">
					<div class="music-info">
						<p class="music-name">{{item.name}}</p>
						<p class="music-singer">-{{item.singer | singer}}</p>
						<img class="music-playing" src="./../assets/icon-playing.svg" alt="正在播放"
						     v-show="index==num">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {mapState} from 'vuex'
	export default {
		name:"playlist",
		data () {
			return {
				
			}
		},
		methods:{
			hidePlayList:function(){
				this.$parent.playListShow = false;
			},
			play:function(num){
				this.$store.commit("playIndex",num);
			}
		},
		computed:{
			...mapState([
				"playMode","index","playList"
			])
		},
		filters:{
			urlFilter:mode=>{
				var single = require("../assets/icon-xunhuan.png");
				var circle = require("../assets/icon-xunhuan.png");
				var random = require("../assets/icon-suiji.png")
				var playModeUrl = [single,circle,random];
				return playModeUrl[mode];
			},
			textFilter:mode=>{
				var playModeStr=["单曲循环","顺序播放","随机播放"];
				return playModeStr[mode];
			},
			singer: val => {
			  if (typeof val === 'string') {
			    return val
			  } else if (val instanceof Array) {
			    var singer = ''
			    val.forEach(item => {
			      singer = singer + item.name + ' '
			    })
			    return singer
			  }
			}
		}
	}
</script>
<style scoped>
	.play-list{
		background: #fff;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;
	}
	.title{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px;
		height: 30px;
		border-bottom: 1px solid #ddd;
	}
	.title img{
		width: 25px;
		height: 25px;
		margin-right: 10px;
	}
	.title-button{
		position: absolute;
		right: 10px;
	}
	.list-item{
		display: flex;
		height: 40px;
		padding: 0px 10px;
		overflow: hidden;
		border-bottom: 1px solid #ddd;
	}
	.music-info{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.music-info .music-singer{
		font-size: 10px;
		color: #888;
	}
	.music-info img{
		width: 15px;
		height: 15px;
		margin-left: 15px;
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
</style>