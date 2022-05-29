/*
 * @Description: 封装微信request请求模块
 * @Version: 2.0.0
 */


//请求域名
import {
	baseURL
} from '@/src/utils/const.js';

//获取验证头
// import {__buildAuthHeaders} from '@/src/utils/wxauth.js'

// request 封装header toeken
const headers = {};

//opts参数
const opts = {
	//请求loading
	loading: false
}

//根据运行环境标记,自动配置连接地址
let accountInfo = wx.getAccountInfoSync();
//版本信息
let envVersion = accountInfo.miniProgram.envVersion;

//develop：开发版 trial：体验版 release：正式版

//Request类
class Request {
	//构造
	constructor(params) {
		this.withBaseURL = params.withBaseURL
		this.baseURL = params.baseURL
	}
	//get请求
	get(url, data) {
		return this.request('GET', url, data)
	}
	//post请求
	post(url, data) {
		return this.request('POST', url, data)
	}
	//put请求
	put(url, data) {
		return this.request('PUT', url, data)
	}
	//发送请求
	request(method, url, data) {
		const vm = this
		// 封装请求头
		const newUrl = vm.withBaseURL ? vm.baseURL + url : url;
		const token = uni.getStorageSync('token');
		const userRole = uni.getStorageSync('role')
		token ? headers['token'] = token : '';
		userRole ? headers['userRole'] = userRole : '';
		headers['content-type'] = 'application/json'

		const _opts = {
			...opts,
			...data
		}
		// 判断loading 是否开启，如果没有，则开启
		if (_opts.loading) {
			uni.showLoading();
			delete data.loading;
		}

		//封装Promise调用
		return new Promise((resolve, reject) => {
			uni.request({
				url: newUrl,
				data,
				method,
				header: headers,
				success(res) {
					// if(res && res.__refresh_token__){
					// 	//token快要过期了 ,需要刷新token
					// 	uni.setStorageSync("token", res.__refresh_token__);
					// }
					const {
						data: {
							success,
							result,
							errMsg,
							errCode
						}
					} = res;
					//成功
					if (success) {
						resolve(result)
					} else {
						if (envVersion != 'release') {
							uni.showToast({
								title: `errCode: ${errCode},  ${errMsg}`,
								icon: 'none'
							})
						}
						reject({
							data,
							url: newUrl,
							msg: '操作失败'
						})
						if (errCode == '401') {
							uni.clearStorage()
						}
					}
				},
				fail(err) {
					if (envVersion != 'release') {
						uni.showToast({
							title: `请求失败: ${err || 'fail'}`,
							icon: 'none'
						})
					}
					reject({
						msg: '请求失败',
						url: newUrl,
						method,
						data,
						err
					})
				},
				complete(e) {
					const {
						statusCode
					} = e;
					//失败的情况
					if (statusCode !== 200) {
						let title = statusCode ? `请求失败: errorCode: ${statusCode}` : '请求失败: fail'
						if (envVersion != 'release') {
							uni.showToast({
								title,
								icon: 'none'
							})
						}
					}
					if (_opts.loading) {
						uni.hideLoading()
					}
				}
			})
		})
	}
}
//101.132.238.233:7001
const api = new Request({
	baseURL,
	withBaseURL: true
})

module.exports = api
