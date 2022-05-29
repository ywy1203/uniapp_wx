<template>
	<view>
		<!-- 回复 -->
		<view class="popup_reply" :hidden='replyHidden_tmp'>
			<image src="../../../static/icon/13.png" mode="aspectFit" class="popup_del" @click="reply_close">
			</image>
			<view class="popup_textarea">
				<input type="text" v-model="replyContent" placeholder="请输入内容" placeholder-style="color: #c5c5c5" />
			</view>
			<image src="../../../static/icon/confirm.png" mode="aspectFit" style="height: 28%;width: 28%;"
				@click="reply_confirm()"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			replyHidden: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				replyContent: '',
				replyHidden_tmp: this.replyHidden
			}
		},
		watch:{
			replyHidden(){
				this.replyHidden_tmp = this.replyHidden
			}
		},
		methods: {
			reply_confirm: function() {
				if (this.replyContent == '') {
					uni.showToast({
						title: '内容不能为空',
						icon: 'error'
					})
				} else {
					uni.showToast({
						title: '成功回复内容',
						icon: 'success'
					})
					this.replyHidden_tmp = true
					this.$emit('sendData_Hidden', this.replyHidden_tmp)  // 关闭弹窗
					this.$emit('sendData_reply', this.replyContent)  // 将会回复内容发送给父组件
					this.replyContent = ''
				}
			},
			reply_close: function() {
				this.replyHidden_tmp = true
				this.$emit('sendData_Hidden', this.replyHidden_tmp)
				// this.infoHidden = true
			},
		}
	}
</script>

<style>
	.popup_reply {
		width: 75vw;
		height: 28vh;
		border-radius: 8vw;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 25rpx -10rpx #3a3a3a;
		position: fixed;
		z-index: 1002;
		box-sizing: border-box;
		text-align: center;
		margin: 15vh 11vw;
	}

	.popup_del {
		width: 10vw;
		height: 10vw;
		margin-left: 89%;
		margin-top: -2%;
	}

	.popup_textarea {
		width: 80%;
		height: 15%;
		line-height: 15%;
		font-size: 40rpx;
		color: #878787;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		border: #cbcbcb 2rpx solid;
		margin-top: 12%;
		margin-bottom: 8%;
	}
</style>
