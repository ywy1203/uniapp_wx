// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
	
	//新用户{value: 1,name: 'new'},
	//一条腿用户{value: 2,name: 'user'},
	//会员{value: 3,ame: 'vip'}
	    
		roles: 1,
		
		vipFlag:false,
	}
})
export default store