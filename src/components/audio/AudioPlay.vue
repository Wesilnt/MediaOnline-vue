<template>
  <div class="audioplay-container">
    <!-- 封面 -->
    <img :src="audio.coverPic" class="cover">
    <!-- 主，副标题 -->
    <h3> {{audio.title}}</h3>
    <h4> {{audio.subTitle}}</h4>
    <!-- 中间tabbar -->
    <div class="tab-container">
      <div class="tab-item" @click="onCollect">
        <img :src="isLike.like?require('../../assets/audio_love_collect.png'):require('../../assets/audio_love_normal.png')">
      </div>
      <router-link :to="'/audio/audiodraft/'+lessonId" v-if="false" class="tab-item" tag="div">
        <img src="../../assets/audio_play_manuscripts.png">
      </router-link>
      <router-link :to="'/audio/audiocmts/'+lessonId" class="tab-item" tag="div">
        <span>{{audio.commentCount}}</span>
        <img src="../../assets/audio_play_comments.png">
      </router-link>
      <div class="tab-item" @click="onShare">
        <img src="../../assets/audio_play_share.jpg">
      </div>
    </div>
    <!-- 进度条 -->
    <div class="slider-container">
      <div slot="start">{{parseInt(currentTime) | formatDuring}}</div>
      <!-- <mt-range ref="mtrange" v-model="currentTime" :min="0" :max="duration" :step="100/duration" :bar-height="2"/> -->
    <input type="range" @input="onInputChange" v-model="currentTime" ref="range" :min="0" :max="duration" />
      <div slot="end">{{ duration | formatDuring}}</div>
    </div>
    <!-- <vue-slider></vue-slider> -->
    <!-- <div class="play-slider">
      <span>05:32</span>
      <mu-slider :display-value="display" @change="sliderChange" class="demo-slider" v-model="background"></mu-slider>
      <span>06:23</span>
    </div> -->
    <!-- 播放按钮 -->
    <div class="play-btns">
      <div class="btn-item" @click="onPlayMode">
        <img :src="isSingle?require('../../assets/audio_play_single.png'):require('../../assets/audio_play_sort.png')">
      </div>
      <div class="btn-item" @click="onPlayPrv">
        <img src="../../assets/audio_play_prv.png">
      </div>
      <div :class="{'play-btn-active':isPlaying}" class="btn-item" @click="onPlayPause">
        <img :src="isPlaying?require('../../assets/audio_play_play.png'):require('../../assets/audio_play_pause.png')">
      </div>
      <div class="btn-item" @click="onPlayNext">
        <img src="../../assets/audio_play_next.png">
      </div>
      <div class="btn-item" @click="onPlayList">
        <img src="../../assets/audio_play_list.png">
      </div>
    </div>
    <!-- 音频列表弹框 -->

    <van-popup v-model="popupVisible" position="bottom"  close-on-click-overlay>
      <div class="play-list-container">
        <div class="list-header">
          <h3>播放列表</h3>
        </div>
        <hr>
        <div class="list-container">
          <div v-for="item of singleSetList" :key="item.id" class="list-item">
            <div class="list-content" @click="onItemClick(item)">
              <img v-if="lessonId==item.id" src="../../assets/audio_list_playing.png">
              <p :class="{'p-playing':lessonId==item.id}">{{item.title}}</p>
            </div>
            <hr>
          </div>
        </div>
        <div class="list-close" @click="onCloseList">关闭</div>
      </div>
    </van-popup>
    <!-- 分享框 -->
    <share-pop :show="showShare" @close="closeShare"/>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState,mapActions,mapGetters}  = createNamespacedHelpers('audio')

import SharePop from '../Share.vue'
import AudioTask from '../../utils/AudioTask.js'

