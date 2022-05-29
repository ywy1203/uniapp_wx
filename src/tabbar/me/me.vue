<template>
	<view>

		<navbar ref="navbar"></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		me
		<toBeVip></toBeVip>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import tabbar from '../../../custom-tab-bar/index'
	import navbar from '../../components/nav-bar/nav-bar.vue';
	import toBeVip from '../../components/home-be-vip/home-be-vip.vue'
	export default {
		components: {
			toBeVip,
			navbar,
			tabbar
		},

		data() {
			return {
				showSkeleton: true,
				selected: 4,
				sysNotice_haveNew: 0

			}
		},

		methods: {


		},
		
		onShow: function() {
		
			bus.$emit('changeClosedFlag', false);
			bus.$emit('changeVipFlagToFalse', false);
			
			this.setTabBarIndex(4)
			this.$refs.navbar.getNoticeData()
		},
	}
</script>

<style>

</style>
