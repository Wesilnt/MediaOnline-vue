<template>
  <div class="poster-container">
    <div ref="PreviewImage" class="lazy-img-most poster-bg" v-lazy:background-image="`${columnDetail.sharePostUrl}?imageView2/1/format/jpg`">
          <li ref="UserHeader" class="user-header" v-lazy:background-image="`${user.avatarUrl}`"></li>
          <p ref="UserName" class="user-name">{{user.nickName}}</p>
          <img ref="ShareQrCode" class="share-qrcode">
    </div>
    <div class="poster-mask" style="position:fixed;top:0;left:0;background-color:white;width:100vw;height:100vh;z-index:88"/>
    <qr-code  :style="{display:'none'}" v-if="showQrcode"  :text="shareUrl" error-level="Q" />
    <div class="share-container">
      <img ref="ShareImage" class="share-image" :src="shareImg">
      <p ref="ShareHint" class="share-hint">长按分享图片</p>
    </div>
    <div class="loading-container" v-show="isLoading">
        <van-loading color="white" />
    </div>
    <!-- <div class="poster-pic-container">
      <canvas ref="canvasId" width="750" height="1334"/>
      <div class="top-container">
        <img ref="saveimage"/>
        <p>长按分享图片</p>
      </div>
    </div> 
    <a v-show="false" ref="download"  download="poster"/>
    <loading-dialog v-if="loading"></loading-dialog> -->
    <!-- 二维码生成组件 -->
    <!-- <qr-code  :style="{display:'none'}" v-if="showQrcode"  :text="shareUrl" error-level="Q" /> -->
     <!--loading-->
     <!-- <div class="loading-container" v-show="isLoading">
        <van-loading color="white" />
     </div> -->
  </div>
