<template>
	<view class="hotview">
		<navbar :nav_btn="nav_btn"></navbar>
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		<scroll-view class="scrollView">
			<hotlistComponent v-for="(item,index) in list" :list="item" :index="index"></hotlistComponent>
		</scroll-view>
		
		<toBeVip></toBeVip>	
		<tabbar></tabbar>
		<howToVip></howToVip>
	</view>
</template>

<script>
	import navbar from '../../components/nav-bar/nav-bar.vue'
	import tabbar from '../../../custom-tab-bar/index'
	import toBeVip from '../../components/home-be-vip/home-be-vip.vue'
	import howToVip from '../../components/how-to-vip/how-to-vip.vue'
    import hotlistComponent from './hotlist-component.vue'
	export default {
		// name:'hotlist',
		components: {
			navbar,
			tabbar,
			toBeVip,
			howToVip,
			hotlistComponent,
		},
		data() {
			return {
				nav_btn: "hotlist",
				// selected: 0
				scrollTop:0,
				scrollHeight:null,
				list: [
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'项目'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",like2:3198,like3:408.5,class:'视频'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",like2:3198,like3:408.5,class:'职场'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",like2:3198,like3:408.5,class:'找工作'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
					{name:"王建国",company:"汉中市职发沙龙-搭建高效职发沙龙沙龙",id:"HZLH-DL-2022-003",location:"陕西，汉中",like2:3198,like3:408.5,class:'留言板'},
				]
			}
		},
		methods: {

		},
	}
</script>

<style scoped>
	navbar{
		height:8.3vh;
		margin-bottom: 2vh;
	}
	.hotview{
		display: flex;
		flex-direction: column;
	}
	tabbar{
		height:12vh;
	}
	.scrollView{
		flex:1;
	}
</style>
