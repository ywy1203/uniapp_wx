<template>
	<view class="show">
		<view class="text" :style="'top:'+top+'rpx;'">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import { EventBus } from "./eventbus.js";
	export default{
		data(){
			return {
				top:0,
				bottom:0,
			}
		},
		destroyed () {
		    // 取消对bus事件的监听
		    EventBus.$off("fan")
			EventBus.$off("detail")
		  },
		mounted(){
			let that=this;
			let flag=false;
			let count=0;
			setTimeout(() => {
			let query=this.createSelectorQuery();
			query.select('.show').boundingClientRect();
			query.exec(function(res){
							that.bottom=res[0].bottom;
			            }) },100)
			EventBus.$on("detail",()=>{
				setTimeout(() => {
				that.top=0;
				let query=this.createSelectorQuery();
				query.select('.show').boundingClientRect();
				query.exec(function(res){
								that.bottom=res[0].bottom;
				            }) },100)
			})
			EventBus.$on("fan",()=>{
				setTimeout(() => {
				let query=this.createSelectorQuery();
				query.select('.text').boundingClientRect();
				query.exec(function(res){
					if(res[0].bottom>=that.bottom){
						that.top-=res[0].height/3*2;
					}
					else{
						that.top=0;
					}
				            })
			},100)
			});
		}
	}
</script>

<style scoped>
	.show{
		color: blue;
		height: 100%;
		background-color: bisque;
		overflow-y: hidden;
	}
	.text{
		position: relative;
		word-wrap: break-word;
	}
</style>