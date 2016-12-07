;(function(){
	Vue.component('vue-page',{
		template:
			'<nav class="vue-page" v-if="totalPage > 1">'+
				'<ul class="pagination">'+
					'<li v-on:click="prevPage(currentPage)">'+
						'<a href="javascript:;">上一页</a>'+
					'</li>'+
					'<li v-for="item in pageRange" v-on:click="pageClick(item.num)" v-bind:order="item.num" v-bind:class="item.className">'+
						'<a href="javascript:;">{{item.num}}</a>'+
					'</li>'+
					'<li v-on:click="nextPage(currentPage)">'+
						'<a href="javascript:;">下一页</a>'+
					'</li>'+
				'</ul>'+
			'</nav>',
		data:function(){ 
			return {
				totalPage:0,
				currentPage:0,
				pageRange:[],
				showCount:0,
				hook:{
					onchangePage:'',
				},
			}
		},
		watch:{
			totalPage:function(){
				this.updateRange();
			},
			currentPage:function(){
				this.updateRange();
				this.hook.onchangePage && this.hook.onchangePage(this.currentPage);
			},
			prevShow:function(){
				this.updateRange();
			},
			prevShow:function(){
				this.updateRange();
			},
		},
		methods:{
			updateRange:function(){
				var start;
				var end;
				if(this.totalPage <= this.showCount){
					start = 1;
					end = (this.totalPage==0?1:this.totalPage);
				}else if(this.currentPage >= this.totalPage - Math.floor(this.showCount/2)){
					start = this.totalPage - this.showCount;
					end = this.totalPage;
				}else{
					var temp = (this.currentPage - Math.floor(this.showCount/2)) <= 0 ?1:(this.currentPage - Math.floor(this.showCount/2));
					start = temp;
					end = temp + this.showCount - 1;
				}
				this.pageRange = [];
				for(var i=start;i<=end;i++){
					this.pageRange.push({
						num:i,
						className:(i==this.currentPage)?"current":"",
					});
				}
			},
			pageClick:function(num){
				this.currentPage = num;
			},
			prevPage:function(){
				if(this.currentPage >1)
					this.currentPage--;
			},
			nextPage:function(){
				if(this.currentPage < this.totalPage)
					this.currentPage++;
			},
		},
		compiled : function (){
	       	this.updateRange()
	   	},
	   	events:{
	   		'update':function(config){
	   			if(config.totalPage){
	   				this.totalPage = config.totalPage;
	   			}
	   			if(config.currentPage){
	   				this.currentPage = config.currentPage;
	   			}
	   			if(config.showCount){
	   				this.showCount = config.showCount;
	   			}
	   			if(config.hook){
	   				this.hook = config.hook;
	   			}
	   		}
	   	}
	})
})();