<template>
	<div class="play">
		<div class="music-album">
			<img :src="coverImgUrl" @touchend="hidePlayPage" @click="hidePlayPage">
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
					<li><img src="../assets/icon-shangyiqu.png" alt="上一曲" @click="playPrev" @touchend.prevent="playPrev"></li>
					<li><img src="playing?$parent.iconPause:$parent.iconPlay"
                   		@click="$parent.tapButton"
                   		@touchend="$parent.tapButton"></li>
					<li><img src="../assets/icon-xiayiqu.png" alt="下一曲" @click="playNext" @touchend.prevent="playNext"></li>
					<li><img src="../assets/icon-list.png" alt="下一曲" @click="showPlayList" @touchend.prevent="showPlayList"></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {mapMutations, mapState, mapGetters} from 'vuex'
	export default{
		data () {
			return {
				playListShow:false
			}
		},
		methods:{

		},
		computed: {

		},
	}
</script>