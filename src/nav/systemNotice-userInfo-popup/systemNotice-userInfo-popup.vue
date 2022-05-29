<template>
	<view>
		<view class="popup_userInfo" :hidden="infoHidden_tmp">
			<image src="../../../static/icon/13.png" mode="aspectFit" class="popup_del" @click="info_close">
			</image>
			<view class="userImg">
				<image :src="userinfo.img" mode="aspectFit"></image>
				<text>{{userinfo.name}}</text>
			</view>
			<view class="info1">
				<text>{{userinfo.career}}|{{userinfo.field}}</text>
				<text
					style="margin-left: 6%;">{{userinfo.school}}/{{userinfo.subject}}/{{userinfo.degree}}/{{userinfo.workTime}}</text>
			</view>
			<view class="info2">
				<view class="info3">
					<image src="../../../static/icon/phoneNum.png" mode="aspectFit"></image>
					<text>{{userinfo.phoneNum}}</text>
				</view>
				<view class="info3">
					<image src="../../../static/icon/weixin.png" mode="aspectFit"></image>
					<text>{{userinfo.weixin}}</text>
				</view>
			</view>
			<view class="info2">
				<view class="info3">
					<image src="../../../static/icon/firm.png" mode="aspectFit"></image>
					<text>{{userinfo.firm}}</text>
				</view>
				<view class="info3">
					<image src="../../../static/icon/position.png" mode="aspectFit"></image>
					<text>{{userinfo.position}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			infoHidden: {
				type: Boolean,
				default: true
			},
			userInfo: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				infoHidden_tmp: this.infoHidden,
				userinfo: {
					img: this.userInfo.avatar,
					content: '蒋老师希望你协助认证新会员',
					time: '4小时前',
					qualify_btn: true,
					rec_btn: false,
					name: this.userInfo.nick,
					career: '策略分析师',
					field: '金融',
					school: '学校名称',
					subject: '专业',
					degree: '学位',
					workTime: '工作年限',
					phoneNum: '15555555555',
					weixin: 'HDM15555555',
					firm: '人大人科学研究院',
					position: '居住在上海市杨浦区'
				},
			}
		},
		watch: {
			// 检测数据变动
			infoHidden() {
				this.infoHidden_tmp = this.infoHidden
				this.userinfo.name = this.userInfo.nick
				this.userinfo.img = this.userInfo.avatar
				// console.log('userinfo:', this.userinfo)
			},
			// getuserInfo(){
			// 	this.userinfo.name = this.userInfo.nick
			// 	this.userinfo.img = this.userInfo.avatar
			// 	// console.log(this.userinfo)
			// }
		},
		methods: {
			info_close: function() {
				this.infoHidden_tmp = true
				this.$emit('sendData', this.infoHidden_tmp)
			}			
		},
	}
</script>

<style>
	.popup_userInfo {
		width: 78vw;
		height: 62vw;
		border-radius: 8vw;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 25rpx -10rpx #3a3a3a;
		position: fixed;
		z-index: 1002;
		/* margin-top: 15vh; */
		margin: 15vh 9.5vw;
		/* overflow: auto; */
		box-sizing: border-box;
		text-align: center;
	}

	.userImg {
		display: flex;
		flex-direction: column;
		width: 20%;
		height: auto;
		/* background-color: #00DDFF; */
		align-items: center;
		margin: auto;
		margin-top: -2vh;
	}
	.userImg text {
		color: #4491ce;
		font-weight: bold;
		margin-top: 1vh;
	}
	.userImg image{
		width: 14vw;
		height: 14vw;
		border-radius: 7vw;
	}

	.info1 {
		font-size: 24rpx;
		font-weight: bold;
		margin-top: 8%;
	}

	.info2 {
		display: flex;
		flex-direction: row;
		margin: auto;
		width: 86%;
		/* background-color: #00DDFF; */
		margin-top: 6%;
		justify-content: space-around;
	}

	.info2 image {
		width: 5vw;
		height: 5vw;
		margin-right: 2vw;
	}

	.info3 {
		display: flex;
		flex-direction: row;
		font-size: 20rpx;
		width: 50%;
		align-items: center;
	}
</style>
