<template>
	<view>
		<view class="popup_recommand" :hidden="recHidden_tmp">
			<view class="title">
				推荐给其他好友&nbsp&nbsp({{num}}/3)
			</view>
			<view>
				<scroll-view scroll-y="true" class="scrollY" @scrolltolower="LoadMore">
					<view class="wrap">
						<view :class="[item.selected?'userInfo_selected':'userInfo_default']"
							v-for="(item, index) in recList" :key='index' @click="select_rec(index)">
							<view :class="[item.selected?'checkbox_selected':'checkbox_default']"></view>
							<image :src="item.avatar" mode="aspectFit" style="width: 12vw;height: 12vw;"></image>
							<view class="info">
								<text class="userName">{{item.nickName}}</text>
								<text class="userCareer">{{item.Career}}|{{item.Field}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<text style="font-size: 24rpx;margin: 1vw auto;">更多...</text>
			<image src="../../../static/icon/rec_confirm.png" mode="aspectFit"
				style="width: 78vw;height: 13vw;margin: 0 auto;" @click="rec_confirm"></image>
		</view>
	</view>
</template>

<script>
	import {
		v2_auth2_friendsList,
		v2_auth2_transferAuth
	} from '@/src/api/message/index.js'
	export default {
		props: {
			recHidden: {
				type: Boolean,
				default: true
			},
			authId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				recHidden_tmp: this.recHidden,
				recList: [],
				num: 1,
				selectedColor: '#919191',
				defaultColor: '#ffffff',
				HaveNext: true,
				Page: 0,
				acceptUserId: []
			}
		},
		methods: {
			select_rec: function(id) {
				// console.log(this.num)
				if (!this.recList[id].selected) {
					if (this.num == 3) {
						uni.showToast({
							title: '最多选择3个',
							icon: 'error'
						});
					} else {
						this.recList[id].selected = !this.recList[id].selected
						this.num++
					}
				} else {
					if (this.num == 1) {
						uni.showToast({
							title: '至少选择1个',
							icon: 'error'
						});
					} else {
						this.recList[id].selected = !this.recList[id].selected
						this.num--
					}
				}
				// console.log(this.num)
			},
			rec_confirm: function() {
				// 用for循环遍历数组获取被选择的好友信息
				for (let i = 0; i < this.recList.length; i++) {
					if (this.recList[i].selected) {
						this.acceptUserId.push(this.recList[i].userId)
					}
				}
				// console.log('accept:', this.acceptUserId)
				// 将选择好的userId发送到后端
				v2_auth2_transferAuth({
					acceptUserId: this.acceptUserId,
					authId: this.authId
				}).then(res => {
					console.log('success')					
				})

				uni.showToast({
					title: '成功推荐给好友',
					icon: 'success'
				});
				// 关闭推荐窗口
				this.recHidden_tmp = true
				// 告诉父组件我已关闭窗口
				this.$emit('sendData', this.recHidden_tmp)
				this.$emit('recConfirm', true)
				// 重置数据
				this.num = 1
				for (let i = 0; i < this.recList.length; i++) {
					this.recList[i].selected = i<1?true:false
				}
				this.acceptUserId = []
			},
			getFriends: function() {
				if (this.HaveNext) {
					v2_auth2_friendsList({
						page: ++this.Page
					}).then(res => {
						// console.log('friends:', res)
						// 自定义数组
						var friTmp = new Array
						for (let i = 0; i < res.friends.length; i++) {
							let fritmp = new Object
							fritmp.userId = res.friends[i]._id // 用户ID
							fritmp.nickName = res.friends[i].nickName // 用户ID
							fritmp.realName = res.friends[i].realName // 用户ID
							fritmp.Career = '数据分析师'
							fritmp.Field = '金融'
							fritmp.selected = i == 0 ? true : false // 是否被选中
							fritmp.avatar = '/static/icon/14.png' // 头像
							friTmp.push(fritmp)
						}
						// 将临时数组导入系统通知数组中
						this.recList = [...this.recList, ...friTmp]
						this.HaveNext = res.haveNext
						// console.log('fri:', this.recList)
						// console.log('havenext:', this.HaveNext)
					})
				}
			}
		},
		// 加载更多消息
		LoadMore() {
			this.getData()
		},
		watch: {
			recHidden() {
				this.recHidden_tmp = this.recHidden
			}
		},
		mounted() {
			// show(option) {
			// 	this.recList[0].selected = option.defaultFirst
			// }
			this.getFriends()
		}
	}
</script>

<style>
	.popup_recommand {
		width: 88vw;
		height: 77vw;
		border-radius: 8vw;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 25rpx -10rpx #3a3a3a;
		position: fixed;
		z-index: 1002;
		/* margin-top: 15vh; */
		margin: 15vh 5vw;
		/* overflow: auto; */
		box-sizing: border-box;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.title {
		width: 40vw;
		height: 9vw;
		border-radius: 2vw;
		line-height: 9vw;
		background-color: #4491ce;
		font-size: 28rpx;
		color: #FFFFFF;
		margin: -5vw auto;
	}

	.scrollY {
		height: 44vw;
		width: 80vw;
		margin: 0 auto;
		margin-top: 12%;
		/* background-color: #c800ff; */
	}

	.wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.userInfo_default {
		width: 50%;
		display: flex;
		flex-direction: row;
		/* background-color: #00DDFF; */
		margin-bottom: 3.5vw;
		align-items: center;
		font-weight: bold;
	}

	.userInfo_selected {
		width: 50%;
		display: flex;
		flex-direction: row;
		margin-bottom: 3.5vw;
		align-items: center;
		color: #4491ce;
		font-weight: bold;
	}

	.info {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin-left: 2vw;
	}

	.userName {
		margin-top: 1.5vw;
		margin-bottom: 1.5vw;
	}

	.userCareer {
		font-size: 18rpx;
	}

	.checkbox_default {
		width: 3vw;
		height: 3vw;
		border: #919191 2rpx solid;
		border-radius: 2vw;
		margin-right: 1.5vw;
		background-color: #FFFFFF;
	}

	.checkbox_selected {
		width: 3vw;
		height: 3vw;
		border: #919191 2rpx solid;
		border-radius: 2vw;
		margin-right: 1.5vw;
		background-color: #919191;
	}
</style>
