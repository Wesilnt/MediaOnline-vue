<template>
  <div class="audioplay-container">
    <!-- 封面 -->
    <img class="cover" :src="cover">
    <!-- 主，副标题 -->
    <h3> 夏启的故事：王位应该传给谁</h3>
    <h4> 伍老师</h4>
    <!-- 中间tabbar -->
    <div class="tab-container">
      <div class="tab-item" @click="onCollect">
        <img :src="isLove?require('../../assets/audio_love_collect.png'):require('../../assets/audio_love_normal.png')">
      </div>
      <router-link to='/audio/audiodraft' class="tab-item" tag="div">
        <img src="../../assets/audio_play_manuscripts.png">
      </router-link>
      <router-link to="/audio/audiocmts" class="tab-item" tag="div">
        <span>10</span>
        <img src="../../assets/audio_play_comments.png">
      </router-link>
      <div class="tab-item" @click="onShare">
        <img src="../../assets/audio_play_share.jpg">
      </div>
    </div>
    <audio autoplay currentTime :paused="isPlaying">
      <!-- <source src="http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46" type="audio/mpeg"> 您的浏览器不支持 audio 元素。 -->
    </audio>
    <!-- 进度条 -->
    <div class="slider-container">
      <div slot="start" @click="onSliderTap">05:32</div>
      <mt-range @click.prevent="onSliderTap" v-model="rangeValue" :min="10" :max="90" :step="1" :bar-height="2"/>
      <div slot="end">06:23</div>
    </div>
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
      <div class="btn-item" :class="{'play-btn-active':isPlaying}" @click="onPlayPause">
        <img :src="isPlaying?require('../../assets/audio_play_pause.png'):require('../../assets/audio_play_play.png')">
      </div>
      <div class="btn-item" @click="onPlayNext">
        <img src="../../assets/audio_play_next.png">
      </div>
      <div class="btn-item" @click="onPlayList">
        <img src="../../assets/audio_play_list.png">
      </div>
    </div>
    <!-- 音频列表弹框 -->
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="play-list-container">
        <div class="list-header">
          <h3>播放列表</h3>
        </div>
        <hr>
        <div class="list-container">
          <div class="list-item" v-for="(item,i) of playList" :key="i">
            <div class="list-content" @click="onItemClick(i)">
              <img v-if="i==playIndex" src="../../assets/audio_list_playing.png">
              <p :class="{'p-playing':i==playIndex}">文学 | 为什么抱元科技没有食堂?</p>
            </div>
            <hr>
          </div>
        </div>
        <div class="list-close" @click="onCloseList">关闭</div>
      </div>
    </mt-popup>
    <!-- 分享框 -->
    <share-pop :show="showShare" @close="closeShare"/>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import SharePop from '../Share.vue'

