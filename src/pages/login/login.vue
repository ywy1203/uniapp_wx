<template>
	<view class="login_box">
		<view class="login">
			<view class="login_title">
				手机号授权
			</view>
		</view>
		<view class="form">
			<view class="login_phone">
				<input class="input" type="text" maxlength="11" placeholder="请输入手机号" v-model="phone" />
			</view>
			<view class="login_code">
				<input class="input" type="password" maxlength="4" placeholder="请输入验证码" v-model="userCode" />
			</view>
			<view class="login_btn">
				<!-- <text class="btn_value" @click="getcode">获取验证码</text> -->
				<text class="btn_value" @click="getcode">{{message}}</text>
				<text class="btn_value" @click="get_resCode">登录</text>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				phone: "",
				message: "获取验证码",
				isSend: false,
				userCode: ""
				// userCode:""是用户输入的验证码
			}
		},
		onLoad() {

		},
		methods: {
			async getcode() {
				// console.log(this.phone)
				if (this.isSend) {
					uni.showToast({
						title: "已经点过一次了，请等过了60秒之后再点，在此期间不能重复发送",
						icon: "none"
					})
					return
				}
				let phone = this.phone
				// 这是收到验证码的手机号
				// 也可以跟验证码一起存到缓存里
				let zhengze = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
				if (!zhengze.test(phone)) {
					uni.showToast({
						title: "手机号码有误",
						icon: "none"
					})
					return
				}
				// 输入正确手机号之后获取短信验证码，调用发送短信的接口，准备参数
				let option = {
					url: "",
					data: {
						phone: phone
					}
				}
				// 参数准备完，发送网络请求
				let res = await this.$http(option)
				console.log(res)
				// res可以拿到code验证码，到“请输入验证码”输入
				// 获取到的验证码在(res)里面,可以暂时存到缓存里面,之后再从缓存里面取出来和用户输入的验证码进行比较

				if (res.data.list.code != null) {
					let num = 60
					setInterval(() => {
						num--
						if (num < 0) {
							this.message = "获取验证码倒计时结束，若还没有收到请点击，重新获取验证码"
							this.isSend = false
							return
						}
						this.message = num + "秒之后重新获取"
					}, 1000)
				}
				this.isSend = true
				// res不为空的时候,存到缓存里面,之后再从缓存里面取出来和用户输入的验证码进行比较
				uni.setStorageSync("code", res.data.list.code)
				// 收到验证码的手机号存到缓存里,之后再从缓存里面取出来和最后要登录的手机号作比较
				uni.setStorageSync("phone", this.phone)
			},
			async get_resCode() {
				// 将获取到的验证码(res)与用户输入的验证码(userCode)作比较
				// 用户输入的验证码
				let code = this.userCode
				// 获取到的验证码(res)从缓存里面取出来
				let isCode = uni.getStorageSync("code")
				if (code != isCode) {
					// 有误给提示
					uni.showToast({
						title: "验证码有误"
					})
					// 有误不让执行登录
					return
				}
				// 除了判断code再判断一下手机号
				// 判断手机号,将收到验证码的手机号phone和最后要登录的手机号作比较

				// 最后用户要登录的手机号
				let phone = this.phone
				// 获取到验证码(res)的手机号从缓存里面取出来
				let isphone = uni.getStorageSync("phone")
				if (phone != isphone) {
					// 有误给提示
					uni.showToast({
						title: "手机号有误",
						icon: "none"
					})
					// 有误不让执行登录
					return
				}
				// 以上是在登录的时候加了2个判断,这两个判断只要符合一个都不能登录
				// 都不符合,执行登录
				// 执行登录有登录接口,要调登录接口
				let option = {
					url: "",
					// url地址是短信登录的接口
					method: "post",
					// http请求是post请求,牵扯到手机号
					// 传的参数是phone,传了个手机号进去
					data: {
						phone: this.phone
					}
				}
				// 准备完毕拿结果
				let res = await this.$http(option)
				console.log(res)
				// 将返回的参数分开存入缓存
				let userinfo = {}
				userinfo.avatarurl = res.data.list.avatarurl
				userinfo.nickname = res.data.list.nickname
				userinfo.phone = res.data.list.phone
				console.log(userinfo)
				let tokenuid = {}
				tokenuid.token = res.data.list.token
				tokenuid.uid = res.data.list.uid
				// 分开后存入缓存
				uni.setStorageSync("userinfo", userinfo)
				uni.setStorageSync("tokenuid", tokenuid)
				if (res.data.code == 200) {
					// 登录成功,就让跳转
					uni.switchTab({
						url: "../home/home"
					})
				}
			}
		}
	}
</script>

<style>
	.login_box {
		/* background: #377EB4; */
		width: 100vw;
		height: 100vh;
	}

	.login {
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.form {
		padding: 0 100upx;
		margin-top: 80px;
	}

	.login_phone,
	.login_code {
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}

	/* .login_code {
 		width: 100%;
 		height: 100%;
 		text-align: center;
 		font-size: 15px;
 	} */
	.login_btn {
		width: 100%;
		height: 80upx;
		background: skyblue;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.login_btn .btn_value {
		color: white;
	}
</style>
