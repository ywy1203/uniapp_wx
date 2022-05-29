<template>
	<view class="page-bg">
		<navbar ref="navbar"></navbar>
		<!-- topbar背景 -->
		<view class="top-bar-bg-maoboli"><view class="top-bar-bg"></view></view>
		<!-- <view class="top-bar-bg"></view> -->
		<view class="bg-bottom ">
			<!-- 为了视频圆角下方是白色底，不添加，tabbar与bg之间有间隙 -->
			<view class="bg">
				<view>
					<swiper style="width:100%;height: 85vh;" :vertical="true" @animationfinish="animationfinish"
						:current="current" :indicator-dots="false">
						<swiper-item v-for="(list, index) in dataList">
							<view>
								<video v-if="Math.abs(k - index) <= 1" :id="list._id" :loop="true" :muted="list.isplay"
									:controls="false" :http-cache="true" :page-gesture="false"
									:show-fullscreen-btn="false" :show-loading="false" :show-center-play-btn="false"
									:enable-progress-gesture="false" :src="list.src" @ended="ended"
									:style="'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px; background-color: #000000;'"></video>
							</view>
							<!-- 播放状态：pause 的时候就会暂停 -->
							<view class="videoHover" @click="tapVideoHover(list.state, $event, index)"
								:style="'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px;'">
								<image v-if="list.state == 'pause' && list.flag == true" class="playState"
									src="@/static/play.png"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<toBeVip></toBeVip>
				<howToVip></howToVip>
			</view>
		</view>

		<tabbar :selected="0"></tabbar>
	</view>
</template>

