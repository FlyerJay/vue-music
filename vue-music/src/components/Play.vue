<template>
	<div class="play">
		<transition name="play-slide">
			<play-list v-if="playListShow"></play-list>
		</transition>
		<div class="music-album">
			<img :src="coverImgUrl" @touchend="hidePlayPage">
		</div>
		<div class="play-group">
			<img class="blur-bg" :src="coverImgUrl">
			<div class="progress-bar-group">
				<div class="progress-bar">
					<div class="progress" :style="{width:indicatorPosition+'%'}"></div>
					<div class="indicater" :style="{left:indicatorPosition+'%'}"></div>
				</div>
				<div class="time-indicator">
					<span>{{currentTime}}</span>
					<span>{{duration}}</span>
				</div>
			</div>
			<div class="music-info">
				<div class="music-name">{{song.name}}</div>
				<div class="music-singer">{{song.singer}}</div>
			</div>
			<div class="music-control">
				<ul>
					<li><img src="../assets/icon-like.png" alt="喜欢"></li>
					<li><img src="../assets/icon-shangyiqu.png" alt="上一曲" @click="playPrev"></li>
					<li><img :src="playing?$parent.iconPause:$parent.iconPlay"
                   		@click="$parent.tapButton"></li>
					<li><img src="../assets/icon-xiayiqu.png" alt="下一曲" @click="playNext"></li>
					<li><img src="../assets/icon-list.png" alt="下一曲" @click="showPlayList" @touchend.prevent="showPlayList"></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {mapMutations, mapState, mapGetters} from 'vuex'
	import PlayList from "./PlayList"
	export default{
		name:"play",
		components:{
			PlayList
		},
		data () {
			return {
				playListShow:false,
				clientY:0
			}
		},
		methods:{
			hidePlayPage:function(event){
				if (event.changedTouches[0].clientY - this.clientY > 0) {
				  this.$parent.playPageShow = false;
				}
			},
			showPlayList:function(){
				this.playListShow = true;
			},
			...mapMutations([
			  'play', 'pause', 'playPrev', 'playNext'
			])
		},
		computed: {
			...mapState([
			  'playing', 'song', 'coverImgUrl'
			]),
			...mapGetters([
			  'currentTime', 'duration'
			]),
			...mapState({
			  indicatorPosition (state) {
			    return state.currentTime / state.duration * 100
			  }
			})
		},
	}
</script>
<style scoped>
	.play{
		position: absolute;
		z-index: 4;
		width: 100%;
		height: 100%;
		top:0;
		max-width: 68vh;
	}
	.music-album{
		width:100%;
		height: 100vw;
		max-height: 68vh;
	}
	.music-album img{
		width:100%;
		height: 100vw;
		max-height: 68vh;
	}
	.progress-bar-group{
		height: 50px;
	}
	.music-info{
		height: 70px;
	}
	.music-name{
		font-size: 18px;
		font-weight: bold;
	}
	.music-singer{
		color: #888;
		font-size: 14px;
	}
	.play-group{
		position: absolute;
		top:100vw;
		left: 0px;
		bottom: 0px;
		right: 0px;
		overflow: hidden;
		background-color: rgba(255,255,255,.75)
	}
	.blur-bg{
		position: absolute;
		z-index: -1;
		width: 100%;
		filter: blur(30px);
		left: 0px;
	}
	.time-indicator{
		margin-top:5px;
	}
	.time-indicator span{
		float: left;
		padding: 0 10px;
		color: #555;
		font-size: 10px;
	} 
	.time-indicator span + span{
		float: right;
	}
	.music-control ul{
		display: flex;
		flex-direction: row;
		list-style: none;
		justify-content: space-around;
	}
	.music-control ul li img{
		width: 35px;
		height: 35px;
	}
	.progress-bar{
		background-color: #e8e8e8;
		height: 5px;
	}
	.progress{
		height: 100%;
		background-color: #888;
	}
	.indicater{
		height: 10px;
		width: 2px;
		background-color: green;
		position: absolute;
		top:0px;
		margin-left: -1px;
	}
</style>