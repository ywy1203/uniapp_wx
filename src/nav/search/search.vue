<template>
	<view>
		<!-- 顶部导航栏 -->
		<navbar :nav_btn="nav_btn"></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>

		<view class="search">
			<view class="content">
				<uni-icons type="search" style="margin-left: 12rpx;margin-right: 12rpx;"></uni-icons>
				<textarea v-model="value" placeholder-style="color:#c2c2c2;" auto-focus="true" @confirm="confirm" auto-height="true" confirm-type="search"
					placeholder="请输入内容" />
			</view>
			<text class="txt" @click="confirm">搜索</text>
		</view>
		<toBeVip></toBeVip>	

		<!-- 底部导航栏 -->
		<tabbar ></tabbar>
	</view>
</template>

<script>
	import navbar from '../../components/nav-bar/nav-bar.vue'
	import tabbar from '../../../custom-tab-bar/index'
	import toBeVip from '../../components/home-be-vip/home-be-vip.vue'
	export default {
		components: {
			navbar,
			tabbar,
			toBeVip
		},
		data() {
			return {
				nav_btn: "search",
				selected: 0,
				value: ''
			}
		},
		methods: {
			confirm: function() {
				if (this.value==="") {
					uni.showToast({
						title: '内容不能为空',
						icon: "error"
					});
				} else {
					uni.showToast({
						title: '使用了搜索功能',
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f1f1f1;
	}

	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 40rpx;
	}

	.content {
		display: flex;
		flex-direction: row;
		width: 70%;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 40rpx;
		background-color: #ffffff;
		margin-left: 34rpx;
		border: #d3d3d3 4rpx solid;
		border-radius: 30rpx;
	}

	.txt {
		color: #6b6b6b;
		/* font-weight: bold; */
		margin-left: 30rpx;
	}
</style>
