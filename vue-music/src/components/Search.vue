<template>
	<div class="search">
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
			}
		}
	}
</script>
<style scoped>
	.search{
		position: fixed;
		z-index: 2;
		display: flex;
		flex-direction: row;
		top:0px;
		background-color: rgba(255,255,255,.9);
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
</style>