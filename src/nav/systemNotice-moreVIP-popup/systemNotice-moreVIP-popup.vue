<template>
	<view>
		<view class="popup_moreVIP" :hidden="moreHidden_tmp">
			<text class="more_title">增加更多会员好友可以引进其他会员</text>
			<image src="../../../static/icon/rec_confirm.png" mode="aspectFit" @click="more_confirm"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			moreHidden: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				moreHidden_tmp: this.moreHidden,
			}
		},
		methods: {
			more_confirm: function() {
				// 关闭推荐窗口
				this.moreHidden_tmp = true
				// 告诉父组件我已关闭窗口
				this.$emit('sendData', this.moreHidden_tmp)
			}
		},
		watch: {
			moreHidden() {
				this.moreHidden_tmp = this.moreHidden
			}
		}
	}
</script>

<style>
	.popup_moreVIP {
		width: 88vw;
		height: 45vw;
		border-radius: 4vw;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 25rpx -10rpx #3a3a3a;
		position: fixed;
		z-index: 1002;
		/* margin-top: 15vh; */
		margin: 24vh 5vw;
		/* overflow: auto; */
		box-sizing: border-box;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.popup_moreVIP image {
		width: 78vw;
		height: 13vw;
		margin: 0 auto;
		margin-top: 7vw;
	}

	.more_title {
		line-height: 9vw;
		font-weight: bold;
		font-size: 38rpx;
		color: #9e9e9e;
		margin-top: 10vw;
	}
</style>
