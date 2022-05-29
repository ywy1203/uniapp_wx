<template>
	<view>
		<view class="howToVip fixed-width-center" v-show="closedFlag">
			<view class="closed float-right" @click="closed">
				<image src="../../../static/icon/13.png" mode=""></image>
			</view>
		<view class="title ">
			欢迎申请成为职业社交平台<br>正式会员
		</view>
		<view class="content" >
			<text style="padding-bottom: 2vh;">您只需成功邀请两位2.0用户协助认证，或您可以成功邀请一位2.0用户和一位1.0用户协助认证。</text>
			<br>
			<text>若不认识2.0用户，您也可以邀请两位1.0用户成为零碳职业发展平台的2.0会员来完成您的会员认证。</text>
		</view>
		<view class="twoBtn ">
			<view class=" float-left" :class="inviteInfo === null ? 'ifnull':'left-btn'"  @click="invite">
				邀请好友
			</view>
			<view class="right-btn float-right" @click="goTest">
				<text style="margin:0 5.1vw;">完成专业测试</text><br>
				<text style="margin:0 1.3vw;">成为零碳科技会员</text>
			</view>
		</view>
		<view class="inviteVip fixed-width-center" v-show="inviteFlag">
			<view class="words ">
				<text style="margin: 0 10.8vw;">你是否确认需要{{inviteInfo.realName}}</text><br>
				<text style="margin: 0 8vw;">来协助你进行会员认证</text>
			</view>
			<view class="btn flex-center" @click="changeInviteFlag">
				确认
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import bus from '@/src/utils/bus.js';
	import {giveInvitorInfo}  from '@/src/utils/wxauth.js'
	
	export default {
		data() {
			return {
				closedFlag:false,
				inviteFlag:false,
				inviteInfo:''
				
			}
		},
		created() {
			bus.$on('changeClosedFlag', data => {
				this.closedFlag = data;
			});
			bus.$on('changeClosedFlagToChange', data => {
				this.closedFlag = !this.closedFlag;
				this.inviteInfo = data;
			});	
		},
		
		methods: {
			closed(){
				this.closedFlag = false
			},
			invite(){
				if(this.inviteInfo == null){
					
				}else{
					this.inviteFlag = true 
				}
			},
			changeInviteFlag(){
				giveInvitorInfo();
				this.inviteFlag = false;
				
				
			},
			goTest(){
				uni.navigateTo({
					url:'../../../subpkg/test/test'
				})
			},
			
	}	
	}
</script>

<style lang="scss" scoped>
	
	text{
		display: block;
	}
	.howToVip{
		z-index: 10000;
		width: 85vw;
		height: 55vh;
		
		position: fixed;
		bottom: 13vh;
		border-radius:6vw ;
		box-shadow: 5rpx 5rpx 10rpx #888888;
		background-color: #FFFFFF;
		
	}
	.title{
		height: 12vh;
		width: 80%;
		
		margin: 0 auto;
		padding-top: 5vh;
		font-size: 5.5vw;
		font-weight: 900;
	}
	.content{
		height: 26vh;
		width: 80%;
		font-size: 4.4vw;
		margin: 0 auto;
		color: #a3a3a3;
		font-weight: 500;
		
	}
	.twoBtn{
		height: 10vh;
		width: 80%;
		font-size: 3.8vw;
		font-weight: 500;
		margin: 0 auto;
		.left-btn{
			background-color: #a0d4f4;
			width: 33vw;
			height: 100%;
			border-radius: 6vw;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.right-btn{
			background-color: #a0d4f4;
			width: 33vw;
			height: 100%;
			border-radius: 6vw;
			padding-top: 2vh;
			box-sizing: border-box;
			
			
		}
		.ifnull{
		background-color: #8c8a8a;
		width: 33vw;
		height: 100%;
		border-radius: 6vw;
		display: flex;
		align-items: center;
		justify-content: center;
		}
	}
.closed{
	width: 10vw;
	height: 10vw;
	background-color: red;
	border-radius: 50%;
}
.inviteVip{
	height: 40vh;
	width: 95%;
	background-color: #FFFFFF;
	border-radius: 6vw;
	bottom: 1vh;
	box-shadow: 5rpx 5rpx 10rpx #888888;
	.words{
		width: 70%;
		color: #a5a5a5;
		font-weight: 600;
		font-size: 3.5vw;
		margin: 10vh auto;
		
		
	}
	.btn{
		width: 70%;
		height: 15%;
		background-color: #a0d4f4;
		margin: 0 auto;
		border-radius: 4vh;
		font-weight: 600;
	}
}
.ifnull{
		background-color: red;
	}
</style>
