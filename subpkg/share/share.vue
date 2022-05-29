<template>

	<view>
		<!-- <view class="absolute-center">
			123
		</view> -->
		<view class="mp-share-page">
		  <view class="content-box" v-if="!isSavingPage">
		    <view class="top-box">
		      <text class="welcome-text" :style="{'font-size':`${25*deviceInfo.scale}px`}">
		        {{pageInfo.welcomeText}}
		      </text>
		    </view>
		
		    <view class="middle-box">
		      <!-- 二维码 -->
		      <uqrcode mode="view" :text="pageInfo.qrcode.url" :margin="pageInfo.qrcode.margin" :size="pageInfo.qrcode.size"
		        :style="{'width': `${pageInfo.qrcode.size}px`, 'height': `${pageInfo.qrcode.size}px`}" />
		      <!-- 会员ID -->
		      <text class="member-id" :style="{'font-size':`${14*deviceInfo.scale}px`}">{{pageInfo.memberId}}</text>
		    </view>
		
		    <view class="bottom-box">
		      <button class="my-button" @click="savePage">保存此页</button>
		      <button class="my-button" @click="accessMP">进入程序</button>
		    </view>
		  </view>
		
		  <canvas canvas-id="pageImageForShare" v-if="isSavingPage"
		    :style="{'width': `${deviceInfo.width}px`, 'height': `${deviceInfo.height}px`}" />
		</view>
	</view>

  

</template>

