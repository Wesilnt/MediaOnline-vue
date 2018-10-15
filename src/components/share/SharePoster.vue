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
    <!-- 二维码生成组件 -->
    <qr-code  :style="{display:'none'}" v-if="showQrcode"  :text="shareUrl" error-level="Q" />
     <!--loading-->
     <div class="loading-container" v-show="isLoading">
        <van-loading color="white" />
     </div>
  </div>
</template> 
<script>
import LoadingDialog from '../LoadingDialog.vue'
import { createNamespacedHelpers ,mapState as rootState,mapActions as rootActions} from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('shareData')
export default {
  name: 'shareposter', 
  data() { 
    return {
      user:{},
      showQrcode:true,
      shareUrl: this.$route.query.shareUrl||`${location.href.split('#')[0]}#/home`,
      type: this.$route.query.sharetype,
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
      isLoading:true
    }  
  },
  components: { 'loading-dialog': LoadingDialog },
  computed: { 
              ...rootState(['url','columnDetail','columnType']),
              ...mapState(['loading','poster']) 
            },
  created(){
       console.log("this.shareUrl ============ ",this.shareUrl)
       console.log("this.columnType:",this.columnType) 
     //1. 传入分享地址
     if(this.shareUrl&&this.shareUrl != `${location.href.split('#')[0]}#/home`) {
        this.drawBottomMap()      //重新生成图片
       return  
     }
     //2. 有专栏详情和专栏类型
     if(this.columnType && this.columnDetail) {
        this.setPosterConfig()    //设置分享地址
         this.drawBottomMap()      //重新生成图片
       return
     }
     //3. 没有专栏详情 , 有专栏ID
     if(this.courseId){
        this.getColumnDetail({courseId:this.courseId}) 
        .then(()=>{
          this.setPosterConfig()    //设置分享地址
          this.drawBottomMap()      //重新生成图片
        })
      } 
  },
  mounted: function() {
    var canvasData = this.$refs.canvasId
    this.canvasData = canvasData
    this.ctx = canvasData.getContext('2d')
    this.ctx.mozImageSmoothingEnabled = false
    this.ctx.webkitImageSmoothingEnabled = false
    this.ctx.msImageSmoothingEnabled = false
    this.ctx.imageSmoothingEnabled = false 
    
  },
  methods: { 
    ...rootActions(['getUserInfo']),
    ...mapActions(['getPosterInfo', 'getPosterforPraise','getColumnDetail']),
    //将canvas生成的二维码保存为图片
    saveImg() {
      this.$refs.download.href = this.canvasData.toDataURL('images/png')
      this.$refs.download.click()
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
    },
    //1. 绘制图片模板的 底图
    drawBottomMap:  function() { 
      this.getUserInfo() 
      .then((user)=>{
        this.user = user
         return new Promise((resolve,reject)=>{
             this.drawBackground(resolve) 
        })
      }).then(p=>{
          return new Promise((resolve)=>{
                this.drawHeadImage(resolve)  
            })
        }).then(()=>{
             this.drawUserName()
             this.drawQrcode()
        }) .then(()=>this.isLoading = false,()=>this.isLoading = false).catch(()=>this.isLoading = false) 
      
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
        console.log("背景");resolve()} 
        
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
        this.ctx.arc(x + this.headImageW / 2,y + this.headImageW / 2,this.headImageW / 2,0,Math.PI * 2,false)
        this.ctx.clip()
        this.ctx.drawImage(header, x, y, this.headImageW, this.headImageW)
        this.ctx.restore()
        this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
        resolve()
        console.log("头像")
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
      console.log("名字") 
    },
    //绘制二维码
    async drawQrcode() { 
      this.ctx.drawImage(this.$children[0].$el.children[1],440, 880, 200, 200) 
      let currentSrc =  this.$children[0].$el.children[1].currentSrc
      if("" !== currentSrc && this.shareUrl === currentSrc) return
      this.$children[0].$el.children[1].onload = ()=>this.ctx.drawImage(this.$children[0].$el.children[1],440, 880, 200, 200) 
      this.$refs.saveimage.src = this.canvasData.toDataURL('images/png')
      console.log("二维码") 
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
    setPosterConfig(){ 
       //1. 有专栏详情, 拼团中
     if(this.columnDetail && this.columnDetail.userAccessStatus==1005){   
      switch (this.columnType) {
         case 'OnlineCourse':
          this.shareUrl =  `${this.url}#/home/videoColumnDetail/${this.columnDetail.id}?groupBuyId=${this.columnDetail.groupBuyId}`
          break
        case 'OnlineVision':
          this.shareUrl =  `${this.url}#/home/visionDetail/${this.columnDetail.id}?groupBuyId=${this.columnDetail.groupBuyId}`
          break
        case 'Readings':
          this.shareUrl =  `${this.url}#/home/readings/book/${this.columnDetail.id}?groupBuyId=${this.columnDetail.groupBuyId}&columnType='Readings'`
          break
        default:
          this.shareUrl = `${this.url}#/home/freezone`
          break
        } 
      return
     }
     //2. 有专栏详情, 集赞中
     if(this.columnDetail && this.columnDetail.userAccessStatus==1009){ 
      this.shareUrl =  `${this.url}#/praise/active/${this.columnDetail.id}/${this.columnDetail.collectLikeId}?columnType=${this.columnType}` 
      return
     }
     //3. 有专栏详情, 非集赞中和拼团中
     if(this.columnDetail) { 
        switch (this.columnType) {
          case 'OnlineCourse':
            this.shareUrl =   `${this.url}/#/home/videoColumnDetail/${this.columnDetail.id}`
            break
          case 'OnlineVision':
            this.shareUrl =   `${this.url}/#/home/visionDetail/${this.columnDetail.id}`
            break
          case 'Readings':
            this.shareUrl =   `${this.url}/#/home/readings/book/${this.columnDetail.id}columnType='Readings'`
            break
          default:
            this.shareUrl = `${this.url}/#/home/freezone`
            break
          } 
      }
      //==================
    }
    //================= setPosterConfig
  }
}
</script>
<style lang="scss" scoped>
.poster-container {
  .poster-pic-container {
    position: relative; 
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
      display: block;
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
      text-align: center;
      color: white;
    }
  }
}
</style>
