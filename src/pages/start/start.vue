<template>
	<view class="content">
		<image src="../../../static/bg/bg.png" mode="">
			<view class="container">
				<!-- <button class="bubble" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">计算机</button> -->
				<view class="bubble" @click="checkToken()"><text>计算机</text></view>
				<!-- <button open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">手机</button> -->
				<view class="shadow"></view>
				<view  v-if="showFlag" class="fixed-center get-phone"><text class="absolute-width-center">获取手机号
				
				<text  style="display: block; font-size: 4vw;margin-top: 2vw;color: #888888;">需要您手机授权</text>
				
				</text>
				
				
				<button type="primary" class="absolute-width-center" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">微信用户一键绑定</button>
				</view>	
			</view>
		</image>
	</view>
</template>

<script>
import { baseURL } from '../../utils/const.js';
import { mapMutations, mapGetters } from 'vuex';


export default {
	data() {
		return {
			showFlag:false
		};
	},
	computed: {
		// ...mapGetters(["isLogin"])
	},
	onShow() {
		// this.checkToken()
	},
	methods: {
		__buildAuthHeaders() {
			let headers = {};
			// let token = 'Bearer ' + uni.getStorageSync("token");
			// headers['authorization'] = token;
			let token = uni.getStorageSync("token");
			//后端验证使用
			headers['token'] = token;
			return headers;
		},
		getPhoneNumber(e) {
			return new Promise((resolve, reject) => {
				let headers = this.__buildAuthHeaders();
				var that = this;
				wx.request({
					url: baseURL + 'v2/wxAuth/getPhoneNumber',
					method: 'post',
					header: headers,
					data: {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv
					},
				 success: function(res) {
						//成功标记
						if (res.data.success) {	
							resolve(res.data.result);
							uni.switchTab({
								url:'../../tabbar/home/home'
							})
						} else {
							//验证失败,重新登录	
							that.login();
							reject(false);
						}
					}
				});
			});
		},
		
		checkToken() {
			return new Promise((resolve, reject) => {
				let token = uni.getStorageSync('token');
				//有token,已登录过
				if (token) {
					//session ok
					this.checkSession().then(
						res => {
							let token = uni.getStorageSync('token');
							var header = {};
							const postdata = { token };
							wx.request({
								url: baseURL + 'v2/wxAuth/checkToken',
								header: header,
								method: 'post',
								data: postdata,
								success: res => {
									//token ok
									console.log(res)
									if (res.data && res.data.result && res.data.result.isPass) {
										uni.setStorageSync('userType', res.data.result.userType);
										uni.setStorageSync('memberNo', res.data.result.memberNo);
										uni.setStorageSync('upid', res.data.result.upid);
										uni.setStorageSync('userid', res.data.result.userid);
										uni.setStorageSync('expired', res.data.result.expired);
										
										resolve({
											...res.data.result.userType,
											...res.data.result.memberNo,
											...res.data.result.upid,
											...res.data.result.userid,
											...res.data.result.expired
										});
										uni.switchTab({
											url: '../../tabbar/home/home'
										});
									} else {
										//token fail,重新login
										this.login().then(
											res => {
												resolve(res);
											},
											err => {
												reject(err);
											}
										);
									}
								}
							});
						},
						err => {
							//失败重新登录
							this.login().then(
								res => {
									resolve(res);
								},
								err => {
									reject(err);
								}
							);
						}
					);
				} else {
					//过期重新登录
					this.login().then(
						res => {
							resolve(res);
						},
						err => {
							reject(err);
						}
					);
				}
			});
		},
		changeFlag(){
			this.showFlag  = true;
		},
		login() {
			return new Promise((resolve, reject) => {
				uni.removeStorageSync('token');
				uni.removeStorageSync('memberNo');
				uni.removeStorageSync('upid');
				uni.removeStorageSync('userid');
				uni.getUserProfile({
					desc: 'Wexin', // 这个参数是必须的
					success: res => {
						this.updateuserInfo(res.rawData);
						this.changeFlag();
						// uni.setStorageSync('userInfo',this.updateuserInfo(res.rawData))
					}
				});
				wx.login({
					success: function(res) {
						//login成功返回code
						if (res.code) {
							let header = {};
							let code = res.code;
							let postdata = { code };
							let upid = uni.getStorageSync('upid') || '';
							// let channel = uni.getStorageSync("channel") || "weixin_qrcode";
							//如果存在推广员码
							// if(upid){
							//   postdata.upid = upid;
							//   postdata.channel = channel;
							//   uni.removeStorageSync("upid");
							//   uni.removeStorageSync("channel");
							// }
							//后端登录获取token
							wx.request({
								url: baseURL + 'v2/wxAuth/login',
								header: header,
								method: 'post',
								data: postdata,
								success: function(res) {
									//login成功获取token
									if (res.data && res.data.result && res.data.result.token) {
										uni.setStorageSync('token', res.data.result.token);
										uni.setStorageSync('memberNo', res.data.result.memberNo);
										uni.setStorageSync('upid', res.data.result.upid);
										uni.setStorageSync('userid', res.data.result.userid);
										uni.setStorageSync('userType', res.data.result.userType);
										uni.setStorageSync('expired', res.data.result.expired);
										resolve({
											...res.data.result.token,
											...res.data.result.memberNo,
											...res.data.result.upid,
											...res.data.result.userid,
											...res.data.result.userType,
											...res.data.result.expired
										});
										
									} else {
										reject(res);
									}
								}
							});
						} else {
							reject(res.errMsg);
						}
					},
					fail: function(err) {
						reject(err);
					}
				});
			});
		},
		checkSession() {
			return new Promise((resolve, reject) => {
				//微信checkSession
				wx.checkSession({
					success: function(res) {
						resolve(res);
					},
					fail: function() {
						//过期重新登录
						this.login().then(
							res => {
								resolve(res);
							},
							err => {
								reject(err);
							}
						);
					}
				});
			});
		},
		updateuserInfo(userInfo) {
			return new Promise((resolve, reject) => {
				//拼接token header
				let headers = this.__buildAuthHeaders();
				wx.request({
					url: baseURL + 'v2/wxAuth/updateUserInfo',
					method: 'post',
					header: headers,
					data: userInfo ,
					success: function(res) {
						//成功标记
						if (res.data.success) {
							uni.removeStorageSync('userInfo');
							uni.setStorageSync('userInfo',res.data.result);
							resolve(res.data.result);
						} else {
							reject(null);
						}
					}
				});
			});
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	width: 100vw;
	height: 100vh;
}
.get-phone{
	width: 70vw;
	height: 30vh;
	border-radius:6vw ;
	background-color: #fff;
	box-shadow: 5rpx 5rpx 10rpx #888888;
	button{
		position: absolute;
		bottom: 10%;
		width: 80%;	
	}
	text{
		font-size: 6vw;
		font-weight: 500;
		color: black;
		top: 20%;
	}
}

.container {
	width: 30vw;
	height: 30vw;
	/* 相对定位 */
	position: fixed;
	top: 14vh;
	left: 10vw;
}

.bubble {
	width: 100%;
	height: 100%;
	/* 径向渐变 */
	background: radial-gradient(circle at 75% 30%, #fff 5px, #597dff 8%, #5b5b5b 60%, #597dff 100%);
	border-radius: 50%;
	/* 阴影 */

	box-shadow: inset 0 0 3vw #fff, inset 1.5vw 0 7vw #eaf5fc, inset 12vw 0 9vw #6ba0ef, inset -3vw -9vw 15vw #e0edf9, inset 0 7.5vw 21vw #f9f6de, 0 0 14vw #fff;
	/* 执行动画：动画名 时长 加速后减速 无限次播放 */
	animation: bubble 5s ease-in-out infinite;
	position: relative;
	text {
		color: #738628;
		float: right;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
.shadow {
	background-color: rgba(0, 0, 0, 0.15);
	width: 22vw;
	height: 5.9vw;
	border-radius: 50%;
	/* 绝对定位 */
	position: fixed;
	top: 30vh;
	left: 14vw;

	/* 一点点模糊效果 */
	filter: blur(1px);
	/* 执行动画：动画名 时长 加速后减速 无限次播放 */
	animation: shadow 5s ease-in-out infinite;
}

/* 定义动画 */
/* 泡泡浮动动画 */
@keyframes bubble {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-5vh);
	}
}
/* 投影动画 */
@keyframes shadow {
	0%,
	100% {
		transform: scale(0.5);
	}
	50% {
		transform: scale(1);
	}
}
</style>