<script>
	import navbar from '../../components/nav-bar/nav-bar.vue';
	import toBeVip from '../../components/home-be-vip/home-be-vip.vue';
	import howToVip from '../../components/how-to-vip/how-to-vip.vue';
	import tabbar from '../../../custom-tab-bar/index';
	import bus from '@/src/utils/bus.js';

	export default {
		components: {
			navbar,
			toBeVip,
			howToVip,
			tabbar
		},

		data() {
			return {
				showSkeleton: true,
				selected: 0,
				num: 1,
				windowWidth: 0,
				windowHeight: 0,
				platform: '',
				deleteHeight: 0,
				dataList: [],
				k: 0,
				oldVideo: '',
				voice: '',
				timeout: '',
				current: 0,
				boxStyle: {
					//视频，图片封面样式
					height: 0,
					width: 0
				},
				page: 0,
				sysNotice_haveNew: 0
			};
		},
		watch: {
			k(k, old_k) {
				console.log(k);
				this.dataList[old_k].playIng = false; //如果视频暂停，就加载封面
				this.dataList[old_k].isplay = true;
				this.dataList[old_k].state = 'pause';
				uni.createVideoContext(this.dataList[old_k]._id, this).play();
				clearTimeout(this.oldVideo);
				this.oldVideo = setTimeout(() => {
					uni.createVideoContext(this.dataList[old_k]._id, this).seek(0);
					uni.createVideoContext(this.dataList[old_k]._id, this).pause();
					console.log('预留第' + (old_k + 1) + '个视频：' + this.dataList[old_k]._id);
				}, 500);

				console.log('已经暂停 --> 第' + (old_k + 1) + '个视频～'); //提示
				this.dataList[k].state = 'play';
				uni.createVideoContext(this.dataList[k]._id, this).play();
				clearTimeout(this.voice);
				this.voice = setTimeout(() => {
					this.dataList[k].isplay = false;
				}, 300);
				setTimeout(() => {
					this.dataList[k].playIng = true;
				}, 850);
				var p = k;
				++p;
				setTimeout(() => {
					uni.createVideoContext(this.dataList[p]._id, this).play();
				}, 20);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					uni.createVideoContext(this.dataList[p]._id, this).seek(0);
					uni.createVideoContext(this.dataList[p]._id, this).pause();
					console.log('预加载第' + (p + 1) + '个视频：' + this.dataList[p]._id);
				}, 1800);
			}
		},
		onLoad() {
			this.platform = uni.getSystemInfoSync().platform;
			var model = uni.getSystemInfoSync().model;
			if (this.platform == 'ios' && (model !== 'iPhone6' || model !== 'iPhone6s' || model !== 'iPhone7' || model !==
					'iPhone8')) {
				this.deleteHeight = 0; //有 tabbar的 修改这里可以改变视频高度
			}
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.boxStyle.width = this.windowWidth + 'px'; //给宽度加px
			this.boxStyle.height = this.windowHeight - this.deleteHeight; //有 tabbar的 修改这里可以改变视频高度
			this.get(); //刚进入页面加载数据
		},
		onHide() {
			this.dataList[this.k].state = 'pause'; //界面隐藏也要停止播放视频
			uni.createVideoContext(this.dataList[this.k]._id, this).pause(); //暂停以后继续播放
		},
		onShow() {
			this.$store.state.roles = uni.getStorageSync('userType');
			bus.$emit('changeClosedFlag', false);
			bus.$emit('changeVipFlagToFalse', false);
			this.setTabBarIndex(0);
			if (this.dataList.length !== 0) {
				this.dataList[this.k].state = 'play';
				uni.createVideoContext(this.dataList[this.k]._id, this).play();
			}
			// 重新加载系统通知消息数量
			this.$refs.navbar.getNoticeData()
			// // 判断系统通知是否有新消息
			// v2_notify_get({
			// 	type: 5,
			// 	page: ++this.page
			// }).then(res=>{
			// 	// console.log('notify:', res)
			// 	this.sysNotice_haveNew = res.data.length
			// 	getApp().globalData.sysNotice_haveNew = res.data.length
			// 	// console.log('haveNew:',getApp().globalData.sysNotice_haveNew)
			// })
		},

		methods: {
			ended() {
				// 1.播放当前视频结束时触发，自动切换下一个视频
				this.current = this.k + 1;
				this.dataList[k].state = 'play';
			},
			//点击播放&&暂停
			tapVideoHover(state, event, index) {
				this.dataList[index].flag = true;
				console.log('state--', state);
				if (state == 'play' || state == 'continue') {
					this.dataList[this.k].state = 'pause';
				} else {
					this.dataList[this.k].state = 'continue';
				}
				if (this.dataList[this.k].state == 'continue') {
					uni.createVideoContext(this.dataList[this.k]._id, this).play(); //暂停以后继续播放
				}
				if (this.dataList[this.k].state == 'pause') {
					uni.createVideoContext(this.dataList[this.k]._id, this).pause(); //暂停以后继续播放
				}
			},
			animationfinish(event) {
				this.k = event.detail.current;
				this.current = this.k;
				// 1.这里进行判断，如果是最后一个视频就进入 get() 方法加载视频进入列表
				if (this.k == this.dataList.length - 1) {
					this.GET();
				}
			},
			//每一组结束时新的请求
			GET() {
				uni.request({
					url: 'https://bdb24c6d-8c19-4f80-8e7e-c9c9f037f131.bspapp.com/video',
					method: 'POST',
					data: {
						info: 'get_video'
					},
					success: res => {
						var msg = res.data.data;
						// 2.这里把视频添加到视频列表
						for (let i = 0; i < msg.length; i++) {
							this.dataList.push(msg[i]);
							this.dataList.forEach(item => {
								item.flag = false;
							});
						}
					}
				});
			},
			get() {
				// 1.这里引入后端请求数据
				// var msg = userList
				uni.request({
					url: 'https://bdb24c6d-8c19-4f80-8e7e-c9c9f037f131.bspapp.com/video',
					method: 'POST',
					data: {
						info: 'get_video'
					},
					success: res => {
						var msg = res.data.data;
						// 2.这里把视频添加到视频列表
						for (let i = 0; i < msg.length; i++) {
							this.dataList.push(msg[i]);
						}
						// 3.播放当前视频
						setTimeout(() => {
							this.dataList[this.k].isplay = false;
							this.dataList[this.k].state = 'play';
							uni.createVideoContext(this.dataList[this.k]._id, this).play();
							this.dataList[this.k].playIng = true;
						}, 200);
						// start - 预加载开始
						var p = this.k;
						++p;
						setTimeout(() => {
							uni.createVideoContext(this.dataList[p]._id, this).play();
						}, 20);
						clearTimeout(this.timeout);
						this.timeout = setTimeout(() => {
							uni.createVideoContext(this.dataList[p]._id, this).seek(0);
							uni.createVideoContext(this.dataList[p]._id, this).pause();
							console.log('预加载第' + (p + 1) + '个视频：' + this.dataList[p]._id);
						}, 1500);
						// end - 预加载结束
					}
				});
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-bg {
		width: 100vw;
		height: 100vh;
		background-color: #4992d6;
		z-index: -99999;
	}



	.bg {
		background-color: #eaeaea;
		height: 85vh;
		width: 97.8vw;
		border-bottom-left-radius: 6vw;
		border-bottom-right-radius: 6vw;
		margin: 0 auto;
		overflow: hidden;
	}

	.bg-bottom {
		background-color: #ffffff;
		position: fixed;
		bottom: 3vh;
		height: 96vh;
		width: 97.8vw;
		margin: 0.4vh 1.1vw;
	}

	.playState {
		display: block;
		margin: 400rpx auto;
		width: 160rpx;
		height: 160rpx;
		opacity: 0.5;
	}

	.videoHover {
		position: absolute;
		top: 0;
		left: 0;
		flex: 1;
	}
</style>
