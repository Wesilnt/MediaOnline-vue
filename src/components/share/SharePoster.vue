<template>
  <div class="poster-container">
    <div class="poster-pic-container">
      <canvas ref="canvasId" :width="this.canvasW" :height="this.canvasH"/>
      <div class="top-container" >
        <img  ref="saveImage"/>
        <p>长按分享图片</p>
      </div>
    </div>  
    <loading-dialog v-if="loading"></loading-dialog>
    <!-- 二维码生成组件 -->
      <vue-qr :text="shareUrl" v-show="false" id="qr" />
     <div class="loading-container" v-show="isLoading">
        <van-loading color="white" />
     </div>
  </div>
</template> 
<script>
import VueQr from 'vue-qr'
import LoadingDialog from '../LoadingDialog.vue'
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('shareData')
export default {
  name: 'shareposter',
  data() {
    return {
      user: {},
      shareUrl: this.$route.query.shareUrl || `${location.href.split('#')[0]}#/home`,
      postType: this.$route.params.postType, //海报类型  collage ： 拼团   praise ：集赞
      shareType: this.$route.params.columnType,
      courseId: this.$route.params.courseId,
      collectLikeId: this.$route.query.collectLikeId, //集赞海报分享得集赞ID
      sharePostUrl: this.$route.query.sharePostUrl, //集赞分享海报
      startUserName: this.$route.query.startUserName, //集赞发起人姓名
      startAvatar: this.$route.query.startAvatar, //集赞发起人头像
      pixelRatio: 1,
      radio: document.body.offsetWidth / 375,
      canvasW: document.body.offsetWidth, //canvas宽度
      canvasH: (667 * document.body.offsetWidth) / 375, //canvas高度
      userNameLeft: 97, //用户名Left
      userNameTop: 480, //用户名Top
      headImageW: 36, //用户头像宽度
      headLeft: 51, //头像Left
      headTop: 462, //头像Top
      qrcodeWidth: 100, //二维码大小
      qrcodeLeft: 220, //二维码Left
      qrcodeTop: 440, //二维码Top
      ctx: null,
      canvasData: null,
      posterData: {},
      isLoading: true
    }
  },
  components: { 'loading-dialog': LoadingDialog, VueQr },
  computed: {
    ...rootState(['url', 'columnDetail', 'columnType']),
    ...mapState(['loading', 'poster'])
  },
  created() {
    this.shareType = this.shareType || this.columnType;
    // 1. 传入分享地址
    if (
      this.shareUrl &&
      this.shareUrl != `${location.href.split('#')[0]}#/home`
    ) {
      this.drawBottomMap(); //重新生成图片
      return
    }
    // 2.  有专栏ID
    if (this.courseId) {
      this.getColumnDetail({
        courseId: this.courseId,
        columnType: this.columnType,
        useCache: true
      }).then(() => {
        this.setPosterConfig(); //设置分享地址
        this.drawBottomMap() //重新生成图片
      });
      return
    }
    //3. 有专栏详情和专栏类型
    if (this.shareType && this.columnDetail) {
      this.setPosterConfig(); //设置分享地址
      this.drawBottomMap(); //重新生成图片
      return;
    }
  },
  mounted: function() {
    let canvasData = this.$refs.canvasId;
    this.canvasData = canvasData;
    this.ctx = canvasData.getContext('2d');
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    let getPixelRatio = function(context) {
      let backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore
    };
    this.pixelRatio = getPixelRatio(this.ctx);
    //将画布放 屏幕像素比
    this.canvasData.height = this.canvasH * this.pixelRatio;
    this.canvasData.width = this.canvasW * this.pixelRatio;
  },
  methods: {
    ...rootActions(['getUserInfo']),
    ...mapActions(['getPosterInfo', 'getPosterforPraise', 'getColumnDetail']),
    //設置海報分享地址
    setPosterConfig() {
      //0. 有专栏详情, 非集赞中和拼团中
      if (!this.columnDetail) return;
      this.shareUrl = `${this.url}/#/detail/${this.shareType}/${
        this.columnDetail.id
      }`;
      //1. 有专栏详情, 拼团中
      if (this.postType === 'collage') {
        this.shareUrl = `${this.shareUrl}?groupBuyId=${
          this.columnDetail.groupBuyId
        }&startUserName=${this.startUserName}&startAvatar=${this.startAvatar}`
      }
      //2. 有专栏详情, 集赞中
      if (this.postType === 'praise') {
        this.shareUrl = `${this.url}/#/praise/${this.shareType}/${
          this.courseId
        }/${this.collectLikeId}/active?startUserName=${
          this.startUserName
        }&startAvatar=${this.startAvatar}`
      }
      console.log('SharePoster-Link:', this.shareUrl)
    },
    //绘制海报
    drawBottomMap: function() {
      //指定绘制上下文, 放大 this.pixelRatio 比例进行绘制所有的内容
      this.ctx.scale(this.pixelRatio, this.pixelRatio);
      this.getUserInfo()
        .then(user => (this.user = user))
        .then(() => new Promise(resolve => this.drawBackground(resolve)))
        .then(() => new Promise(resolve => this.drawHeadImage(resolve)))
        .then(() => {
          this.drawUserName();
          this.drawQrcode()
        })
        .then(() =>(this.$refs.saveImage.src = this.canvasData.toDataURL('images/png')))
        .then(() => this.setImageConfig(), () => this.setImageConfig())
        .catch(() => this.setImageConfig())
    },

    //1. 绘制背景图和颜色
    async drawBackground(resolve) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, this.bottomY, this.canvasW, this.bottomH);
      let cover = new Image();
      cover.setAttribute('crossOrigin', 'anonymous');
      //默认专栏海报分享
      let sharePoster = this.columnDetail.sharePostUrl;
      //拼团分享海报
      if ('collage' == this.postType)
        sharePoster = this.columnDetail.groupBuySharePostUrl;
      // 集赞分享海报
      if ('praise' == this.postType) sharePoster = this.sharePostUrl;
      cover.src = sharePoster;
      cover.onload = () => {
        this.ctx.save();
        this.ctx.drawImage(cover, 0, 0, this.canvasW, this.canvasH);
        this.ctx.restore();
        resolve()
      }
    },
    //2. 绘制头像
    async drawHeadImage(resolve) {
      var header = new Image();
      header.setAttribute('crossOrigin', 'anonymous');
      header.src =
        (this.startAvatar || this.user.avatarUrl) + '?timeStamp=' + Date.now();
      header.onload = () => {
        let radius = this.headImageW * this.radio;
        let x = this.headLeft * this.radio;
        let y = this.headTop * this.radio;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(
          x + this.headImageW / 2,
          y + this.headImageW / 2,
          this.headImageW / 2,
          0,
          Math.PI * 2,
          false
        );
        this.ctx.clip();
        this.ctx.drawImage(header, x, y, this.headImageW, this.headImageW);
        this.ctx.restore();
        resolve()
      }
    },
    //3. 绘制名字
    async drawUserName() {
      let username = this.startUserName || this.user.nickName;
      this.ctx.fillStyle = '#262626';
      this.ctx.font = '15px Georgia';
      this.ctx.fillText(
        username,
        this.userNameLeft * this.radio,
        this.userNameTop * this.radio
      )
    },
    //4. 绘制二维码
    async drawQrcode() {
      const left = this.qrcodeLeft * this.radio;
      const top = this.qrcodeTop * this.radio;
      const width = this.qrcodeWidth * this.radio;
      const qr = document.getElementById('qr').querySelector('img');
      this.ctx.drawImage(qr, left, top, width, width);
      const currentSrc = qr.currentSrc;
      if ('' !== currentSrc && this.shareUrl === currentSrc) return;
      qr.onload = () => this.ctx.drawImage(qr, left, top, width, width)
    },
    //5. 显示图片
    setImageConfig(){
        const { saveImage } = this.$refs;
        let bodyHeight = document.body.clientHeight;
        let scale = 1;
        if (bodyHeight < this.canvasH) scale = bodyHeight / this.canvasH;
        saveImage.style.width = this.canvasW * scale + 'px'
        this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.poster-container {
  .poster-pic-container {
    position: relative;
    width: 100%;
    height: 100vh;
    canvas {
      height: 100%;
      width: 100%;
      display: none;
    }
    .top-container {
      z-index: 99;
      top: 0;
      left: 0;
      position: relative;
      height: 100%;
      width: 100%;
      text-align: center;
      background-color: rgba(41, 41, 41, 0.6);
    }
    .top-container img {
      z-index: 105;
      top: 0;
      margin: auto;
      height: auto;
      display: block;
      width: 100%;
    }
    .top-container p {
      z-index: 100;
      width: 100%;
      left: 0;
      font-size: 30px;
      position: absolute;
      color: #808080;
      text-align: center;
      color: white;
      bottom: 30px;
    }
  }
}
</style>
