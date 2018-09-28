<template>
  <div ref="mediaIcon" class="media-icon-container" :style="{left:x,top:y}">
     <canvas ref="canvasArc"/>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex' 
const { mapState, mapGetters } = createNamespacedHelpers('audiotask')
export default {
  data() {
    return {
      _ctx: null, 
      x: '10px',
      y: '20px',
      width: 68,
      height: 68,
      startX: 48,
      startY: 16,
      startTime: 0,
      outRingWidth: 6,
      progressgWidth: 4,
      windowWidth: window.screen.width,
      windowHeight: window.screen.height
    }
  },
  computed:{...mapState(['isPlaying','currentTime','maxTime'])},
  methods: {
    //触摸开始
    _touchStart: function(e) {
       console.dir(this.$store)
      this.startTime = new Date().getTime()
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
      e.preventDefault()
    },
    //触摸移动
    _touchMove: function(e) {
      let left = e.touches[0].clientX - this.width / 2
      let top = e.touches[0].clientY - this.width / 2
      left = left < 0 ? 0 : left
      top = top < 0 ? 0 : top
      let maxLeft = this.windowWidth - this.width
      let maxTop =   this.windowHeight - this.width  
      left = left > maxLeft    ? maxLeft  : left
      top =  top > maxTop   ? maxTop : top
      this.x = left + 'px'
      this.y = top + 'px'
      e.preventDefault()
    },
    //触摸结束
    _touchEnd: function(e) {
      let offsetTime = new Date().getTime() - this.startTime
      let offsetX = e.changedTouches[0].clientX - this.startX
      let offsetY = e.changedTouches[0].clientY - this.startY
      if (offsetTime < 800 && Math.abs(offsetX) < 50 && Math.abs(offsetY) < 50) {
        // this.setData({ isPlaying: !this.data.isPlaying })
        // this._toggleBtn(this.data.isPlaying)
        // this._am.play()
        // this.triggerEvent('onClick')
        // this.isPlaying = !this.isPlaying
        // this._togglePlay()
      }
      e.preventDefault()
    },
    _togglePlay(){
       this._drawPlayIconBg()
      let playIcon = new Image()
      if(this.isPlaying){
        playIcon.src =  require('../../assets/audio_play_play.png')
      }else{
        playIcon.src =  require('../../assets/audio_play_pause.png')
      }
      playIcon.onload = ()=>{
        this._ctx.drawImage(playIcon,this.width/2-5, this.height/2-8, 10,16);
      }
    },
    //设置进度
    _setProgress: function(progress, max) {
      this._drawProgress(progress, max)
    },
    //绘制进度底色
    _drawProgressColor: function() { 
      this._ctx.beginPath()
      this._ctx.arc(this.width/2, this.height/2 , this.height/2, 0, 2* Math.PI, 1)
      this._ctx.fillStyle = 'white' 
      this._ctx.fill() 
    },
    //绘制按鈕底色
    _drawPlayIconBg: function() { 
      this._ctx.beginPath()
      this._ctx.arc(this.width/2, this.height/2, this.width/2- this.outRingWidth - this.progressgWidth+2, 0, 2* Math.PI, 1)
      this._ctx.fillStyle = '#FDE7E7' 
      this._ctx.fill() 
    },
    //绘制进度
    _drawProgress: function(progress, duration) {
      let angle = -1/2* Math.PI + progress / duration *2 *Math.PI
      let max = parseInt(duration)
      let value = parseInt(progress) 
      this._ctx.beginPath()
      this._ctx.arc(this.width/2, this.height/2, this.height/2 - this.outRingWidth, -1/2* Math.PI , angle, 0)
      this._ctx.strokeStyle = '#FFCD7D'
      this._ctx.lineWidth = this.progressgWidth
      this._ctx.stroke()
      this._ctx.closePath()
    },
  },
  mounted() { 
    this.$refs.mediaIcon.addEventListener('touchstart', this._touchStart, true)
    this.$refs.mediaIcon.addEventListener('touchmove', this._touchMove, true)
    this.$refs.mediaIcon.addEventListener('touchend', this._touchEnd, true)
    this._ctx = this.$refs.canvasArc.getContext('2d')
    this._drawProgressColor()
    this._drawPlayIconBg()
    this._setProgress(10, 100)
    this._togglePlay()
    console.log(this)
  }
}
</script>
<style lang="scss" scoped>
.media-icon-container {
  position: fixed;

  width: 136px;
  height: 136px;
  z-index: 999999; 
}
</style>
