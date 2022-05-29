<template>
	<view class="tab-bar">
		<view v-for="(item, index) in list" :key="index" class="tab-bar-item" @click="switchTab(item, index)" style=" position: relative;">
			<uni-badge :text="item.tabbarMessage" :is-dot="item.tabbarMessage == 1" style="position: absolute;top: -10rpx;right: 10rpx;" size="normal"></uni-badge>

			<image class="tab_img" :src="selected === index ? item.selectedIconPath : item.iconPath"></image>
			<!-- :style="{color: selected === index ? selectedColor :color }" -->
			<view class="tab_text" :style="{ color: selected === index ? selectedColor : color }">{{ item.text }}</view>
		</view>
		<homeVipFloat></homeVipFloat>
	</view>
</template>

<script>
import homeVipFloat from '../src/components/home-vip-float/home-vip-float.vue';
import bus from '@/src/utils/bus.js';
export default {
	components: { homeVipFloat },
	created() {
		console.log('asaa' + this.selected);

		// this.selected = getApp().globalData.index;
		this.text = getApp().globalData.messageNum;
	},
	updated() {
		// this.selected = getApp().globalData.index;
		// console.log("更新"+this.selected)
	},

	data() {
		return {
			text: '',
			selected: null,
			color: '#02330a',
			selectedColor: '#55ffff',

			list: [
				{
					pagePath: '/src/tabbar/home/home',
					iconPath: '../static/icon/22.png',
					selectedIconPath: '../static/icon/1.png',
					text: '首页',
					tabbarMessage: '',
					name: 'home'
				},
				{
					pagePath: '/src/tabbar/message/message',
					iconPath: '../static/icon/17.png',
					selectedIconPath: '../static/icon/2.png',
					text: '信息',
					tabbarMessage: '20',
					name: 'message'
				},
				{
					pagePath: '/src/tabbar/schoolMoments/schoolMoments',
					iconPath: '../static/icon/24.png',
					selectedIconPath: '../static/icon/3.png',
					text: '校友圈',
					tabbarMessage: '1',
					name: 'schoolMoments'
				},
				{
					pagePath: '/src/tabbar/homePage/homePage',
					iconPath: '../static/icon/4.png',
					selectedIconPath: '../static/icon/4.png',
					text: '主页',
					tabbarMessage: '1',
					name: 'homePage'
				},

				{
					pagePath: '/src/tabbar/me/me',
					iconPath: '../static/icon/23.png',
					selectedIconPath: '../static/icon/5.png',
					text: '我的',
					tabbarMessage: '',
					name: 'me'
				}
			]
		};
	},
	methods: {
		switchTab(item, index) {
			if ((this.$store.state.roles == 1 && index == 2) || index == 3) {
				//vipdays用来判断赠送会员否是过了一天，且是否是第一次领取
				if(!uni.getStorageSync('vipdays')){
					if(uni.getStorageSync('expired') != 0){
						bus.$emit('getVipFlagToTrue', true);
						uni.setStorageSync('vipdays', uni.getStorageSync('expired'));
					}
					
				}else if(uni.getStorageSync('vipdays')){
					
					if (uni.getStorageSync('expired') != 0 && uni.getStorageSync('expired') != uni.getStorageSync('vipdays')) {
							bus.$emit('changeVip7FlagToTrue', true);
							uni.setStorageSync('vipdays',uni.getStorageSync('expired'));
						} else if (uni.getStorageSync('expired') != 0 && uni.getStorageSync('expired') == uni.getStorageSync('vipdays')) {
							uni.switchTab({
								url: item.pagePath
							});
						} else if (uni.getStorageSync('expired') == 0) {
							bus.$emit('changeVipFlagToTrue', true);
						}
					}
					} else {
						uni.switchTab({
							url: item.pagePath
						});
				}
				
		}
	}
};
</script>

<style lang="scss" scoped>
.tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 10.8vh;
	width: 97.8vw;
	background-color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
	margin: 0vw 1vw;
	margin-bottom: 0.4vh;
	border-bottom-left-radius: 6vw;

	border-bottom-right-radius: 6vw;

	.tab-bar-item {
		flex: 1;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.tab_img {
			width: 8vw;
			height: 4vh;
		}

		.tab_text {
			font-size: 2vh;
			margin-top: 0.2vh;
		}
	}
}
</style>
