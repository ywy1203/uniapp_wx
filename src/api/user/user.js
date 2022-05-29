/*
 * @Description: 用户模块后端api接口
 * @Version: 2.0.0
 */


// user 模块
import api from '@/api/'


/*
* 判断是否是人大人官方账号
* params object params
*
*/
export const check_user_isOfficalUser = (params) => {
	return api.post('applet/isOfficial/user', params)
}

// 授权登录

/*
* 授权登录
* params object params
*
*/
export const applet_auth_code2Session = (params) => {
	return api.post('applet/auth/code2Session', params)
}

/*
*  提交用户userInfo 给后台
* params object params
*
*/
export const applet_user_addbaseinfo = (params) => {
	return api.post('applet/user/addbaseinfo', params)
}



/*
* 关注/取消关注
* params object params {followid}
*
*/
export const applet_follow_toggleFollow = (params) => {
	return api.post('applet/follow/toggleFollow', params)
}



/*
* 意向信息提交
* params object params
*
*/
export const post_systemRecommendSetting_submitIntentionInfo = (params) => {
    return api.post('applet/systemRecommendSetting/submitIntentionInfo',params)
}


/*
* 职位等级提交
* params object params
*
*/
export const post_systemRecommendSetting_submitGrade = (params) => {
    return api.post('applet/systemRecommendSetting/submitGrade', params)
}



/*
* 获取填写的推荐设置信息
* params object params
*
*/
export const get_systemRecommendSetting_doubleList = () => {
    return api.post('applet/systemRecommendSetting/doubleList', {})
}


/*
* 查询关注用户列表
* params object params
*
*/
export const get_follow_followedUseridList = () => {
    return api.post('applet/follow/followedUseridList', {})
}


/*
* 我的主页视频列表
* params object params
*
*/
export const get_my_videoList = (params = {}) => {
    return api.post('applet/my/getVideoListByMyPage', params)
}



/*
* 他的主页视频列表
* params object params
*
*/
export const get_person_videoList = (params = {}) => {
    return api.post('applet/person/getVideoListByPersonPage', params)
}



/*
* 获取个人主页tabbar
* params object params
*
*/
export const get_my_topBarList = (params = {}) => {
    return api.post('applet/my/topBarList', params)
}


// /*
// * 个人作品视频列表
// * params object params
// *
// */
// export const get_person_videoList = (params = {}) => {
// 	return api.post('applet/person/videoList', params)
// }


/*
* 上传个人简历
* params object params
*
*/
export const get_resume_upload = (params = {}) => {
	return api.post('applet/resume/upload', params)
}


/*
* 上传个人简历
* params object params
*
*/
export const get_resume_upload2 = (params = {}) => {
	return api.post('applet/resume/upload2', params)
}


/*
* 获取他人的个人信息
* params object params
*
*/
export const get_person_personInfo= (params = {}) => {
	return api.post('applet/person/personInfo', params)
}


/*
* 获取自己的个人信息
* params object params
*
*/
 export const get_my_centre= (params = {}) => {
 	return api.post('applet/my/centre', params)
 }


/*
* 获取用户手机号
* params object params
*
*/
 export const get_wxAuth_getPhoneNumber= (params = {}) => {
 	return api.post('applet/wxAuth/getPhoneNumber', params)
 }



 /*
 * 保存我的求职信息
 * params object params
 *
 */
 export const post_my_saveJobSeekInfo = (params) => {
     return api.post('applet/my/saveJobSeekInfo', params);
 }



 /*
 * 获取我的求职信息
 * params object params
 *
 */
 export const post_my_getJobSeekInfo = (params) => {
     return api.post('applet/my/getJobSeekInfo', params);
 }


 // /*
 // * 获取关联职位信息
 // * params object params
 // *
 // */
 // export const post_my_getJobLink = (params) => {
 //     return api.post('applet/job/intentionPositionList', params);
 // }



 /*
 * 获取用户简历
 * params object params
 *
 */
 export const applet_resume_getUserResume = (params) => {
     return api.post('applet/resume/getUserResume', params);
 }


 /*
 * 更新用户简历
 * params object params
 *
 */
 export const applet_resume_updateUserResume = (params) => {
     return api.post('applet/resume/updateUserResume', params);
 }


 /*
 * 提交简历
 * params object params
 *
 */
 export const applet_resume_submitResume = (params) => {
     return api.post('applet/resume/submitResume', params);
 }


 /*
 * 删除历史搜索关键词
 * params object params
 *
 */
 export const applet_resume_submitResume2 = (params) => {
     return api.post('applet/resume/submitResume2', params);
 }

 /*
 * 获取用户简历列表
 * params object params
 *
 */
 export const applet_resume_List = (params) => {
     return api.post('applet/resume/List', params);
 }

 /*
 * 修改简历名称
 * params object params
 *
 */
 export const applet_resume_updateName = (params) => {
     return api.post('applet/resume/updateName', params);
 }

      /*
 * 设置默认简历
 * params object params
 *
 */
  export const applet_resume_setDefault = (params) => {
    return api.post('applet/resume/setDefault', params);
}

      /*
 * 修改传统简历隐私
 * params object params
 *
 */
export const applet_resume_setPerm = (params) => {
	return api.post('applet/resume/setPerm', params);
}

/*
* 修改视频简历隐私
* params object params
*
*/
export const applet_video_setPerm = (params) => {
    return api.post('applet/video/setPerm', params);
}

      /*
 * 获取我的简历视频列表
 * params object params
 *
 */
      export const applet_resume_videoResumeList = (params) => {
        return api.post('applet/resume/videoResumeList', params);
    }

 /*
 * 删除简历
 * params object params
 *
 */
 export const applet_resume_delete = (params) => {
     return api.post('applet/resume/delete', params);
 }

 /*
 * 获取一个Hr用户已经加入的企业列表
 * params object params
 *
 */
 export const applet_enterprise_getEnterpriseListByHrJoined = (params) => {
     return api.post('applet/enterprise/getEnterpriseListByHrJoined', params);
 }


 /*
 * 转换身份
 * params object params
 *
 */
 export const applet_my_changeUserRole = (params) => {
     return api.post('applet/my/changeUserRole', params);
 }


 /*
 * 根据字符串查询企业列表
 * params object params {personid}
 *
 */
 export const applet_enterprise_searchEnterprise = (params) => {
     return api.post('applet/enterprise/searchEnterprise', params);
 }


 /*
 * 切换企业招聘者
 * params object params {enterpriseId}
 *
 */
 export const applet_enterprise_switchToEnterprise = (params) => {
     return api.post('applet/enterprise/switchToEnterprise', params);
 }



 /*
 * 合伙人认证
 * params object params
 *
 */
 export const applet_partner_createPartner = (params) =>{
	 return api.post('applet/partner/createPartner',params)
 }


 /*
 * 更新头像
 * params object params
 *
 */
 export const applet_wxAuth_updateUserAvatar = (params) =>{
 	 return api.post('applet/wxAuth/updateUserAvatar',params)
 }


/*
* 反馈提交
* params object params
*
*/
export const applet_feedback_add = (params) => {
    return api.post('applet/feedback/add',params)
}

//保存个人名片信息
export const applet_card_saveCardInfo = (params) =>{
    return api.post('applet/card/saveCardInfo', params)
}

//获取个人名片信息
export const applet_card_getCardInfo = (params)=>{
    return api.post('applet/card/getCardInfo', params);
}

//获取直播列表
export const getLiveRoom = (params)=>{
    return api.post('applet/wxAuth/getLiveRoomList', params);
}
