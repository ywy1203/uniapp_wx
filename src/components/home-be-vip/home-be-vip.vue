<template>
	<view>
		<view class="home-be-vip " v-show="vipFlag">
			<view class="friend-verification absolute-width-center" v-if="vip7Flag"><text>距离VIP会员失效还有{{days}}天</text></view>
			<view class="friend-verification absolute-width-center" v-if="vipLongFlag"><text>成为会员即可享受职业社交功能</text></view>
			<view class="friend-verification absolute-width-center" v-if="getVipFlag"><text>即刻免费领取7天VIP会员</text></view>
			<view class="invite-friends absolute-width-center" @click="closed"><text>确认</text></view>
		</view>
		
	</view>
</template>

<script>
import bus from '@/src/utils/bus.js';
export default {
	data() {
		return {
			vipFlag: false,
			vip7Flag: false,
			vipLongFlag:false,
			getVipFlag:false,
			days:0,
		};
	},
	created() {
		
		this.days=uni.getStorageSync('expired');
		bus.$on('changeVip7FlagToTrue', data => {
			this.vipFlag = data;
			this.vip7Flag = data;
			// this.vipLongFlag =false;
		});
		bus.$on('changeVipFlag', data => {
			this.vipFlag = !this.vipFlag;
		});
		bus.$on('getVipFlagToTrue', data => {
			this.getVipFlag = data;
			this.vipFlag = data;
		});
		bus.$on('changeVipFlagToTrue', data => {
			this.vipLongFlag = data;
			this.vipFlag = data;
			
		});
		bus.$on('changeVipFlagToFalse', data => {
			this.vipFlag = data;
		});
	},
	methods: {
		closed() {
			this.vipFlag = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.home-be-vip {
	width: 90vw;
	height: 25vh;
	border-radius: 6vw;
	overflow: hidden;
	// border: 1rpx solid #909399;
	box-shadow: 5rpx 5rpx 10rpx #888888;
	background-color: #ffffff;
	z-index: 10000;
	position: fixed;
	bottom: 13vh;
	left: 50%;
	transform: translateX(-50%);
	.friend-verification {
		top: 7vh;
		width: 90%;
		height: 4vh;
		
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		color: #3a5e77;
		font-weight: 1000;
		font-size: 5.5vw;
	}
	.invite-friends {
		top: 16vh;
		width: 80%;
		height: 6vh;
		background-color: #a3d5f6;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2.5vh;
		color: #3a5e77;
		font-weight: 500;
		font-size: 5vw;
	}
}
</style>
