<template>
	<view>
		
		<navbar ref="navbar"></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		school
		<howToVip></howToVip>
		<tabbar></tabbar>
		
	</view>
</template>

<script>
    import tabbar from '../../../custom-tab-bar/index'
	import navbar from '../../components/nav-bar/nav-bar.vue';
	import howToVip from '../../components/how-to-vip/how-to-vip.vue';
	import bus from '@/src/utils/bus.js';
	export default {
		components: { navbar,tabbar,howToVip },
	
		data() {
			return {
				showSkeleton:true,
				 selected: 2
			}
		},
		onShow() {
			bus.$emit('changeClosedFlag', false);
			bus.$emit('changeVipFlagToFalse', false);
			// 重新加载系统通知消息数量
			this.$refs.navbar.getNoticeData()
			
			
			this.setTabBarIndex(2)
		},
		  
		methods: {
		
			
		},
	
	}
</script>

<style>

</style>
