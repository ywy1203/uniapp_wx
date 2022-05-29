<template>
	<view :class="{detail1,detail2}">
		<view class="delete" @click.stop="toDelete()">
			关
		</view>
		<view class="view-delete" @click.stop="toall()">
			全
		</view>
		<view class="list-name">
			{{list.name}}:{{list.company}}
		</view>
		<view v-if="list.location" class="list-location">
			项目所在地：{{list.location}}
		</view>
		<view class="action">
			<view class="zhuanfa">
				转
			</view>
			<view class="pinlun">
				评
			</view>
			<view class="like">
				喜
			</view>
			<view class="shoucang">
				收
			</view>
		</view>
		<view class="line">
		</view>
		<view class="detail">
			<view class="name">
				<view class="pic">
					头像
				</view>
				<view class="time-name">
					<view class="name-name">
					{{list.name}}
					</view>
					<view class="time">
						22-03-12 18:30
					</view>
				</view>
				<view class="function">
					<view class="function1">
						<view class="guanzhu">
							关注
						</view>
						<view class="siliao">
							私聊
						</view>
						<view class="chakan">
							查看主页
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<scroll>
				<p>汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙</p>
				<p>11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙-搭建高效职发沙龙沙龙汉中市职发沙龙</p>
				</scroll>
			</view>
			<view class="detail-shoucang">
				<view class="dianzan-yuedu">
					<view class="zan">
						赞
					</view>
					<view class="yuedu">
						{{list.like3}}万阅读
					</view>
				</view>
				<view class="fanye" @click="fan">
					翻页
				</view>
				<view class="detail-shoucang-function">
					<view class="zhuanfa">
						转
					</view>
					<view class="pinlun">
						评
					</view>
					<view class="like">
						喜
					</view>
					<view class="shoucang">
						收
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { EventBus } from "./eventbus.js";
	import scroll from "./scroll.vue";
	export default{
		components:{
			scroll,
		},
		props:['index','list'],
		data(){
			return {
				detail1:true,
				detail2:false
			}
		},
		methods:{
			toDelete:function(){
				this.$emit('detail-delete',true);
			},
			toall:function(){
				this.detail2=!this.detail2;
				this.$emit('showdetail');
				EventBus.$emit("detail");
			},
			fan:function(){
				EventBus.$emit("fan");
			}
		}
	}
</script>
<style scoped>
	.detail1{
		height: 54vh;
		width: 90vw;
		border-radius: 20rpx;
		border: solid 5rpx #D6D7D6;
		box-shadow: 0 0 3rpx 3rpx rgba(0,0,0,0.1);
		padding: 0 3vw;
		position: relative;
		transition: 0.3s;
		margin-top: 2vh;
		display: flex;
		flex-direction: column;
	}
	.detail2{
		height: calc(100vh - 12vh - 15vh);
		transition: 0.3s;
	}
	.delete{
		height: 60rpx;
		width: 60rpx;
		border-radius: 50%;
		background-color:#9FD9F5 ;
		text-align: center;
		line-height: 60rpx;
		position: absolute;
		top: -10rpx;
		left: -10rpx;
	}
	.view-delete{
		height: 60rpx;
		width: 60rpx;
		border-radius: 50%;
		background-color:#9FD9F5 ;
		text-align: center;
		line-height: 60rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}
	.list-name{
		margin-top: 60rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		color: #424B60;
		font-weight: 600;
		font-size: 36rpx;
	}
	.list-location{
		margin-top: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		color: #424B60;
		font-weight: 400;
		font-size: 30rpx;
	}
	.line{
		border-top:solid 1rpx #424B60;
		margin-top: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.action{
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 40rpx;
		display:flex;
		justify-content: flex-end;
	}
	.zhuanfa{
		width: 40rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.pinlun{
		width: 40rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.like{
		width: 40rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.shoucang{
		width: 40rpx;
		text-align: center;
	}
	.detail{
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 10rpx;
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.name{
		height: 100rpx;
		background-color: white;
		width: 100%;
		display: flex;
	}
	.pic{
		height: 100rpx;
		width: 100rpx;
		background-color: beige;
	}
	.content{
		margin-top: 10rpx;
		width: 100%;
		flex: 1;
		height: 0;
		color: #424B60;
		scrollTop:10;
		overflow-y: hidden;
	}
	.detail-shoucang{
		width: 100%;
		height: 60rpx;
		display: flex;
		overflow: hidden;
	}
	.dianzan-yuedu{
		width: 27%;
		height: 100%;
		display: flex;
		line-height: 60rpx;
		color: #424B60;
		font-size: 25rpx;
		justify-content: space-between;
	}
	.fanye{
		width: 33%;
		height: 100%;
		text-align: center;
		line-height: 60rpx;
		color: #424B60;
	}
	.detail-shoucang-function{
		width: 33%;
		height: 100%;
		display: flex;
		text-align: center;
		line-height: 60rpx;
		justify-content: flex-end;
		color: #424B60;
		font-size: 25rpx;
	}
	.time-name{
		margin-left: 10rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
	}
	.name-name{
		color: #424B60;
		height: 50rpx;
		font-size: 36rpx;
		font-weight: 600;
	}
	.time{
		height: 50rpx;
		line-height: 50rpx;
		color: #D6D7D6;
		font-size: 26rpx;
	}
	.function{
		height: 100rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin-left: 10rpx;
	}
	.function1{
		height: 40rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		margin-bottom: 10rpx;
	}
	.guanzhu{
		height: 100%;
		width: 30%;
		background-color: #064161;
		color: white;
		text-align: center;
		line-height: 40rpx;
		border-radius: 10rpx;
	}
	.siliao{
		height: 100%;
		width: 30%;
		background-color: #064161;
		color: white;
		text-align: center;
		line-height: 40rpx;
		border-radius: 10rpx;
	}
	.chakan{
		height: 100%;
		width: 30%;
		background-color: #064161;
		color: white;
		text-align: center;
		line-height: 40rpx;
		border-radius: 10rpx;
	}
	
</style>