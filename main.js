

Vue.config.productionTip = false

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$store = store
import './src/common/common.css'
import store from './src/store'
// 设置为全局函数
// import {__buildAuthHeaders} from '@/src/utils/wxauth.js'
// Vue.prototype.$__buildAuthHeaders = __buildAuthHeaders
//全局过滤器
import * as filtters from '@/src/utils/filtters.js';

Vue.mixin({
	//全局方法用于自定义tabbar 切换选中状态
	methods:{
	        setTabBarIndex(index) {
	            if (typeof this.$mp.page.getTabBar === 'function' &&
	            this.$mp.page.getTabBar()) {
	                this.$mp.page.getTabBar().setData({
	                    selected: index
	                })
	            }
	        }
	    }
})

//全局过滤器
Object.keys(filtters).forEach(key => {
	Vue.filter(key, filtters[key])
});

// import router from '@/src/router'

// import Router, {RouterMount} from 'uni-simple-router';
// Vue.use(router)



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
	  
    app
  }
}




// #endif


