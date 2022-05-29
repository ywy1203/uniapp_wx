<template>
	<view>
		<navbar :nav_btn="nav_btn"></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		<view class="bg1">
			<!-- <view class="cover"></view> -->
			<scroll-view scroll-y="true" class="bg2" @scrolltolower="loadMore">
				<view class="bg3">
					<uni-collapse ref="collapse">
						<!-- 系统通知 -->
						<uni-collapse-item>
							<template v-slot:title>
								<view class="message-item">
									<!-- 头像 -->
									<image src="../../../static/icon/system.png" mode="aspectFit" class="img">
										<view class="red-point" v-if="sysHavenew"></view>
									</image>
									<!-- <view class="img">系</view> -->
									<view class="content" style="width: 67.6%;">
										<!-- 名字 -->
										<text class="title">系统通知</text>
										<!-- 通知消息 -->
										<text class="notification">还有{{sysList.length}}条通知</text>
									</view>
									<!-- 通知时间 -->
									<view class="time" style="width: 18%;margin-right: -4vw;">
										<text v-if="systime!=''">{{systime | getDateDiff()}}</text>
									</view>
								</view>
							</template>
							<!-- 展开 -->
							<uni-swipe-action>
								<uni-swipe-action-item v-for="(item,index) in sysList" :key='index'
									:rightOptions="options" @click="sys_swipeClick">
									<!-- 右侧选项 -->
									<template v-slot:right>
										<view class="slot-button">
											<view class="store" @click="sys_swipeClick({text:'收藏'}, index)">
												<!-- <image src="../../static/收藏.png" mode="aspectFit"></image> -->
												<text>收藏</text>
											</view>
											<view class="transmit" @click="sys_swipeClick({text:'转发'}, index)">
												<!-- <image src="../../static/转发.png" mode="aspectFit"></image> -->
												<text>转发</text>
											</view>
											<view class="del" @click="sys_swipeClick({text:'删除'}, index)">
												<!-- <image src="../../static/删除.png" mode="aspectFit"></image> -->
												<text>删除</text>
											</view>
										</view>
									</template>
									<view class="message-item" style="border-top: #f1f1f1 2rpx solid;">
										<!-- 头像 -->
										<image :src="item.avatar" class="img" @click="popInfo(item.nick, item.avatar)">
										</image>
										<!-- <image :src="item.user.avatar" class="img" @click="popInfo('蒋老师')"></image> -->
										<!-- 通知内容 -->
										<view class="content"
											style=" font-size: 28rpx; color: #838383;width: 63.5%;font-weight: bold;">
											<text>{{item.content}}</text>
											<!-- 按钮 -->
											<view
												v-if="(item.targetType=='auth' || item.targetType=='transferAuth') && !item.rec_btn"
												class="btn">
												<image src="../../../static/icon/support.png" mode="aspectFit"
													@click="qualify('支持', item.authId, '', index)"></image>
												<image src="../../../static/icon/refuse.png" mode="aspectFit"
													@click="qualify('拒绝', item.authId, '', index)"></image>
												<image src="../../../static/icon/reply.png" mode="aspectFit"
													@click="qualify('回复', item.authId, '', index)"></image>
											</view>
											<view v-else-if="item.rec_btn" class="btn" style="width: 60%;">
												<image src="../../../static/icon/yes.png" mode="aspectFit"
													@click="recommand(true, index, item.authId)"></image>
												<image src="../../../static/icon/no.png" mode="aspectFit"
													@click="recommand(false, index, item.authId)"></image>
											</view>
										</view>
										<!-- 通知时间 -->
										<view class="time">
											<text>{{item.ctime | getDateDiff()}}</text>
										</view>
									</view>
								</uni-swipe-action-item>
							</uni-swipe-action>
						</uni-collapse-item>
					</uni-collapse>
				</view>
			</scroll-view>
			<!-- 回复 -->
			<replyPopup :replyHidden="replyHidden" @sendData_Hidden='close' @sendData_reply='reply'></replyPopup>
			<!-- 个人信息 -->
			<userInfoPopup :infoHidden='infoHidden' :userInfo='userInfo_params' @sendData='close'></userInfoPopup>
			<!-- 推荐给其他用户 -->
			<recommandPopup :recHidden='recHidden' :authId='authId' @sendData='close'
				@recConfirm='sys_del(qualify_params.index)'></recommandPopup>
			<!-- 增加更多会员 -->
			<moreVIPPopup :moreHidden='moreHidden' @sendData='close'></moreVIPPopup>
		</view>
		<!-- 点击其他区域 -->
		<view v-show="!replyHidden || !infoHidden || !recHidden || !moreHidden" class="popup_overlay"
			@click="close(true)"></view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import navbar from '../../components/nav-bar/nav-bar.vue'
	import tabbar from '../../../custom-tab-bar/index'
	import replyPopup from '../systemNotice-reply-popup/systemNotice-reply-popup.vue'
	import userInfoPopup from '../systemNotice-userInfo-popup/systemNotice-userInfo-popup.vue'
	import recommandPopup from '../systemNotice-recommand-popup/systemNotice-recommand-popup.vue'
	import moreVIPPopup from '../systemNotice-moreVIP-popup/systemNotice-moreVIP-popup.vue'
	import {
		__buildAuthHeaders
	} from '@/src/utils/wxauth.js'
	import {
		v2_notify_get,
		v2_auth2_doAuth,
		v2_auth2_friendsList,
		v2_auth2_transferAuth
	} from '@/src/api/message/index.js'
	export default {
		components: {
			navbar,
			tabbar,
			replyPopup,
			userInfoPopup,
			recommandPopup,
			moreVIPPopup
		},
		data() {
			return {
				nav_btn: "systemNotice",
				sysHavenew: true,
				friHavenew: true,
				selected: 0,
				// 系统通知内容
				sysList: [],
				// 左滑选项
				options: [{
						text: '收藏',
						style: {
							backgroundColor: '#3686ee'
						}
					},
					{
						text: '转发',
						style: {
							backgroundColor: '#f19c46',
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#f75855',
						}
					},
				],
				replyHidden: true,
				infoHidden: true,
				recHidden: true,
				moreHidden: true,
				loading: 'loading',
				lists: [],
				page: 0,
				haveNext: true,
				systime: '',
				qualify_params: {},
				userInfo_params: {
					'nick': '',
					'avatar': ''
				},
				authId: ''
				// replyContent: ''
			}
		},
		methods: {
			sys_swipeClick: function(e, index) {
				// let {
				// 	content
				// } = e
				// console.log(list)
				if (e.text === "删除") {
					this.sysList.splice(index, 1)
					if (!this.sysList.length) { //判断系统通知内容是否为空，如果为空则取消红点显示
						this.sysHavenew = false
						this.systime = ''
					} else {
						this.systime = this.sysList[0].ctime //  更新系统通知最新时间
						// console.log('systime:', this.systime)
					}
				} else {
					uni.showToast({
						title: `点击了${e.text}按钮`,
						icon: 'none'
					})
				}
				this.$nextTick(() => { //这个方法作用是当数据被修改后使用这个方法会回调获取更新后的dom再渲染出来
					this.$refs.collapse.resize()
				})
			},

			qualify: function(e, authId, Rea, index) {
				// console.log('Id:', Id)
				if (e === '支持') {
					uni.showToast({
						title: '您通过了会员认证',
						icon: 'none'
					});
					v2_auth2_doAuth({
						authResult: 1,
						authId: authId
					}).then(res => {
						console.log('success')
					})
					// 是否推荐该用户
					if (this.sysList[index].targetType == 'auth') {
						this.sysList[index].content = '是否将该用户推荐给其他用户'
						this.sysList[index].rec_btn = true
					} else {
						this.sys_del(index)
					}
				} else if (e === '拒绝') {
					uni.showToast({
						title: '您拒绝了会员认证',
						icon: 'none'
					});
					v2_auth2_doAuth({
						authResult: 2,
						authId: authId
					}).then(res => {
						console.log('success')
					})
					this.sys_del(index)
				} else {
					if (Rea != '') {
						v2_auth2_doAuth({
							authResult: 2,
							authId: authId,
							authReason: Rea
						}).then(res => {
							console.log('success')
						})
						this.sys_del(index)
					} else {
						// 缓存参数
						this.qualify_params.authId = authId
						this.qualify_params.e = e
						this.qualify_params.index = index
						this.replyHidden = false // 显示回复窗口	
					}
				}
			},

			recommand: function(isRec, index, authId) {
				if (isRec) {
					v2_auth2_friendsList({
						page: 1
					}).then(res => {
						// console.log(res)
						if (res.friends.length) { //如果有朋友弹出列表
							this.recHidden = false
							this.authId = authId
						} else { //否则提示引进更多会员好友
							this.moreHidden = false
						}
						this.qualify_params.index = index
					})
				} else {
					uni.showToast({
						title: '您拒绝了推荐该用户',
						icon: 'none'
					});
					this.sys_del(index)
				}
			},

			popInfo: function(nick, avatar) {
				// console.log(e)
				// 将需要显示的用户信息打包发送到子组件
				this.userInfo_params.nick = nick
				this.userInfo_params.avatar = avatar
				this.infoHidden = false
			},
			close: function(res) {
				// console.log('close:', res)
				this.replyHidden = res // 关掉回复窗口
				this.infoHidden = res // 关掉个人信息窗口
				this.recHidden = res // 关掉推荐窗口
				this.moreHidden = res // 关掉增加会员提示窗口
				// // 删除消息
				// if (this.recHidden || this.moreHidden) {
				// 	this.sys_del(this.qualify_params.index)
				// }
			},
			reply: function(res) {
				// console.log(res)
				let {
					e,
					authId,
					index
				} = this.qualify_params
				// console.log('333:', e)
				this.qualify(e, authId, res, index)
			},
			sys_del: function(index) {
				this.sysList.splice(index, 1)
				if (!this.sysList.length) { //判断系统通知内容是否为空，如果为空则取消红点显示
					this.sysHavenew = false
					this.systime = ''
				} else {
					this.systime = this.sysList[0].ctime //  更新系统通知最新时间
				}
				this.$nextTick(() => { //这个方法作用是当数据被修改后使用这个方法会回调获取更新后的dom再渲染出来
					this.$refs.collapse.resize()
				})
			},
			rec_del: function() {
				this.sys_del(this.qualify_params.index)
			},
			// 获取消息内容
			getData() {
				if (this.haveNext) {
					v2_notify_get({
						type: 5,
						page: ++this.page
					}).then(res => {
						console.log('res:', res)
						// 定义临时数组存放自定义消息内容
						var listTmp = new Array
						for (let i = 0; i < res.data.length; i++) {
							var listtmp = new Object // 新定义一个临时对象，避免数据覆写
							listtmp.nick = res.data[i].user.nick // 用户名字
							listtmp.avatar = res.data[i].user.avatar // 用户头像
							listtmp.userid = res.data[i].user.userid // 用户ID
							// if(res.data[i].additional.targetType != 'undefined'){
							// 	listtmp.targetType = res.data[i].additional.targetType // 数据类型
							// }else{}
							// console.log('targetType:',res.data[i].hasOwnProperty("additional"))
							listtmp.targetType = res.data[i].hasOwnProperty("additional")?res.data[i].additional.targetType:''
							if (listtmp.targetType == 'auth') {
								listtmp.content = `新用户${res.data[i].user.nick}希望您通过会员认证`
							} else if (listtmp.targetType == 'transferAuth') {
								listtmp.content = `${res.data[i].user.nick}希望你协助认证新会员`
							}else{
								listtmp.content = res.data[i].msg.content
							}
							// listtmp.content = res.data[i].msg.content
							listtmp.ctime = res.data[i].ctime // 消息时间
							listtmp.isRead = res.data[i].isRead // 是否已读
							listtmp.type = res.data[i].msg.type // 消息类别
							listtmp.rec_btn = false // 是否推荐给他人
							listtmp.haveFri = false // 是否有好友
							listtmp.authId = res.data[i].hasOwnProperty("additional")?res.data[i].additional.authId:'' // 消息的authId
							listTmp.push(listtmp)

							// 添加推荐给他人的消息
							// if (listtmp.targetType == 'auth') {
							// 	// 把对象转换成字符串再转换成对象 ,这样会新分配一块内存，就不会指向同一个堆中的数据
							// 	let tmp = JSON.parse(JSON.stringify(listtmp))
							// 	tmp.content = '是否将该用户推荐给其他用户'
							// 	tmp.rec_btn = true
							// 	listTmp.push(tmp)
							// }
						}
						// 将临时数组导入系统通知数组中
						this.sysList = [...this.sysList, ...listTmp]
						this.haveNext = res.haveNext
						this.loading = 'more'
						this.systime = res.data[0].ctime
						console.log('lists:', this.sysList)
					})
				}
			},
			// 加载更多消息
			loadMore() {
				this.getData()
			},
		},

		onLoad() {
			// // let headers = this.$__buildAuthHeaders()
			// let headers = __buildAuthHeaders()
			// headers['Content-Type'] = 'application/json'
			// // console.log('test:', headers)
			// var that = this
			// uni.request({
			// 	url: 'http://cookbook.xuminjie.top:8000/v2/auth2/transferAuth',
			// 	header: headers,
			// 	data: {
			// 		authUserId: 1
			// 	},
			// 	method: 'post',
			// 	success(res) {
			// 		console.log('notify:', res)
			// 		// that.cTime = res.data.result.data[1].ctime
			// 		// console.log('cTime:', that.cTime)
			// 	}
			// })
		},

		mounted() {
			this.getData()
		}
	}
