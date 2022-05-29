<script>
	
export default {
	
	onLaunch: function() {
		
		console.log('App Launch');
	},
	onShow: function() {
	
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
		
	},
	globalData: {
		sysNotice_haveNew: 0,  // 系统通知的新消息数量
		messageNum: '' // 消息数量
	}
};
</script>

<style>
/*每个页面公共css */
</style>
