<template>
	<div class="rank">
		<ul>
			<li class="rank-item" v-for="item in topList" @click="showRank(item.id)">
				<div class="rank-media">
					<img :src="item.picUrl" alt="">
					<span class="listen-count">{{item.listenCount | listenCount}}</span>
				</div>
				<div class="rank-info">
					<p class="rank-title">{{item.topTitle}}</p>
					<p class="rank-songs" v-for="(song,index) in item.songList">
						{{index+1}}
						{{song.songname}}
						<span class='rank-singername'>-{{song.singername}}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		name: 'rank',
		data () {
		  	return {
		    	topList: null,
		    	topid: null,
		    	isRankShow: false,
		 	}
		},
		methods:{
			showRank: id=> {
				this.topid = id;
				this.isRankShow = true;
			},
			hideRank: ()=> {
				this.isRankShow = false;
			}
		},
		created:function(){
			this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',{
				params:{
					format:'jsonp',
					g_tk:5381,
					uin:0,
					format:'jsonp',
					inCharset:'utf-8',
					ontCharset:'utf-8',
					notice:0,
					platform:'h5',
					needNewCode:1,
					_: new Date().getTime()
				},
				jsonp:'jsonpCallback'
			}).then(res => {
				this.topList = res.data.data.topList;
			})
		},
		filters:{
			listenCount: num => {
				return Math.round(num / 1000) / 10 + '万'
			}
		}
	}
</script>
<style scoped>
	.rank ul{
		padding:10px;
	}
</style>