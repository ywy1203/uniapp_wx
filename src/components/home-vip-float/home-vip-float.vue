<template>
	<view><view class="home-vip-float" v-show="flag" @click="changeVipFlag">
	<img src="@/static/icon/31.png" alt=""></view></view>
</template>

<script>
import bus from '@/src/utils/bus.js';
import { getinvitorInfo } from '@/src/utils/wxauth.js'
export default {
	data() {
		return {
			flag: true
		};
	},
	unmounted() {
		if (uni.getStorageSync('userType') != 1) {
			this.flag = false;
		}
	},

	methods: {
		async changeVipFlag() {
			let inviteInfo = await getinvitorInfo();
			bus.$emit('changeClosedFlagToChange', inviteInfo);	
		}
	}
};
</script>

<style>
.home-vip-float {
	width: calc(10.8vh - 2vh);
	height: calc(10.8vh - 2vh);
	margin-right: 3vw;
	margin-bottom: 2vh;
	background-color: #007aff;
	border-radius: 50%;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 10000;
	
}
</style>
