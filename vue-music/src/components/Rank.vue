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
			showRank: function(id){
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
		display: flex;
		flex-direction: column;
		list-style: none;
		margin:0px;
		margin-top:60px;
		margin-bottom: 50px;
	}
	.rank-item{
		display: flex;
		flex-direction: row;
		height: 100px;
		overflow: hidden;
		border-radius: 5px;
		margin-bottom: 10px;
		background-color: #fff;
	}
	.rank-media{
		width: 100px;
		height: 100px;
		position: relative;
	}
	.rank-media .listen-count{
		color: #fff;
		position: absolute;
		z-index: 1;
		bottom: 3px;
		left: 5px;
		font-size: 12px;
	}
	.rank-media img{
		width: 100px;
		height: 100px;
		z-index: 0;
	}
	.rank-info{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 5px 10px;
		overflow: hidden;
	}
	.rank-info p{
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: left;
		margin: 0px;
		overflow:hidden;
	}
	.rank-info p.rank-title{
		font-size: 16px;
	}
	.rank-songs span.rank-singername{
		color:#999;
	}
</style>