<template>
  <div class="poster-container">
    <div class="poster-pic-container">
      <canvas ref="canvasId" width="355" height="504"/>
    </div>
    <div class="poster-save-btn">
      <button @click="saveImg">保存图片</button>
    </div>
    <img ref="saveimage" src="">
    <a v-show="false" ref="download" href="" download="poster"/>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      centerX: 355 / 2, //canvas中心X坐标
      canvasW: 355, //canvas宽度
      canvasH: 504, //canvas高度
      headImageW: 44, //用户头像宽度
      bottomH: 215, //底部二维码导航区高度
      bottomY: 504 - 107, //底部二维码导航区在canvas中Y坐标点
      qrcodeW: 50, //二维码宽度
      ctx: null,
      canvasData: null,
      posterData: {}
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
    this.drawBottomMap()
  },
  methods: {
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
        this.drawQrcode()
        this.drawBottomText()
      }).then(() => {
        this.drawHeadImage()
        this.drawUserName()
      })
    },

    //绘制背景图和颜色
    drawBackground(resolve) {
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillRect(0, this.bottomY, this.canvasW, this.bottomH)
      var cover = new Image()
      cover.src = require('../assets/poster_header_bg.png')
      cover.onload = () => {
        this.ctx.drawImage(cover, 0, 0, this.canvasW, this.bottomY)
        resolve()
      }
    },
    //绘制头像
    drawHeadImage() {
      var header = new Image()
      header.src = require('../assets/cmt_item_header.png')
      header.onload = () => {
        let radius = this.headImageW / 2
        let x = this.centerX - this.headImageW / 2
        let y = this.headImageW
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(this.centerX, y + radius, radius, 0, Math.PI * 2, false)
        this.ctx.clip()
        this.ctx.drawImage(header, x, y, y, y)
        this.ctx.restore()
      }
    },
    //绘制二维码
    drawQrcode() {
      var qrcode = new Image()
      qrcode.src = require('../assets/poster_qrcode.png')
      qrcode.onload = () => {
        console.log('二维码')
        this.ctx.drawImage(qrcode, 10, this.bottomY + 25, 50, 50)
      }
    },
    //绘制名字
    drawUserName() {
      let username = '秋之本'
      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = '14px Georgia'
      let textWidth = this.ctx.measureText(username).width
      this.ctx.fillText(username, this.centerX - textWidth / 2, 116)
    },
    //底部描述
    drawBottomText() {
      this.ctx.fillStyle = '#000000'
      this.ctx.font = '14px Georgia'
      this.ctx.fillText('分享有礼', 70, this.bottomY + 94 / 2 - 5)
      let text = '长按扫描，和我一起听课吧!'
      this.ctx.fillText(text, 70, this.bottomY + 94 / 2 + 19)
    }
  }
}
</script>
<style lang="scss" scoped>
.poster-container {
  .poster-pic-container {
    padding: 20px;
    height: 1008px;
    width: 100%;
    img {
    }
    span {
      color: white;
    }
  }

  .poster-save-btn {
    position: fixed;
    bottom: 0;
    text-align: center;
    font-size: 38px;
    width: 100%;
    padding: 20px;
    button {
      line-height: 96px;
      border-radius: 96px;
      height: 96px;
      width: 100%;
      box-sizing: border-box;
      background-color: rgb(255, 163, 47);
      color: white;
      border: none;
      outline: none;
    }
  }
}
</style>
