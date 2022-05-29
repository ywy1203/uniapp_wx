// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
import vuex from '../../src/store/index.js';
Vue.use(Router)
//初始化
const router = new Router({
    routes: [...modules]//路由表
});

//全局路由前置守卫

router.beforeEach((to, from, next) => {
	
	
	console.log(123123123+"asdasdasd")
	// if(vuex.state.roles == 1){
		
		
	// 	if(to.name == 'hotlist' || to.name == 'systemNotice' ){
			
	// 		next({name:'home'})
	// 	}else if(to.name == 'schoolMoments' ||to.name == 'homePage'){
		
	// 		 next({name:from.name})
			 
	// 	}
	// 	else{
	// 		next()
	// 	}
		next()
		
	// }else{
	// 	next()
	// }
	
	
		// next()
	

  
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;