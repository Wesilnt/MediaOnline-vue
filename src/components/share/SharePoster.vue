<template>
  <div class="poster-container">
    <div class="poster-pic-container">
      <canvas ref="canvasId" width="750" height="1334"/>
      <div class="top-container">
        <img ref="saveimage"/>
        <p>长按分享图片</p>
      </div>
    </div> 
    <a v-show="false" ref="download"  download="poster"/>
    <loading-dialog v-if="loading"></loading-dialog>
    <qr-code  :style="{display:'none',}" v-if="showQrcode" :text="shareUrl" error-level="Q" />
  </div>
</template> 
<script>
import LoadingDialog from '../LoadingDialog.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('shareData')
export default {
  name: 'shareposter', 
  data() {
    console.log(this.$route.query)
    return {
      showQrcode:true,
      shareUrl: this.$route.query.shareUrl,
      type: this.$route.query.sharetype,
      id: this.$route.params.id,
      centerX: 355 / 2, //canvas中心X坐标
      canvasW: 750, //canvas宽度
      canvasH: 1334, //canvas高度
      headImageW: 72, //用户头像宽度
      bottomH: 215, //底部二维码导航区高度
      bottomY: 504 - 107, //底部二维码导航区在canvas中Y坐标点
      qrcodeW: 50, //二维码宽度
      ctx: null,
      canvasData: null,
      posterData: {}
    }
  },
  components: { 'loading-dialog': LoadingDialog },
  computed: { ...mapState(['loading', 'user','poster']) },
  created(){
    // this.getUserInfo() 
  },
  mounted: function() {
    var canvasData = this.$refs.canvasId
    this.canvasData = canvasData
    this.ctx = canvasData.getContext('2d')
    this.ctx.mozImageSmoothingEnabled = false
    this.ctx.webkitImageSmoothingEnabled = false
    this.ctx.msImageSmoothingEnabled = false
    this.ctx.imageSmoothingEnabled = false 
     this.getUserInfo().then(()=> this.drawBottomMap())
  },
  methods: {
    ...mapActions(['getUserInfo','getPosterInfo', 'getPosterforPraise']),
    //将canvas生成的二维码保存为图片
    saveImg() {
      this.$refs.download.href = this.canvasData.toDataURL('images/png')
      this.$refs.download.click()
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
    },
    //1. 绘制图片模板的 底图
    drawBottomMap: function() {
      var promise = new Promise((resolve, reject) => {
        this.drawBackground(resolve)
        // this.drawBottomText()
      }).then(() => {
        this.drawQrcode()
        this.drawHeadImage()
        this.drawUserName()
      })
    },

    //绘制背景图和颜色
    drawBackground(resolve) {
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillRect(0, this.bottomY, this.canvasW, this.bottomH)
      var cover = new Image()
      cover.src = require('../../assets/images/poster_header_bg.jpg')
      cover.onload = () => {
        this.ctx.drawImage(cover, 0, 0, this.canvasW, this.canvasH)
        resolve()
      }
    },
    //绘制头像
    drawHeadImage() {
      var header = new Image()
      header.setAttribute('crossOrigin', 'anonymous')
      header.src = this.user.avatarUrl + '?timeStamp=' + Date.now()
      header.onload = () => {
        let radius = this.headImageW
        let x = 102
        let y = 920
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(
          x + this.headImageW / 2,
          y + this.headImageW / 2,
          this.headImageW / 2,
          0,
          Math.PI * 2,
          false
        )
        this.ctx.clip()
        this.ctx.drawImage(header, x, y, this.headImageW, this.headImageW)
        this.ctx.restore()
        this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
      }
    },
    //绘制名字
    drawUserName() {
      let username = this.user.nickName
      this.ctx.fillStyle = '#262626'
      this.ctx.font = '30px Georgia'
      let textWidth = this.ctx.measureText(username).width
      this.ctx.fillText(username, 102 + 72 + 20, 930 + 25)
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
    },
    //绘制二维码
    drawQrcode() {
      // let temp = this.poster.qrCodeUrl //"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=676587443,820607910&fm=111&gp=0.jpg";
      //   if(this.type=='praise'){
      //     temp = this.poster.xcxUrl
      //   }
      // var qrcode = new Image()
      // qrcode.setAttribute('crossOrigin', 'anonymous')
      // qrcode.src = temp +"?timeStamp="+Date.now()
      // qrcode.onload =  () => {
      //   this.ctx.drawImage(qrcode, 440, 880, 200, 200)
      //   this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
      // } 
      console.log(this.$children[0].$el.children[1])
      this.ctx.drawImage(this.$children[0].$el.children[1],440, 880, 200, 200) 
      // this.showQrcode = false
      // Qrcode.toCanvas(this.ctx, 'http://www.baidu.com', function(error) {
      //   if (error) console.error(error)
      //   console.log('success!')
      // })
    },
    //底部描述
    drawBottomText() {
      this.ctx.fillStyle = '#000000'
      this.ctx.font = '14px Georgia'
      this.ctx.fillText('分享有礼', 70, this.bottomY + 94 / 2 - 5)
      let text = '长按扫描，和我一起听课吧!'
      this.ctx.fillText(text, 70, this.bottomY + 94 / 2 + 19)
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
    }
  }
}
</script>
<style lang="scss" scoped>
.poster-container {
  .poster-pic-container {
    position: relative;
    height: 100vh;
    width: 100%;
    canvas {
      height: 100%;
      width: 100%;
      display: none;
    }
    .top-container {
      z-index: 99;
      top: 0;
      left: 0;
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .top-container img {
      z-index: 999;
      top: 0;
      left: 0;
      position: absolute;
      height: auto;
      width: 100%;
    }
    .top-container p {
      z-index: 1000;
      width: 100%;
      top: 1260px;
      left: 0;
      font-size: 30px;
      position: absolute;
      color: #808080;
      padding-bottom: 40px;
      text-align: center;
      color: white;
    }
  }

  // .poster-save-btn {
  //   position: fixed;
  //   bottom: 0;
  //   text-align: center;
  //   font-size: 38px;
  //   width: 100%;
  //   padding: 20px;
  //   button {
  //     line-height: 96px;
  //     border-radius: 96px;
  //     height: 96px;
  //     width: 100%;
  //     box-sizing: border-box;
  //     background-color: rgb(255, 163, 47);
  //     color: white;
  //     border: none;
  //     outline: none;
  //   }
  // }
}
</style>