export default {
  data() {
    return {
      play: true,
      isLove: true, //是否已收藏
      isSingle: true, //是否单个循环
      isPlaying: false, //是否正在播放
      popupVisible: false, //是否显示音频列表弹框
      playIndex: 0, //播放第几首
      showShare: false, //是否显示分享框
      playList: [
        //播放列表
        { isPlaying: true },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false },
        { isPlaying: false }
      ],
      rangeValue: 10,
      cover: '',
      progressColor: '#ff0000',
      background: 12,
      display: false
    }
  },
  components: {
    'share-pop': SharePop
  },
  created() {
    let AudioContext = window.AudioContext || window.webkitAudioContext
    let audioCtx = AudioContext ? new AudioContext() : ''
  },
  methods: {
    //进度条拖动
    sliderChange(value) {
      console.log(value)
      console.log(this.$refs.content)
    },
    onSliderTap(e) {
      console.log(SharePop)
    },
    //收藏
    onCollect() {
      this.isLove = !this.isLove
      Toast({
        message: this.isLove ? '已添加到我喜欢的' : '已取消喜欢',
        iconClass: this.isLove ? 'collect-icon' : ''
        // duration: -1
      })
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
    //切花播放模式
    onPlayMode() {
      this.isSingle = !this.isSingle
      Toast({
        message: this.isSingle ? '单曲循环' : '列表循环'
      })
    },
    //上一首
    onPlayPrv() {
      Toast({
        message: '这是第一条',
        iconClass: 'first-icon'
        // duration: -1
      })
    },
    //播放/暂停
    onPlayPause() {
      this.isPlaying = !this.isPlaying
    },
    //下一首
    onPlayNext() {
      Toast({
        message: '已经是最后一条',
        iconClass: 'last-icon'
        // duration: -1
      })
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
    onItemClick(i) {
      Toast('播放' + i + '首')
      this.playIndex = i
      this.popupVisible = false
    }
  }
}
</script>
<style lang="scss">
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
      left: 51px;
      top: -22px;
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
    .mt-range-thumb {
      background-image: url(../../assets/audio_play_slider.png);
      background-size: 32px;
      background-color: transparent;
      height: 32px;
      width: 32px;
    }
    .mt-range {
      flex: 1;
      .mt-range-runway {
        overflow: hidden;
        border-top-color: rgb(229, 229, 229);
        border-top-style: solid;
      }
      .mt-range-progress {
        background-color: rgb(255, 205, 126);
        height: 4px;
      }
    }
    > :nth-child(1) {
      margin-right: 20px;
    }
    > :nth-child(3) {
      margin-left: 20px;
    }
  }
  // .mt-range {
  //   > :nth-child(1),
  //   :nth-child(3) {
  //   }
  // margin-top: 32px;
  //   align-items: center;
  // padding: 0 24px;
  //   :nth-child(1),
  //   :nth-child(3) {
  //     color: rgb(189, 192, 199);
  //     font-size: 20px;
  //   }
  //   .mt-range-content {
  //     width: 74.66666667%;
  //     margin: 0 20px 0 20px;
  //     box-sizing: border-box;
  //   }
  //   .mt-range-runway {
  //     width: 100%;
  //     overflow: hidden;
  //     border-top-color: rgb(229, 229, 229);
  //     border-top-style: solid;
  //   }
  //   .mt-range-progress {
  //     background-color: rgb(255, 205, 126);
  //     height: 4px;
  //   }
  // .mt-range-thumb {
  //   background-image: url(../../assets/audio_play_slider.png);
  //   background-size: 32px;
  //   background-color: transparent;
  //   height: 32px;
  //   width: 32px;
  //     position: absolute;
  //     margin-top: -16px;
  // top: 50%;
  //     background-repeat: no-repeat;
  //   }
  // }

  .play-slider {
    padding: 0 24px;
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      color: rgb(189, 192, 199);
      font-size: 20px;
    }
    .mu-slider {
      margin: 0 20px;
      .mu-slider-track {
        background-color: rgb(229, 229, 229);
      }
      .mu-slider-fill {
        background-color: rgb(255, 205, 126);
      }
      .mu-slider-thumb {
        background-image: url(../../assets/audio_play_slider.png);
        background-size: 32px;
        height: 32px;
        background-color: transparent;
        width: 32px;
        max-width: 32px;
        max-height: 32px;
        border: none;
      }
      .zero .mu-slider-thumb {
        border: none;
      }
    }
  }
  .play-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 58px;
    padding: 0 36px;
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
      padding: 26px 35px;
      img {
        margin-left: 4px;

        width: 20px;
        height: 38px;
      }
    }
    .play-btn-active {
      padding: 26px 29px 26px 30px;
      img {
        margin-left: 4px;
        width: 31px;
        height: 38px;
      }
    }
  }
}
.mint-popup,
.mint-popup-bottom {
  background-color: transparent;
  width: 100%;
  .play-list-container {
    background-color: white;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    width: 100%;
    .list-header h3 {
      font-size: 28px;
      color: black;
      margin: 0;
      text-align: center;
      padding-bottom: 36px;
      padding-top: 36px;
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
      padding-bottom: 20px;
      max-height: 718px;
    }
    .list-item {
      display: flex;
      flex-direction: column;
      padding: 0px 20px;
    }
    .list-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin-right: 20px;
        width: 28px;
        height: 28px;
      }
      p {
        padding: 34px 0;
        margin: 0;
        font-size: 28px;
        color: rgb(22, 35, 60);
      }
      .p-playing {
        font-size: 28px;
        color: rgb(255, 163, 47);
      }
    }
  }
  .list-close {
    font-size: 36px;
    text-align: center;
    width: 100%;
    height: 90px;
    color: rgb(38, 38, 38);
    line-height: 90px;
    background-color: rgb(245, 245, 245);
  }
}

.collect-icon {
  background-image: url(../../assets/audio_love_collect.png);
  background-size: 56px;
  background-repeat: no-repeat;
  margin: 0 auto;
  height: 56px;
  width: 56px;
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