</script>

<style>
	page {
		background-color: #4992d6;
	}

	.bg1 {
		background-color: #ffffff;
		height: 97vh;
		width: 98vw;
		margin: 0 1vw;
		margin-top: -8.5vh;
		border-radius: 40rpx;
		padding-top: 10vh;
		position: absolute;
		/* top: 40rpx; */
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		/* align-items: center; */
		/* justify-content: center; */
	}

	.bg2 {
		background-color: #f1f1f1;
		height: 76vh;
		width: 98vw;
		margin: 0 auto;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
	}

	.bg3 {
		background-color: #ffffff;
		/* height: 90vh; */
		width: 98vw;
		margin: 0 auto;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.cover {
		background-color: #00ddff;
		height: 10vh;
		position: fixed;
	}

	.message-item {
		flex: 1;
		/* height: 80px; */
		/* line-height: 100px; */
		padding: 0 2.5vw;
		position: relative;
		background-color: #fff;
		/* border-bottom: #e3e3e3 2rpx solid; */
		display: flex;
		flex-direction: row;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		font-family: Microsoft YaHei;
	}

	.img {
		width: 13vw;
		height: 13vw;
		border-radius: 50rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		/* padding-top: 15rpx; */
	}

	.time {
		font-size: 22rpx;
		color: #ababab;
		font-weight: bold;
		margin-top: 15rpx;
		text-align: right;
		width: 16%;
		/* background-color: #00ddff; */
	}

	.title {
		font-weight: bold;
	}

	.notification {
		font-size: 20rpx;
		color: #ababab;
		margin-top: 32rpx;
		font-weight: bold;
	}

	.point {
		align-items: center !important;
		display: flex !important;
		margin-right: 10rpx;
		width: 20rpx;
	}

	.red-point {
		background-color: #ff0000;
		width: 30rpx;
		height: 30rpx;
		border-radius: 20rpx;
		margin-left: -30rpx;
		margin-bottom: -30rpx;
	}

	.type {
		width: 40rpx;
		height: 40rpx;
	}

	.Type {
		align-items: center !important;
		display: flex !important;
		margin-left: 36rpx;
		margin-right: 10rpx;
	}

	.trash {
		position: fixed;
		bottom: 150rpx;
		right: 50rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.trash image {
		width: 100rpx;
		height: 100rpx;
	}

	.trash text {
		font-size: 18rpx;
		margin-top: 10rpx;
		color: #a4a1a5;
		/* font-weight: bold; */
	}

	.btn {
		display: flex;
		flex-direction: row;
		margin-top: 15rpx;
		margin-left: -10rpx;
		/* background-color: #000000; */
	}

	.btn image {
		height: 50rpx;
	}

	.slot-button {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* padding: 0 20px; */
		color: #ffffff;
	}

	.slot-button image {
		width: 60rpx;
		height: 60rpx;
	}

	.store {
		background-color: #9fd9f5;
		height: 100%;
		width: 140rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center !important;
		justify-content: center;
	}

	.transmit {
		background-color: #feac00;
		height: 100%;
		width: 140rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	.del {
		background-color: #ff5a5f;
		height: 100%;
		width: 140rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	.popup_reply {
		width: 75vw;
		height: 28vh;
		border-radius: 8vw;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 25rpx -10rpx #3a3a3a;
		position: fixed;
		z-index: 1002;
		margin-top: 15vh;
		box-sizing: border-box;
		text-align: center;
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

	.popup_overlay {
		/* background-color: #000000; */
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
	}
</style>
