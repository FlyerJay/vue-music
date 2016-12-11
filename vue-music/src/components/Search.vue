<template>
	<div class="search clearfix">
		<div class="search-action">
			<div class="search-input">
				<img src="../assets/icon-search.png" alt="搜索">
				<form @submit.prevent="search(key)">
					<input type="text" placeholder="搜索 歌曲/专辑/歌手" v-model="key" @focus='focus()'>
				</form>
			</div>
			<div class="search-cancel" :class="{'search-cancel-show':searchShow}" @touchend="searchCancel()" @click="searchCancel()">
				取消
			</div>
		</div>
		<transition name="search-slide">
			<div class="hotlist" v-if="searchRes==null&&searchShow">
				<div class="search-history">
					<div class="search-history-item" v-for="(item,index) in searchHistory" @click="search(item)">{{item}}</div>
				</div>
				<ul>
					<li v-for="(item,index) in hotlist" @click="search(item.k)">
						<span class="hotlist-index">{{index+1}}</span>
						<span class="hotlist-key">{{item.k}}</span>
						<span class="hotlist-num">{{item.n | numFilter}}</span>
					</li>
				</ul>
			</div>
		</transition>
		<div class="result" v-if="searchRes!=null&&searchShow">
			<div class="result-group" v-if="searchRes.song!=null">
				<div class="group">
					<img src="../assets/icon-music.png" alt="单曲" class="group-img">
					<p class="group-p">单曲</p>
				</div>
				<div class="result-item" v-for="(item,index) in searchRes.song.itemlist">
					<p class="result-title" @click="play(index)">{{item.name}}</p>
					<p class="result-author" @click="play(index)">-{{item.singer}}</p>
				</div>
			</div>
			<div class="result-group" v-if="searchRes.album!=null">
				<div class="group">
					<img src="../assets/icon-album.png" alt="专辑" class="group-img">
					<p class="group-p">专辑</p>
				</div>
				<div class="album-item" v-for="(item,index) in searchRes.album.itemlist">
					<img class="album-img" v-bind:src="item.pic">
					<div class="album-info">
						<p class="album-title" @click="play(index)">{{item.name}}</p>
						<p class="album-author" @click="play(index)">{{item.singer}}</p>
					</div>
				</div>
			</div>
			<div class="result-group" v-if="searchRes.singer!=null">
				<div class="group">
					<img src="../assets/icon-singer.png" alt="歌手" class="group-img">
					<p class="group-p">歌手</p>
				</div>
				<div class="singer-item" v-for="(item,index) in searchRes.singer.itemlist">
					<img class="singer-img" v-bind:src="item.pic">
					<div class="singer-info">
						<p class="singer-name" @click="play(index)">{{item.name}}</p>
					</div>
				</div>
			</div>
			<div class="result-group" v-if="searchRes.mv!=null">
				<div class="group">
					<img src="../assets/icon-mv.png" alt="MV" class="group-img">
					<p class="group-p">MV</p>
				</div>
				<div class="mv-item" v-for="(item,index) in searchRes.mv.itemlist">
					<div class="mv-info">
						<p class="mv-name" @click="play(index)">{{item.name}}</p>
						<p class="mv-author" @click="play(index)">{{item.singer}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		name:'search',
		data () {
			return {
				key:'',
				searchShow:false,
				searchRes:null,
				searchHistory: [],
				hotlist:[],
			}
		},
		methods:{
			search:function(key){
				this.key = key;
				this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',{
					params:{
						is_xml:0,
						format: 'jsonp',
						key: key,
						g_tk: 5381,
						loginUin: 0,
						hostUin: 0,
						inCharset: 'utf8',
						outCharset: 'utf-8',
						notice: 0,
						platform: 'yqq',
						needNewCode: 0
					},
					jsonp: 'jsonpCallback'
				}).then(res=>{
					this.searchRes = res.data.data;
					var index = this.searchHistory.indexOf(key);
					if(index !== -1){
						this.searchHistory.splice(index,1);
					}
					this.searchHistory.unshift(key);
					this.searchHistory = this.searchHistory.splice(0,10);
					localStorage.searchHistory = this.searchHistory.join(',');
				})
			},
			focus: function () {
			  this.searchShow = true;
			  this.$emit('searchshow');
			},
			searchCancel: function () {
			  this.searchShow = false;
			  this.key = '';
			  this.searchRes = null;
			  this.$emit('searchhide');
			},
			play:function(index){
				this.$store.commit("setPlayList",{
					index:index,
					list: this.searchRes.song.itemlist
				});
			}
		},
		created:function(){
			if(localStorage.searchHistory){
				this.searchHistory = localStorage.searchHistory.split(",");
			}
			this.$http.jsonp("http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg",{
				params: {
				  g_tk: 5381,
				  loginUin: 0,
				  hostUin: 0,
				  format: 'jsonp',
				  inCharset: 'utf8',
				  outCharset: 'utf-8',
				  notice: 0,
				  platform: 'yqq',
				  needNewCode: 0
				},
				jsonp: 'jsonpCallback'
			}).then(res=>{
				this.hotlist = res.data.data.hotkey.splice(0,10);
			})
		},
		filters:{
			numFilter:num=>{
				return Math.round(num / 1000) / 10 + "万";
			}
		}
	}