</template> 
<script>
import domtoimage from 'dom-to-image'
import { courseType } from '../../utils/config'
import LoadingDialog from '../LoadingDialog.vue'
import { createNamespacedHelpers,mapState as rootState,mapActions as rootActions} from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers( 'shareData')
export default {
  name: 'shareposter',
  data() {
    return {
      shareImg:"",
      user: {},
      showQrcode: true,
      shareUrl: this.$route.query.shareUrl || `${location.href.split('#')[0]}#/home`,
      shareType: this.$route.query.columnType,
      courseId: this.$route.query.courseId,
      centerX: 355 / 2, //canvas中心X坐标
      canvasW: 750, //canvas宽度
      canvasH: 1334, //canvas高度
      headImageW: 72, //用户头像宽度
      bottomH: 215, //底部二维码导航区高度
      bottomY: 504 - 107, //底部二维码导航区在canvas中Y坐标点
      qrcodeW: 50, //二维码宽度
      ctx: null,
      canvasData: null,
      posterData: {},
      isLoading: true
    }
  },
  components: { 'loading-dialog': LoadingDialog },
  computed: {
    ...rootState(['url', 'columnDetail', 'columnType']),
    ...mapState(['loading', 'poster'])
  },
  created() {
    this.shareType = this.shareType || this.columnType
    //1. 传入分享地址
    if (
      this.shareUrl &&
      this.shareUrl != `${location.href.split('#')[0]}#/home`
    ) {
      // this.drawBottomMap()       //重新生成图片
      this.setPosterImage()
      return
    }
    //2.  有专栏ID
    if (this.courseId) {
      this.getColumnDetail({
        courseId: this.courseId,
        columnType: this.columnType,
        useCache: true
      }).then(() => {
        this.setPosterConfig()    //设置分享地址
        // this.drawBottomMap()      //重新生成图片
        this.setPosterImage()
      })
      return
    }
    //3. 有专栏详情和专栏类型
    if (this.shareType && this.columnDetail) {
      this.setPosterConfig() //设置分享地址
      // this.drawBottomMap()      //重新生成图片
      this.setPosterImage()
      return
    }
  },
  mounted: function() {
    // var canvasData = this.$refs.canvasId
    // this.canvasData = canvasData
    // this.ctx = canvasData.getContext('2d')
    // this.ctx.mozImageSmoothingEnabled = false
    // this.ctx.webkitImageSmoothingEnabled = false
    // this.ctx.msImageSmoothingEnabled = false
    // this.ctx.imageSmoothingEnabled = false\
    let {PreviewImage,UserHeader,UserName,ShareQrCode,ShareImage,ShareHint} = this.$refs
    let radio =  document.body.offsetWidth / 375
    PreviewImage.style.height = 667 * radio + "px" 
    UserHeader.style.marginLeft = 51 * radio + 'px'
    UserHeader.style.marginTop = 462 * radio + 'px'
    UserName.style.top = 462 * radio + 'px'
    UserName.style.left = 96 * radio + 'px'
    ShareQrCode.style.top = 440 * radio + 'px'
    ShareQrCode.style.right = 55 * radio + 'px'
    ShareHint.style.top = document.body.offsetHeight - 30 +'px'
    //分享图片
    let bodyWidth = document.body.offsetWidth
    let bodyHeight = document.body.offsetHeight
    let wScale =   PreviewImage.clientWidth / document.body.offsetWidth
    let hScale =  PreviewImage.clientHeight / document.body.offsetHeight 
    let scale = 1
    if(PreviewImage.clientHeight > document.body.offsetHeight){
      scale =  document.body.offsetHeight / PreviewImage.clientHeight
    }
    if(PreviewImage.clientHeight < document.body.offsetHeight){
        scale =   1
    }
    ShareImage.style.width = bodyWidth * scale +'px' 

    let qrcode =  this.$children[0].$el.children[1]
    qrcode.onload= ()=> {
      ShareQrCode.src = qrcode.src   
   }
    // this.setPosterImage()
  },
  methods: {
    ...rootActions(['getUserInfo']),
    ...mapActions(['getPosterInfo', 'getPosterforPraise', 'getColumnDetail']),
   async setPosterImage(){
      const user = await this.getUserInfo()
      this.user = user
      
     const a= new Promise(resolve=>{
         let header = new Image()
       header.onload=()=>{
          resolve()
       }
        header.src = user.avatarUrl 
       
     }).then(()=>{
       console.log('頭像加載完成')
     })
      const b= new Promise(resolve=>{
          const bg = new Image()
       bg.onload=()=>{
          resolve()
       }
        bg.src =  this.columnDetail.sharePostUrl 
     }).then(()=>{
       console.log('背景加載完成')
     })
     Promise.all([a,b]).then(()=>{
        console.log('all加載完成')
        this.updateShareImage()
     })
      // const user = await this.getUserInfo()
      // this.user = user 
      // let header = new Image()
      // header.src = user.avatarUrl 
      // //  header.setAttribute('crossOrigin', 'anonymous')
      //  header.onload = async () =>  {
      //   // this.updateShareImage()
      //   console.log(header.src)
      //   console.log(this.columnDetail.sharePostUrl)
      //   let bg = new Image()
      //   bg.src =  this.columnDetail.sharePostUrl
      //   bg.onload =  () =>  this.updateShareImage()
      // } 
   },
   //
   updateShareImage(){
      setTimeout(() => {
        const {PreviewImage}=this.$refs
        domtoimage
          .toJpeg(PreviewImage, {
            height: window.innerHeight,
            width: window.innerWidth,
            bgcolor:'#f2f2f2'
          })
          .then(imgUrl => {
            const image = new Image()
            image.src = imgUrl 
            image.onload = () => {
              this.isLoading = false
              this.shareImg = imgUrl 
            }
          }).catch((e)=>{
            this.isLoading = false
            this.$toast("生成海报失败")
          })
      }, 300)
   },


    //将canvas生成的二维码保存为图片
    saveImg() {
      this.$refs.download.href = this.canvasData.toDataURL('images/png')
      this.$refs.download.click()
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
    },
    //1. 绘制图片模板的 底图
    drawBottomMap: function() {
      this.getUserInfo()
        .then(user => { 
          this.user = user
          return new Promise((resolve, reject) => {
            // this.drawBackground(resolve)
          })
        })
        // .then(p => {
        //   return new Promise(resolve => {
        //     this.drawHeadImage(resolve)
        //   })
        // })
        // .then(() => {
        //   this.drawUserName()
        //   this.drawQrcode()
        // })
        // .then(() => (this.isLoading = false), () => (this.isLoading = false))
        // .catch(() => (this.isLoading = false))
    },

    //绘制背景图和颜色
    async drawBackground(resolve) {
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillRect(0, this.bottomY, this.canvasW, this.bottomH)
      var cover = new Image()
      cover.setAttribute('crossOrigin', 'anonymous')
      cover.src = this.columnDetail.sharePostUrl
      cover.onload = () => {
        this.ctx.save()
        this.ctx.drawImage(cover, 0, 0, this.canvasW, this.canvasH)
        this.ctx.restore()
        console.log('背景')
        resolve()
      }
    },
    //绘制头像
    async drawHeadImage(resolve) {
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
        resolve()
        console.log('头像')
      }
    },
    //绘制名字
    async drawUserName() {
      let username = this.user.nickName
      this.ctx.fillStyle = '#262626'
      this.ctx.font = '30px Georgia'
      let textWidth = this.ctx.measureText(username).width
      this.ctx.fillText(username, 102 + 72 + 20, 930 + 25)
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
      console.log('名字')
    },
    //绘制二维码
    async drawQrcode() {
      console.log('海报地址：', this.shareUrl)
      this.ctx.drawImage(this.$children[0].$el.children[1], 440, 880, 200, 200)
      let currentSrc = this.$children[0].$el.children[1].currentSrc
      if ('' !== currentSrc && this.shareUrl === currentSrc) return
      this.$children[0].$el.children[1].onload = () =>
        this.ctx.drawImage(
          this.$children[0].$el.children[1],
          440,
          880,
          200,
          200
        )
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
      console.log('二维码')
    },
    //底部描述
    drawBottomText() {
      this.ctx.fillStyle = '#000000'
      this.ctx.font = '14px Georgia'
      this.ctx.fillText('分享有礼', 70, this.bottomY + 94 / 2 - 5)
      let text = '长按扫描，和我一起听课吧!'
      this.ctx.fillText(text, 70, this.bottomY + 94 / 2 + 19)
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
    },
    //設置海報分享地址
    setPosterConfig() {
      //1. 有专栏详情, 拼团中
      if (this.columnDetail && this.columnDetail.userAccessStatus == 1005) {
        this.shareUrl = `${this.url}/#${courseType[this.shareType]}${
          this.columnDetail.id
        }?groupBuyId=${this.columnDetail.groupBuyId}`
        return
      }
      //2. 有专栏详情, 集赞中
      if (this.columnDetail && this.columnDetail.userAccessStatus == 1009) {
        this.shareUrl = `${this.url}/#/praise/active/${this.columnDetail.id}/${
          this.columnDetail.collectLikeId
        }?columnType=${this.shareType}`
        return
      }
      //3. 有专栏详情, 非集赞中和拼团中
      if (this.columnDetail) {
        this.shareUrl = `${this.url}/#${courseType[this.shareType]}${
          this.columnDetail.id
        }`
      }
      //==================
    }
    //================= setPosterConfig
  }
}
</script>
<style lang="scss" scoped>
.poster-container {
  overflow: hidden;
  height: 100vh;
  .poster-bg { 
    overflow: hidden;
    height: auto;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
  }
  .user-header{
    width: 72px;
    height: 72px;
    list-style: none;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center; 
    border-radius: 50%;
  }
  .user-name{
    position: absolute;
     color: #262626;
     font-size: 30px;
     font-weight: 700;
  }
  .share-qrcode{
    position: absolute;
    height: 200px;
    width: 200px;
  }

  .share-container{ 
    z-index: 99;
    position: fixed; 
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    text-align: center; 
    // visibility: hidden;
    background-color: rgba($color: #000000, $alpha: 0.5);
    .share-image{ 
      width: 100vw; 
      z-index: 99;
      top: 0px;
      left: 0px;
      overflow-y:scroll;
    }
    .share-hint{
      position: absolute;
      z-index: 100;
      width: 100%;
      font-size: 30px;
      color: white;
      text-align: center; 
    }

  }
}

// .poster-container {
//   .poster-pic-container {
//     position: relative;
//     width: 100%;
//     canvas {
//       height: 100%;
//       width: 100%;
//       display: none;
//     }
//     .top-container {
//       z-index: 99;
//       top: 0;
//       left: 0;
//       position: absolute;
//       height: 100%;
//       width: 100%;
//     }
//     .top-container img {
//       z-index: 999;
//       top: 0;
//       left: 0;
//       position: absolute;
//       height: auto;
//       display: block;
//       width: 100%;
//     }
//     .top-container p {
//       z-index: 1000;
//       width: 100%;
//       top: 1260px;
//       left: 0;
//       font-size: 30px;
//       position: absolute;
//       color: #808080;
//       text-align: center;
//       color: white;
//     }
//   }
// }
</style>
