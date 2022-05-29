/*
 * @Description: 全局常量模块
 * @Version: 2.0.0
 */

// 发布新版本需要清除缓存时修改原来的值11
// export const clearStorageVersionId = "v190";

// 评论card分页参数
// export const defaultParams = {
// 	pageSize: 4,
// 	currentPage: 1,
// 	finished: false,
// 	loading: false
// };

// 个人主页默认选中项目
export const tabListDefault = 3;

// 个人主页tabs
// export const tabs = function(){
// return {
// 	//人才
// 	talents: [{
// 			title: 'TA的主页',
// 			url: '/person-pages/user',
// 			value: 1,
// 			check: true
// 		},
// 		{
// 			title: 'TA的简历',
// 			url: '/person-pages/default-resume',
// 			value: 2,
// 			check: false
// 		},
// 		{
// 			title: '点亮技能',
// 			url: '/person-pages/skill-light',
// 			value: 3,
// 			check: false
// 		}
// 	],
// 	//招聘者
// 	recruiter: [{
// 			title: 'TA的主页',
// 			url: '/person-pages/user',
// 			value: 1,
// 			check: true
// 		},
// 		{
// 			title: '点亮技能',
// 			url: '/person-pages/skill-light',
// 			value: 2,
// 			check: false
// 		},
// 		{
// 			title: '招聘职位',
// 			url: '/person-pages/nav-postJob',
// 			value: 3,
// 			check: false
// 		}
// 	]
// };
// }

// // 企业主页
// export const companyHomePageTabs = function(){
// 	return {
// 		    recruiter: [{
// 					title: '企业主页',
// 					url: '/person-pages/user',
// 					value: 1,
// 					check: true
// 				},
// 				{
// 					title: '视频介绍',
// 					url: '/person-pages/video-info',
// 					value: 2,
// 					check: false
// 				},
// 				{
// 					title: '图文介绍',
// 					url: '/person-pages/default-resume',
// 					value: 3,
// 					check: false
// 				},
// 				{
// 					title: '点亮技能',
// 					url: '/person-pages/skill-light',
// 					value: 4,
// 					check: false
// 				},
// 				{
// 					title: '招聘职位',
// 					url: '/person-pages/nav-postJob',
// 					value: 5,
// 					check: false
// 				}
// 			]
// 	}
// }

// 角色背景色默认设置
// export const roleColors = {
// 	talents: '3,68,98',
// 	recruiter: '3,68,98'
// };

// 角色默认值
export const roles = [
	//人才  
	// {
	// 	value: 1,
	// 	name: 'talents'
	// },
	//hr
	// {
	// 	value: 2,
	// 	name: 'recruiter'
	// },
	//新用户
	{
		value: 1,
		name: 'new'
	},
	//一条腿用户
	{
		value: 2,
		name: 'user'
	},
	//会员
	{
		value: 3,
		name: 'vip'
	}
	
];

//首页访问模式
// export const modelList = {
// 	//沉浸式
// 	swiper: {
// 		title: '列表模式',
// 		model: 'swiper'
// 	},
// 	//图文列表
// 	list: {
// 		title: '跳转视频模式',
// 		model: 'list'
// 	}
// };


//接口请求的域名
//测试环境
//const baseURL_DEV = 'http://127.0.0.1:7001/';
//const baseURL_DEV = 'http://testapp.chinardr.net:21180/';
//const baseURL_DEV = 'https://wxapp.chinardr.net/';
const baseURL_DEV = 'http://cookbook.xuminjie.top:8000/';
//体验环境
//const baseURL_TRI = 'http://192.168.1.211/';
//const baseURL_TRI = 'https://wxapp.chinardr.net/';
const baseURL_TRI = 'https://wxapp.chinardr.net:50443/';
//正式环境
const baseURL_REL = 'https://wxapp.chinardr.net/';

let _baseURL = "";
try{
	//根据运行环境标记,自动配置连接地址
	let accountInfo = wx.getAccountInfoSync();
	//版本信息
	let envVersion = accountInfo.miniProgram.envVersion;

	//develop：开发版 trial：体验版 release：正式版
	// 发版审核时envVersion值为develop，发版时注意更改
  console.log("envVersion:"+envVersion)
	if(envVersion == "develop"){
		//测试版地址
		_baseURL = baseURL_DEV;
	}
  else if(envVersion == "trial"){
  	//体验版地址
  	_baseURL = baseURL_TRI;
  }
	else{
		_baseURL = baseURL_REL;
	}
}
catch(ex){
    _baseURL = baseURL_REL;
}
export const baseURL = _baseURL;