</script>
<style scoped>
	@media screen and (min-width: 68vh){
		div.search{
		  width: 68vh;
		  margin: 0 auto;
		}
		div.search-action{
			width: 68vh;
			margin: 0 auto;
		}
	}
	.search{
		position: relative;
		width: 100%;
	}
	.search-action{
		position: fixed;
		z-index: 3;
		display: flex;
		flex-direction: row;
		top:0px;
		background-color: rgba(255,255,255,1);
		width: 100%;
		height: 60px;
	}
	.search-input{
		width: 100%;
		margin: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color:#eee;
		border-radius: 5px;
	}
	.search-input img{
		height: 30px;
		width: 30px;
		margin:0px 5px;
	}
	.search-input form{
		width: 100%;
		height: 100%;
	}
	.search-input input{
		width: 100%;
		height: 100%;
		border:none;
		outline: none;
		background-color: inherit;
		font-size: 16px;
	}
	.search-cancel{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 0px;
		transition: .3s;
		overflow: hidden;
		white-space: nowrap;
	}
	.search-cancel.search-cancel-show{
		width: 55px;
	}
	.hotlist{
		position: absolute;
		top:60px;
		background-color:#fff;
		width: 100%;
		z-index: 2;
	}
	.hotlist-num{
		float: right;
	}
	.search-history{
		display:flex;
		flex-wrap: wrap;
		padding: 5px 10px;
	}
	.search-history-item{
		padding: 0px 5px;
		margin: 5px;
		border: 1px solid #000;
		border-radius: 20px;
	}
	.hotlist ul{
		list-style: none;
		display: flex;
		flex-direction: column;
		text-align: left;
		padding: 5px 10px;
		margin: 0px;
	}
	.hotlist ul li{
		height: 40px;
		line-height: 40px;
	}
	.result{
		margin-top: 60px;
		font-size: 14px;
		margin-bottom: 50px;
	}
	.result-group{
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.result-group .group{
		display: flex;
		flex-direction: row;
		height: 40px;
		align-items: center;
		padding: 0px 10px;
		background-color: #eee;
	}
	.group img{
		height: 20px;
		width: 20px;
		margin-right: 10px;
	}
	.result-group .result-item{
		height: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding: 0px 20px;
	}
	.result-author{
		color: #888;
	}
	.result-group .album-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding:5px 20px;
		border-bottom: 1px solid #eee;
	}
	.album-item img{
		width: 40px;
		height: 40px;
	}
	.album-info{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		text-align: left;
		margin-left: 10px;
		height: 40px;
	}
	.album-info .album-author{
		font-size: 12px;
		color: #888;
	}
	.result-group .singer-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px 20px;
		border-bottom: 1px solid #eee;
	}
	.singer-item img{
		width: 40px;
		height: 40px;
	}
	.singer-info .singer-name{
		margin-left: 10px;
		font-size: 16px;
	}
	.result-group .mv-item{
		display: flex;
		flex-direction: row;
		text-align: left;
		align-items: center;
		padding: 10px 20px;
		height: 40px;
		border-bottom: 1px solid #eee;
	}
	.mv-item .mv-info{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.mv-info .mv-author{
		font-size: 12px;
		color: #888;
	}
	.search-slide-enter-active {
	  	transition: all .2s ease;
	  	transition-delay: .2s;
	}
	.search-slide-leave-active {
	  	transition: all .2s ease-out;
	}
	.search-slide-enter, .search-slide-leave-active {
	  	transform: translateY(-100%);
	}
</style>