export default {
  components: {
    'share-pop': SharePop
  },
  data() {
    return {
      lessonId:this.$route.query.id,
      play: true,
      isSingle: false, //是否单个循环
      isPlaying: false, //是否正在播放
      popupVisible: false, //是否显示音频列表弹框
      playIndex: 0, //播放第几首
      showShare: false, //是否显示分享框
      currentTime: '0', //播放音频进度
      duration: 100, //播放音频最大时长
      touching: false, //slider触摸
      rangeValue: 0,
      cover: '',
      progressColor: '#ff0000',
      background: 12,
      display: false,
      touchStart: 0
    }
  },
  computed:{...mapState({audio:"audioDetail",isLike(state){ 
    let like = state.isLike.like
    if(!state.isLike.isLoad){
      if(like)
      this.$toast.success({duration:2000,message: '已添加到我喜欢的'})
      else
      this.$toast.fail({duration:2000,message:'已取消喜欢'})
    }
    return state.isLike
  },'singleSetList':"singleSetList"})},
  created() {
    this.getAudioDetail({lessonId:this.lessonId})
    this.isPlaying = AudioTask.getInstance().isPlaying()
    this.isSingle = AudioTask.getInstance().getPlayMode() == "single"
    AudioTask.getInstance().addTimeListener(this.onTimeUpdate)
    AudioTask.getInstance().addStateListener(this.onStateUpdate)
  },
  destroyed() {
    AudioTask.getInstance().removeTimeListener(this.onTimeUpdate)
    AudioTask.getInstance().removeStateListener(this.onStateUpdate)
  },
  mounted: function() {
    this.$refs.range.addEventListener('touchstart', e => { 
      this.touching = true 
      this.touchStart = e.changedTouches[0].clientX
    })
    this.$refs.range.addEventListener('touchend', e => {
      AudioTask.getInstance().seekTo(parseInt(this.currentTime))
      this.touching = false
    })
    this.$refs.range.addEventListener('touchcancel', () => {
      this.touching = false
    })
  },
  methods: {
    ...mapActions(['getAudioDetail','postFavorite']),
    onInputChange(e) {
      let percent = parseInt(e.target.value * 100 / e.target.max)
      e.target.style =  'background: linear-gradient(to right,#FFCD7D ' + percent + '%,  #E5E5E5 1%, #E5E5E5'
    },
    //进度条拖动 OTAwOWY1ZjgtZTJiYy00Y2IwLTk4ZDktNzIxYjMyMTUzYzU2
    sliderChange(value) {
      console.log(value)
      console.log(this.$refs.content)
    }, 
    //收藏
    onCollect() {
      this.postFavorite({lessonId:this.lessonId})
    },
    //文稿
    onManuScripts() {},
    //评论
    onComments() {},
    //分享
    onShare() {
      this.showShare = true
    },
    //分享框关闭
    closeShare() {
      this.showShare = false
    },
    //切换播放模式
    onPlayMode() {
      this.isSingle = !this.isSingle
      this.$toast(this.isSingle ? '单曲循环' : '列表循环')
      AudioTask.getInstance().setPlayMode(this.isSingle?'single':'order')
    },
    //上一首
    onPlayPrv() {
      this.$toast.fail({message:'这是第一条'})
    },
    //播放/暂停
    onPlayPause() {
      if ((this.isPlaying = !this.isPlaying)) { 
        AudioTask.getInstance().play(this.audio.audioUrl)
      } else {
        AudioTask.getInstance().pause()
      }
    },
    //下一首
    onPlayNext() {
      this.$toast.fail('已经是最后一条')
    },
    //音频进度监听
    onTimeUpdate(currentTime, duration) {
      if (this.touching) return
      this.currentTime = currentTime
      this.duration = duration
      this.$nextTick(() => {
        let percent = parseInt(Math.ceil(currentTime * 100 / duration))
        this.$refs.range.style =
          'background: linear-gradient(to right,#FFCD7D ' +
          percent +
          '%, #E5E5E5 1%, #E5E5E5'
      })
    },
    //播放状态监听
    onStateUpdate(state) { 
      if (state == 'canplaythrough') {
        this.duration = AudioTask.getInstance().getDuration()
      }
      if (state == 'ended') {
        this.isPlaying = false
      }
      if (state == 'play') {
        this.isPlaying = true
      }
    },
    //音频列表
    onPlayList() {
      this.popupVisible = true
    },
    //关闭列表窗口
    onCloseList() {
      this.popupVisible = false
    },
    //列表Item点击事件
    onItemClick(audio) { 
      if(audio.isFree){
          this.getAudioDetail({lessonId:audio.id})
      }else{
          this.$toast({duration:2000,message:'你还未购买该专栏,请购买之后收听!!!'})
      } 
      this.popupVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.audioplay-container {
  display: flex;
  flex-direction: column;
  .cover {
    height: 750px;
    width: 100%;
    background-color: #d5d8de;
  }
  h3 {
    font-size: 32px;
    color: rgb(38, 38, 38);
    text-align: center;
    margin: 40px 0 0 0;
  }
  h4 {
    font-size: 24px;
    color: rgb(118, 118, 118);
    text-align: center;
    margin: 18px 0 0 0;
  }
  .tab-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 64px 120px 0;
    span {
      position: relative;
      left: 48px;
      top: -20px;
      font-size: 20px;
      color: rgb(146, 145, 150);
    }
    > :nth-child(1) img {
      width: 48px;
      height: 41px;
    }
    > :nth-child(2) img {
      width: 37px;
      height: 45px;
    }
    > :nth-child(3) img {
      width: 41px;
      height: 41px;
    }
    > :nth-child(4) img {
      width: 42px;
      height: 40px;
    }
  }

  .slider-container {
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 32px;

    > :nth-child(1) {
      margin-right: 20px;
      font-size: 20px;
      color: rgb(146, 145, 150);
    }
    > :nth-child(3) {
      font-size: 20px;
      color: rgb(146, 145, 150);
      margin-left: 20px;
    }
    input[type='range'] {
      // background-image: -webkit-linear-gradient(left,red, yellow);   //我咋记得是 to left
      background: #e5e5e5;
      /*-webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;*/
      -webkit-appearance: none; /*去除默认样式*/
      background-color: #ebeff4;
      /*border-radius: 15px;*/
      width: 80% !important;
      -webkit-appearance: none;
      height: 4px;
      padding: 0;
      border: none;
      /*input的长度为80%，margin-left的长度为10%*/
    }
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none; /*去除默认样式*/
      cursor: default;
      top: 0;
      height: 32px;
      width: 32px;
      transform: translateY(0px);
      /*background: none repeat scroll 0 0 #5891f5;*/
      background: url(../../assets/audio_play_slider.png) no-repeat;
      background-position: center;
      background-size: 32px;
      border-radius: 15px;
      // border: 5px solid #006eb3;
      /*-webkit-box-shadow: 0 -1px 1px #fc7701 inset;*/
    }
  }

  // .play-slider {
  //   padding: 0 24px;
  //   margin-top: 32px;
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   align-items: center;
  //   span {
  //     color: rgb(189, 192, 199);
  //     font-size: 20px;
  //   }
  //   .mu-slider {
  //     margin: 0 20px;
  //     .mu-slider-track {
  //       background-color: rgb(229, 229, 229);
  //     }
  //     .mu-slider-fill {
  //       background-color: rgb(255, 205, 126);
  //     }
  //     .mu-slider-thumb {
  //       background-image: url(../../assets/audio_play_slider.png);
  //       background-size: 32px;
  //       height: 32px;
  //       background-color: transparent;
  //       width: 32px;
  //       max-width: 32px;
  //       max-height: 32px;
  //       border: none;
  //     }
  //     .zero .mu-slider-thumb {
  //       border: none;
  //     }
  //   }
  // }

  .play-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 58px;
    padding: 0 36px 22px;
    box-sizing: content-box;
    .btn-item {
      display: flex;
      align-items: center;
      img {
        vertical-align: middle;
        margin: 0;
        width: 50px;
        height: 46px;
      }
    }
    .btn-item:nth-child(2) {
      margin-left: 40px;
    }
    .btn-item:nth-child(4) {
      margin-right: 40px;
    }
    :nth-child(3) {
      width: 90px;
      height: 90px;
      background-color: #ff8a1f;
      border-radius: 50%;
      justify-content: center;
      padding: 26px 29px 26px 30px;
      img {
        margin-left: 4px;
        width: 20px;
        height: 38px;
      }
    }
    .play-btn-active {
      padding: 26px 35px;
      img {
        margin-left: 4px;
        width: 31px;
        height: 38px;
      }
    }
  }
}
/*音频列表弹框*/
.van-popup {
  background-color: transparent;
  width: 100%;
  .play-list-container {
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    .list-header h3 {
      font-size: 14px;
      color: black;
      margin: 0;
      text-align: center;
      padding-bottom: 18px;
      padding-top: 18px;
    }
    hr {
      width: 100%;
      margin: 0;
      background-color: rgb(238, 238, 238);
      height: 1px; /*no*/
      border: none;
    }
    .list-container {
      overflow: scroll;
      padding-bottom: 10px;
      max-height: 358px;
    }
    .list-item {
      display: flex;
      flex-direction: column;
      padding: 0px 10px;
    }
    .list-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin-right: 10px;
        width: 14px;
        height: 14px;
      }
      p {
        padding: 17px 0;
        margin: 0;
        font-size: 14px;
        color: rgb(22, 35, 60);
      }
      .p-playing {
        font-size: 14px;
        color: rgb(255, 163, 47);
      }
    }
  }
  .list-close {
    font-size: 18px;
    text-align: center;
    width: 100%;
    height: 45px;
    color: rgb(38, 38, 38);
    line-height: 45px;
    background-color: rgb(245, 245, 245);
  }
}
/**收藏提示ICON*/ 
.van-icon-success {
  background-image: url(../../assets/audio_love_collect.png);
  background-size: 28px;
  background-repeat: no-repeat;
  margin: 1px auto 12px;
  height: 28px;
  width: 28px; 
}
.van-icon-success::before {
  content: none;
}
.van-toast--text{
  max-width: 80%;
  white-space: nowrap;
}

.van-icon-fail::before {
  content: none;
}
.van-toast--default .van-toast__text {
  padding-top: 0;
}
.van-toast--default{
  min-height: 0;
  width: auto;
}

.first-icon,
.last-icon {
  background-image: url(../../assets/audio_play_tip.png);
  background-size: 56px;
  background-repeat: no-repeat;
  margin: 0 auto;
  height: 56px;
  width: 56px;
} 
</style>
