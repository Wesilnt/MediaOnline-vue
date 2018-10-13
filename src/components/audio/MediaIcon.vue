<template>
  <div v-show="forceHidenFloat&&showFloat" ref="mediaIcon" class="media-icon-container" :style="{left:x,top:y}">
     <!-- <canvas width="68" height="68" ref="canvasArc"/> -->
     <van-circle
     class="circle_container"
        v-model="progress"
        color="#FFCD7D"
        fill="#FDE7E7"
        size="68px"
        layer-color="#fff"  
        :speed="1"
        :clockwise="true"
        :stroke-width="60"
        :rate="1"
      >
     </van-circle>
     <div class="image-icon-container" :style="{backgroundImage:`url(${coverPic})`}">
       <img :src="`${this.isPlaying?require('../../assets/images/audio_play_play.png'):require('../../assets/images/audio_play_pause.png')}`" class="play-icon">
     </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex' 
const { mapState, mapGetters } = createNamespacedHelpers('audiotaskData')
export default {
  data() {
    return {
      _canvas:null,
      _ctx: null, 
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
      x: (window.screen.width- 68 - 6) + 'px' ,
      y: (( window.screen.height - 68 ) * 3 / 4 ) + 'px',
      width: 68,
      height: 68,
      startX: 48,
      startY: 16,
      startTime: 0,
      outRingWidth: 6,
      progressgWidth: 4,
      progress:0,
    }
  },
  computed:{...mapState(['isPlaying'
  ,'currentTime'
  ,'maxTime'
  ,'audioId'
  ,'coverPic'
  ,'forceHidenFloat'
  ,'showFloat'
  , 'playType'
  , 'courseName'])},
  methods: {
    //触摸开始
    _touchStart: function(e) {
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
      let maxTop =   (this.windowHeight - this.width ) * 3 / 4 
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
        this.$router.push({
          name:'AudioPlay',
          params:{id:this.audioId},
          query:{playType:this.playType,courseName:this.courseName}})
      }
      e.preventDefault()
    },
    _togglePlay(){
       this._drawPlayIconBg()
      let playIcon = new Image()
      if(this.isPlaying){
        playIcon.src =  require('../../assets/images/audio_play_play.png')
      }else{
        playIcon.src =  require('../../assets/images/audio_play_pause.png')
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
 
      // this._ctx.fillStyle = '#EB852A'; 
      // this._ctx.shadowOffsetX = 15; // 阴影Y轴偏移
      // this._ctx.shadowOffsetY = 15; // 阴影X轴偏移
      // this._ctx.shadowBlur = 14; // 模糊尺寸
      // this._ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
      // this._ctx.beginPath(); 
      // this._ctx.arc(this.width/2, this.height/2 , this.height/2, 0, 2 * Math.PI, false); 
      // this._ctx.fill();
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
      //1. 进度条
      this._ctx.beginPath()
      this._ctx.lineWidth = this.progressgWidth
      this._ctx.strokeStyle = '#FFCD7D'
      this._ctx.arc(this.width/2, this.height/2, this.height/2 - this.outRingWidth, -1/2* Math.PI , angle, 0)
      this._ctx.stroke()
      this._ctx.closePath()
      //2. 底色部分
      this._ctx.beginPath()
      this._ctx.lineWidth = this.progressgWidth
      this._ctx.strokeStyle = 'white'
      this._ctx.arc(this.width/2, this.height/2, this.height/2 - this.outRingWidth, angle , 3/2*Math.PI, 0)
      this._ctx.stroke()
      this._ctx.closePath()
    },
  },
  mounted() { 
    this.$refs.mediaIcon.addEventListener('touchstart', this._touchStart, true)
    this.$refs.mediaIcon.addEventListener('touchmove', this._touchMove, true)
    this.$refs.mediaIcon.addEventListener('touchend', this._touchEnd, true)
    // this._canvas = this.$refs.canvasArc
    // this._ctx =  this._canvas.getContext('2d')
    // if(window.devicePixelRatio){
    //   this._canvas.style.width = this.width + "px";
    //   this._canvas.style.height = height + "px";
    //   this._canvas.height = height * window.devicePixelRatio;
    //   this._canvas.width = width * window.devicePixelRatio;
    // }
    // this._drawProgressColor()
    // this._drawPlayIconBg()
    // this._setProgress(10, 100)
    // this._togglePlay() 

    // if(window.devicePixelRatio){
    //   this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    // }
  },
  watch:{
    isPlaying:function(value){
      // this._togglePlay(value)
      return value
    },
    currentTime: function(value) {
      // this._setProgress(this.currentTime,this.maxTime)
      this.progress = value*100/this.maxTime;
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
.media-icon-container {
  position: fixed; 
  width: 160px;
  height: 160px;
  z-index: 99999999; 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; 
  padding: 12px;
  background-color: white;
  border-radius: 50%;
  .circle_container{ 
     position: absolute;
  }
  .image-icon-container{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%; 
    background-size: 100%;
  }
  .play-icon{
     position: absolute;
     height: 32px;
     width: 28px; 
  }
}
</style>