<script>
  import uQRCode from '@/uni_modules/Sansnn-uQRCode/components/uqrcode/common/uqrcode.js'

  export default {
    methods: {

      accessMP() {
        wx.switchTab({
          url: '../../src/tabbar/home/home'
        })
      },

      savePage() {
        wx.showLoading({
          title: '保存中',
          mask: true
        })

        // 绘制要保存的页
        this.drawPageImageForShare()
      },

      // 绘制保存此页按钮用到的图
      drawPageImageForShare() {
        this.isSavingPage = true

        let topX, topY
        const {
          width,
          height,
          scale
        } = this.deviceInfo
        const {
          welcomeText,
          memberId
        } = this.pageInfo
        const {
          url,
          margin,
          size,
          backgroundColor,
          foregroundColor
        } = this.pageInfo.qrcode

        let ctx = wx.createCanvasContext('pageImageForShare', this)
        let modules = uQRCode.getModules({
          text: url,
          errorCorrectLevel: uQRCode.errorCorrectLevel.H
        })
        let tileSize = (size - margin * 2) / modules.length

        // 绘制背景
        ctx.beginPath()
        ctx.drawImage('../../../static/shareImageBackground.png', 0, 0, width, height)

        // 欢迎文字
        ctx.beginPath()
        ctx.font = '1px 幼圆'
        ctx.setFontSize(25 * scale)
        ctx.fillStyle = 'blue'
        ctx.setTextAlign('center')
        topX = width / 2
        topY = height / 2 - size / 2 - 40 * scale
        ctx.fillText(welcomeText, topX, topY)

        // 二维码
        ctx.beginPath()
        ctx.setFillStyle(backgroundColor)
        topX = width / 2 - size / 2
        topY = height / 2 - size / 2
        ctx.fillRect(topX, topY, size, size)

        for (var row = 0; row < modules.length; row++) {
          for (var col = 0; col < modules.length; col++) {
            // (width / 2 - size / 2)起居中定位作用
            var x = col * tileSize + margin + (width / 2 - size / 2)
            var y = row * tileSize + margin + (height / 2 - size / 2)
            var w = tileSize
            var h = tileSize
            var style = modules[row][col] ? foregroundColor : backgroundColor

            ctx.setFillStyle(style)
            ctx.fillRect(x, y, w, h)
          }
        }

        // 会员ID 
        ctx.beginPath()
        ctx.font = '1px 幼圆'
        ctx.setFontSize(14 * scale)
        ctx.fillStyle = 'gray'
        ctx.setTextAlign('center')
        topX = width / 2
        topY = height / 2 + size / 2 + 40 * scale
        ctx.fillText(memberId, topX, topY)

        // 绘制并保存
        ctx.draw()
        this.savePageImage()
      },

      savePageImage() {
        const _this = this

        // 等待canvas生成后再保存，$nextTick无效
        setTimeout(() => {
          // 将canvas转换为临时路径
          wx.canvasToTempFilePath({
            canvasId: 'pageImageForShare',
            // 转换成功回调
            success: (res) => {
              wx.showLoading({
                title: '保存中',
                mask: true
              })

              // 保存到相册
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                // 保存成功回调
                success: () => {
                  wx.showToast({
                    title: '保存成功',
                    mask: true
                  })

                  _this.isSavingPage = false
                  wx.hideLoading()
                },
                // 保存失败回调
                fail: (res) => {
                  if (res.errMsg && (res.errMsg.indexOf("auth deny") !== -1)) {
                    _this.isSavingPage = false
                    wx.hideLoading()

                    wx.showToast({
                      title: '小程序未取得相册权限，请到小程序设置中授权。',
                      mask: true,
                      icon: 'none',
                      duration: 5000
                    })
                  } else {
                    wx.showToast({
                      title: '未知错误',
                      mask: true,
                      icon: 'error'
                    })

                    _this.isSavingPage = false
                    wx.hideLoading()
                  }
                }
              })
            },
            // 转换错误回调
            fail: () => {
              wx.showToast({
                title: '未知错误',
                mask: true,
                icon: 'error'
              })

              _this.isSavingPage = false
              wx.hideLoading()
            },
          })
        }, 500)
      },


      init() {
        // 初始化手机信息
        if (wx.getSystemInfoSync().safeArea.width !== 375) {
          this.deviceInfoInit()
        }
        // 初始化页面信息
        this.pageInfoInit()
      },

      deviceInfoInit() {
        const myDevice = wx.getSystemInfoSync()
        const standardDevice = this.deviceInfo

        standardDevice.scale = (myDevice.windowHeight / standardDevice.height).toFixed(6)
        standardDevice.width = myDevice.windowWidth
        standardDevice.height = myDevice.windowHeight
        standardDevice.dpr = myDevice.pixelRatio
      },

      pageInfoInit() {
        const page = this.pageInfo
        page.welcomeText = '恭喜您成为正式会员!'
        // TODO:获取会员id
        // let res = await uni.$http.get('')
        // if(res.code===200) page.memberId=res.data
        page.memberId = 'YZ00000001'

        // 初始化二维码信息
        const qr = this.pageInfo.qrcode
        qr.size *= this.deviceInfo.scale
        qr.margin *= this.deviceInfo.scale
        qr.url += page.memberId
      },
    },
    data() {
      return {
        isSavingPage: false,

        pageInfo: {
          welcomeText: '',
          memberId: '',
          qrcode: {
            // 个人主页的url，与会员ID拼接后生成二维码
            url: 'https://www.baidu.com/s?wd=',
            // 设计图中二维码大小（px）
            size: 166,
            // 二维码白边(px)
            margin: 5,
            backgroundColor: '#ffffff',
            foregroundColor: '#000000',
          },
        },

        deviceInfo: {
          width: 375,
          height: 667,
          dpr: 2,
          scale: 1,
        }
      }
    },
    onReady() {
      this.init()
    },
  }
</script>

<style lang="scss" scoped>
  .mp-share-page {
    height: 100vh;
    width: 100vw;
    // TODO:背景图片
    background-image: linear-gradient(blue, red);
    position: relative;
    text-align: center;

    .content-box {
      height: 50%;
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top-box {
        .welcome-text {
          // TODO:欢迎字体颜色、大小、粗细
          color: rgb(138, 215, 252);
          font-weight: 800;
        }
      }

      .middle-box {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .member-id {
          width: 100%;
          // TODO:会员ID与二维码间距，ID的颜色、字体
          margin-top: 10rpx;
          color: rgb(136, 155, 170);
        }
      }

      .bottom-box {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;

        .my-button {
          border-radius: 999px;
          // TODO:按钮样式
          width: 249rpx;
          height: 80rpx;
          font-size: 30rpx;
          line-height: 80rpx;
        }
      }
    }

  }
</style>
