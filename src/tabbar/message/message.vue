<template>
	<view>
		<navbar ></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		message
		<toBeVip></toBeVip>	
		<howToVip></howToVip>
		<tabbar :selected="1"></tabbar>
	</view>
</template>

<script>
	import tabbar from '../../../custom-tab-bar/index'
	import toBeVip from '../../components/home-be-vip/home-be-vip.vue'
	import navbar from '../../components/nav-bar/nav-bar.vue'
	import bus from '@/src/utils/bus.js'
	import howToVip from '../../components/how-to-vip/how-to-vip.vue';
	export default {
		components:{toBeVip,navbar,howToVip,tabbar},
	
		data() {
			return {
				
				
			}
		},
		
		  
		
		onShow() {
			bus.$emit('changeClosedFlag', false);
			bus.$emit('changeVipFlagToFalse', false);
			// console.log(this.getTabBar())
			// if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			//   this.getTabBar().setData({
			//     selected: 1  //这个数字是当前页面在tabBar中list数组的索引
			//   })
			// }
			this.setTabBarIndex(1)
			// 重新加载系统通知消息数量
			this.$refs.navbar.getNoticeData()
		},
		
		
		
		methods: {
		
			
		},
		// onShow: function () {
		//     if (typeof this.getTabBar === 'function' &&
		//         this.getTabBar()) {
		//         this.getTabBar().setData({
		//           selected: 1
		//         })
		//       }
		//   },
	}
</script>

<style>


</style>
