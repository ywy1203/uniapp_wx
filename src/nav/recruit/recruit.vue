<template>
	<view>
		<navbar :nav_btn="nav_btn"></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		
		<view class="">
			公益招聘
		</view>
		<toBeVip></toBeVip>	
		<tabbar></tabbar>
		<howToVip></howToVip>
	</view>
</template>

<script>
	import navbar from '../../components/nav-bar/nav-bar.vue'
	import tabbar from '../../../custom-tab-bar/index'
	import toBeVip from '../../components/home-be-vip/home-be-vip.vue'
	import howToVip from '../../components/how-to-vip/how-to-vip.vue';
	export default {
		components: {
			navbar,
			tabbar,
			toBeVip,
			howToVip
		},
		data() {
			return {
				nav_btn: "recruit",
				// selected: 0
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
