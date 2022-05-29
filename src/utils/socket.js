import Vue from 'vue';
import {
	baseURL
} from '@/utils/const.js';
import {
	EventBus
} from '@/utils/bus.js';

import io from '@hyoga/uni-socket.io'; //node_modules
const socket = io('baseURL', {
  transports: [ 'websocket']  
});



import {
	baseURL
} from '@/utils/const.js';
import {
	EventBus
} from '@/utils/bus.js';


//interval值
let interval = null;
//初始化标记
let inited = false;


//导出对象
export default function socketConn(){
	// const userid = uni.getStorageSync('userid');
	// const token = uni.getStorageSync('token');
	// console.log(token);
	// if (!userid && !token) {
	// 	return;
	// }
	// if(inited){
	// 	return;
	// }
	// const url = baseURL;
	
	// //初始化socket对象
	// let socket = io(url, {
	// 	forceNew: true,
	// 	reconnection: true, 
	// 	reconnectionDelay: 1000, 
	// 	reconnectionDelayMax: 2000, 
	// 	timeout: 20000,
	// 	autoConnect: true,
	// 	query: {
	// 		userId: userid,
	// 		token: token,
	// 	},
	// })
	
	// //connent事件
	// socket.on('connect', () => {
	// 	console.log('connection created.')
	// });
	
	// //断开事件
	// socket.on('disconnect', () => {
	// 	console.log('disconnect')
	// });
    
	// //new事件
	// socket.on('new', (data) => {
	// 	EventBus.$emit('new', data);
	// });

 //    //挂载到vue原型实例
	// Vue.prototype.$socket = socket;
	// //标记已经init,二次执行跳过init
	// inited = true;
}
