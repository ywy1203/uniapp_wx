import api from '@/src/api/'
/*
 * 获取消息列表
 * params object params {id}
 *
 */
export const v2_notify_get = (params = {}) => {
  return api.post('v2/notify/get',params)
}

// 认证操作
export const v2_auth2_doAuth = (params = {}) => {
	return api.post('v2/auth2/doAuth', params)
}

// 获取好友列表
export const v2_auth2_friendsList = (params = {}) => {
	return api.post('v2/auth2/friendsList', params)
}

// 转发认证
export const v2_auth2_transferAuth = (params = {}) => {
	return api.post('v2/auth2/transferAuth', params)
}
// 
// export const applet_notify_getLast = () => {
//   return api.post('applet/notify/getLast')
// }
/*
 * 删除消息
 * params object params {notifyId}
 *
 */
// export const applet_notify_del = (params = {}) => {
//   return api.post('applet/notify/del', params)
// }