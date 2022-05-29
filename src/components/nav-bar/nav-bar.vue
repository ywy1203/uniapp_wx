<template>
	<view class="bg-bar">
		<uni-nav-bar :border="false" :statusBar="true" :fixed="true" leftWidth="0" rightWidth="0" backgroundColor=""
			height="8.3vh">
			<view class="default" slot="default">
				<!-- 直播 -->
				<image src="../../../static/icon/6.png" @click="navTo('live')" mode="aspectFit" style="width: 60rpx;">
				</image>
				<!-- 热榜 -->
				<image src="../../../static/icon/7.png" @click="navTo('hotlist')" mode="aspectFit"
					style="width: 60rpx;"></image>
				<!-- 公益招聘 -->
				<image src="../../../static/icon/8.png" @click="navTo('recruit')" mode="aspectFit"
					style="width: 115rpx;"></image>
				<!-- 消息提醒UI -->
				<uni-badge absolute="rightTop" :offset="[5, 10]" :text="num"
					type="error" size="small" :is-dot="num === 1">
					<image src="../../../static/icon/9.png" class="bell" mode="aspectFit"
						@click="navTo('systemNotice')"></image>
				</uni-badge>
				<image src="../../../static/icon/10.png" @click="navTo('search')" mode="aspectFit"
					style="width: 180rpx; margin-top: 10rpx;"></image>
				<!-- 位置填充 -->
				<view class="box"></view>
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import bus from '@/src/utils/bus.js';
	import {
		v2_notify_get
	} from '@/src/api/message/index.js'
	export default {
		props: {
			nav_btn: {
				type: String,
				default: ''
			},
			sysNotice_haveNew: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				selected: 0,
				num: 0
			};
		},
		methods: {
			navTo: function(name) {
				// console.log('num:',this.num)
				if (this.$store.state.roles == 1 && name == 'hotlist') {

					if (!uni.getStorageSync('vipdays')) {
						if (uni.getStorageSync('expired') != 0) {
							bus.$emit('getVipFlagToTrue', true);
							uni.setStorageSync('vipdays', uni.getStorageSync('expired'));
						}

					} else if (uni.getStorageSync('vipdays')) {

						if (uni.getStorageSync('expired') == 0) {
							bus.$emit('changeVipFlagToTrue', true);
						}
						if (uni.getStorageSync('expired') != 0) {
							if (uni.getStorageSync('expired') !== uni.getStorageSync('vipdays')) {
								bus.$emit('changeVip7FlagToTrue', true);
								uni.setStorageSync('vipdays', uni.getStorageSync('expired'));
							} else {
								uni.redirectTo({
									url: '/src/nav/' + name + '/' + name
								});
							}
						}


					}


				} else {
					uni.redirectTo({
						url: '/src/nav/' + name + '/' + name
					});
				}
			},
			getNoticeData() {
				// 判断系统通知是否有新消息
				v2_notify_get({
					type: 5,
					page: ++this.page
				}).then(res => {
					console.log('notify:', res)
					// 获取未读消息数量
					for(let i = 0; i < res.data.length; i++){
						if(!res.data[i].isRead){
							this.num++
						}
					}
					// 获取所有消息数量
					// this.num = res.data.length
				})
			}
		},
		mounted() {
			this.getNoticeData()
		}
	};
</script>

<style scoped>
	.default {
		width: 1200rpx;
		display: flex;
		flex-direction: row;
		align-items: center !important;
		/* background-color: #000000; */
		margin-left: -15rpx;
		justify-content: space-between !important;
		margin-top: -30rpx;
	}

	.bell {
		/* margin-left: -4rpx; */
		width: 60rpx;
		height: 60rpx;
		margin-top: 10rpx;
		/* margin-right: 10rpx; */
	}

	.box {
		width: 75px;
		background-color: #ffffff;
		/* margin-left: 30rpx; */
		/* margin-right: 10rpx; */
	}
</style>
