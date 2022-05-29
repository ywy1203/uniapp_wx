const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/src/tabbar/home/home',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'home',
        meta: {
	        title: '首页',
	    },
    },
    {
	    path: '/src/tabbar/homePage/homePage',
        name: 'homePage',
        meta: {
	        title: '列表',
	   
		},
	},
	{
	    path: '/src/tabbar/message/message',
	    name: 'message',
	    meta: {
	        title: '消息',
	   
		},
	},
	{
	    path: '/src/tabbar/schoolMoments/schoolMoments',
	    name: 'schoolMoments',
	    meta: {
	        title: '校友圈',
	   
		},
	},
	{
	    path: '/src/tabbar/me/me',
	    name: 'me',
	    meta: {
	        title: '我的',
	   
		},
	},
	{
	    path: '/src/pages/start/start',
	    name: 'start',
		 aliasPath:'/', 
	    meta: {
	        title: '欢迎',
	    },
	},
	{
	    path: '/src/pages/share/share',
	    name: 'share',
		
	    meta: {
	        title: '分享',
	    },
	},
	{
	    path: '/src/nav/hotlist/hotlist',
	    name: 'hotlist',
		
	    meta: {
	        title: '热榜',
	    },
	},
	{
	    path: '/src/nav/live/live',
	    name: 'live',
		
	    meta: {
	        title: '直播',
	    },
	},
	{
	    path: '/src/nav/recruit/recruit',
	    name: 'recruit',
		
	    meta: {
	        title: '公益招聘',
	    },
	},
	
	{
	    path: '/src/nav/search/search',
	    name: 'search',
		
	    meta: {
	        title: '搜索',
	    },
	},
	{
	    path: '/src/nav/systemNotice/systemNotice',
	    name: 'systemNotice',
		
	    meta: {
	        title: '系统消息',
	    },
	}
	
	
]
export default home