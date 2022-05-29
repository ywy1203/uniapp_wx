<template>
	<view :class="{HotComponentShow,HotComponentShowNo}" @click="showdetail()" >
		<view v-if="flag2" class="hotcomponent">
			<view class="hot-component-pic">
			</view>
			<view class="hot-component-cont">
				<view class="hot-component-cont-name">
					<view class="hot-component-cont-name1">
						{{list.name}}:{{list.company}}
					</view>
					<view class="hot-component-cont-name2">
						<p v-if="list.id">招标编号：{{list.id}}</p>
						<p v-if="list.location">项目所在地：{{list.location}}</p>
					</view>
				</view>
				<view class="hot-component-cont-like">
					<view class="hot-component-cont-like1" :style="[{width:'12%'},{color:likecolor}]" @click.stop="changelike()">
						点赞
					</view>
					<view class="hot-component-cont-like2">
						{{list.like2}}人讨论
					</view>
					<view class="hot-component-cont-like3">
						{{list.like3}}万阅读
					</view>
					<view class="hot-component-cont-like4" :style="[{width:'12%'},{color:likecolor1}]" @click.stop="changelike1()">
						收藏
					</view>
				</view>
			</view>
			<view class="hot-component-classification">
				<view class="hot-component-classification-top">
					<template v-if="flagf(index)">
						置顶
					</template>
				</view>
				<view class="hot-component-classification-cont">
					<view class="hot-component-classification-cont-pic">
						{{list.class}}
					</view>
					<view class="hot-component-classification-cont-clas">
						{{list.class}}
					</view>
				</view>
			</view>
		</view>
		<hotlistDetail v-if="!show" @detail-delete="detailDelete"  @showdetail="showDetail" :index="index" :list="list"></hotlistDetail>
	</view>
</template>

<script>
	import hotlistDetail from './hotlist-detail.vue'
	import { EventBus } from "./eventbus.js";
	export default{
		props:['list','index'],
		components:{
			hotlistDetail,
		},
		data(){
			return {
				likecolor:"#BBBBBB",
				likecolor1:"#BBBBBB",
				list:"111",
				show:true,
				HotComponentShow:true,
				HotComponentShowNo:false,
				HotComponentShowNo2:false,
				hotcomponent:true,
				flag2:true,
			}
		},
		methods:{
			detailDelete:function(data){
				this.show=!this.show;
				if(this.flag2==false){
					this.flag2=true;
				}
				EventBus.$emit("show");
			},
			showDetail:function(){
				this.flag2=!this.flag2;
			},
			flagf:function(index){
				return index===0;
			},
			changelike:function(){
				if(this.likecolor=='red'){
					this.likecolor="#BBBBBB";
				}else{
					this.likecolor='red';
				}
			},
			changelike1:function(){
				if(this.likecolor1=='red'){
					this.likecolor1="#BBBBBB";
				}else{
					this.likecolor1='red';
				}
			},
			showdetail:function(){
				EventBus.$emit("aMsg", this.index);
				if(this.show==true){
					EventBus.$emit("detail2");
					this.show=!this.show;
				}
			},
		},
		mounted(){
			 EventBus.$on("aMsg", (msg) => {
				if(msg!=this.index){
					  this.HotComponentShowNo=true;
				  }
			    });
			EventBus.$on("show", (msg) => {
				this.HotComponentShowNo=false;
			   });
		}
	}
</script>

<style scoped>
	.HotComponentShow{
		padding-top: 2vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	.HotComponentShowNo{
		display: none;
	}

	.hotcomponent{
		height: 18vh;
		width: 90vw;
		border: solid 5rpx #D6D7D6;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		padding: 0 3vw;
		box-shadow: 0 0 3rpx 3rpx rgba(0,0,0,0.1);
	
	}
	.hot-component-pic{
		height: 12vh;
		width: 12vh;
		border: solid 2px #424B60;
	}
	.hot-component-cont{
		height: 14vh;
		flex:1;
		padding-left: 20rpx;
		padding-right: 45rpx;
	}
	.hot-component-cont-name{
		width: 100%;
		height: 80%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.hot-component-cont-name1{
		color: #424B60;
		font-size: 30rpx;
		font-weight: 600;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.hot-component-cont-name2{
		color: #424B60;
		font-size: 23rpx;
		flex:1;
	}

	.hot-component-cont-like2{
		width:38%;
	}
	.hot-component-cont-like3{
		width:38%;
	}

	.hot-component-cont-like{
		width: 100%;
		height: 20%;
		margin-top: 6rpx;
		box-sizing: border-box;
		display: flex;
		font-size: 20rpx;
		justify-content: space-between;
		color: #BBBBBB;
	}
	.hot-component-classification{
		height: 14vh;
		width: 13vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.hot-component-classification-top{
		height: 3vh;
		width: 13vw;
		margin-bottom: 1vh;
		border-radius: 1vh;
		text-align: center;
	}
	.hot-component-classification-cont{
		height: 15vw;
		width: 13vw;
		border: solid 1rpx #D6D7D6;
		border-radius: 1vh;
		background: linear-gradient(180deg, white 60%, #D6D7D6 40%);
	}
	.hot-component-classification-cont-pic{
		height: 9vw;
		width: 13vw;
		font-size: 26rpx;
		text-align: center;
	}
	.hot-component-classification-cont-clas{
		height: 6vw;
		width: 13vw;
		text-align: center;
		font-size: 26rpx;
		color: #424B60;
		line-height: 6vw;
	}
</style>