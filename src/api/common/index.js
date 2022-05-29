/*
 * @Description: 公共模块后端api接口
 * @Version: 2.0.0
 */

import api from '@/api/'

/*
* 视频类型列表
*/
export const get_video_type_list = (params) => {
	return api.post('applet/video/getVideoTypeListByUserId', params)
}

/*
* 检测用户名是否存在
*/
export const applet_wxAuth_userNameCheck = (params) => {
	return api.post('applet/wxAuth/userNameCheck',params)
}