
import {baseURL} from '@/src/utils/const';
/*
 * token验证头
 * params null
 */
export function __buildAuthHeaders() {
	let headers = {};
	// let token = 'Bearer ' + uni.getStorageSync("token");
	// headers['authorization'] = token;
	let token = uni.getStorageSync("token");
	//后端验证使用
	headers['token'] = token;
	return headers;
}

export function getinvitorInfo() {
					return new Promise((resolve, reject) => {
						//拼接token header
					    let headers = __buildAuthHeaders();
						// let token = uni.getStorageSync('token');
						// const postdata = { token };
						wx.request({
							url: baseURL + 'v2/auth2/invitorInfo',
							method: 'post',
							header: headers,
							// data: postdata ,
							success: function(res) {
								//成功标记
								
								if (res.data.success) {
									resolve(res.data.result);
								} else {
									reject(null);
								}
							}
						});
					});
				}


//向邀请推荐人认证
export function giveInvitorInfo() {
					return new Promise((resolve, reject) => {
						//拼接token header
					    let headers = __buildAuthHeaders();
						let token = uni.getStorageSync('token');
						const postdata = { token };
						wx.request({
							url: baseURL + 'v2/auth2/invitorAuth',
							method: 'post',
							header: headers,
							data: postdata ,
							success: function(res) {
								//成功标记
								if (res.data.success) {
									resolve(res.data.result);
								} else {
									reject(null);
								}
							}
						});
					});
				}
		
// export default {
// 	__buildAuthHeaders
// };


		
		