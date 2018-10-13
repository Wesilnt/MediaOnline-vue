<template>
  <div class="lazy-img-most audioplay-container" v-lazy:background-image="audio.coverPic">
    <!-- 封面 -->
    <div class="controller-container">
      <!-- 主，副标题 -->
      <h3> {{audio.title}}</h3>
      <h4> {{audio.subTitle}}</h4>
      <!-- 中间tabbar -->
      <div class="tab-container">
        <div class="tab-container-collect" @click="onCollect"
         :style="{backgroundImage:isLike
         ? 'url('+require('../../assets/images/audio_love_collect.png')+')'
         : 'url('+require('../../assets/images/audio_love_normal.png')+')'}">
        </div>
        <div v-if="'Readings'!=playType" class="tab-container-draft" @click="onDraft"/>
        <div  class="tab-container-comment" @click="toComment">
          <span>{{audio.commentCount}}</span>
        </div>
        <div class="tab-container-share" @click="onShare"/>
      </div>
      <!-- 进度条 -->
      <div class="slider-container"> 
        <div slot="start">{{currentTime | formatDuring}}</div>
      <!-- <input type="range" 
        @input="onInputChange" 
        :value="touching?progress:currentTime(touching,progress)" 
        :min="0" 
        :max="maxTime"  
        :style="{background:touching
        ?'linear-gradient(to right,#FFCD7D ' + parseInt(progress * 100 / maxTime) + '%,  #E5E5E5 1%, #E5E5E5'
        : 'linear-gradient(to right,#FFCD7D ' + parseInt(currentTime(touching,progress) * 100 / maxTime) + '%,  #E5E5E5 1%, #E5E5E5'}"
        @touchstart="handleTouchStart"
        @touchcancel="handleTouchCancel"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"/> -->
        <van-slider style="width:80%;" 
          v-model="progress"
          :max="maxTime" 
          :min="0"
          :step="100/maxTime" 
          bar-height="2px" 
          @change="onSliderChnage"/>
        <div slot="end">{{ maxTime | formatDuring}}</div>
      </div>
      <!-- 播放按钮 -->
      <div class="play-btns">
        <div class="btn-item" @click="onPlayMode">
          <img :src="'single'==playMode?require('../../assets/images/audio_play_single.png'):require('../../assets/images/audio_play_sort.png')">
        </div>
        <div class="btn-item" @click="onPlayPrv">
          <img src="../../assets/images/audio_play_prv.png">
        </div>
        <div :class="{'play-btn-active':playing}" class="btn-item" @click="onPlayPause">
          <img :src="playing?require('../../assets/images/audio_play_play.png'):require('../../assets/images/audio_play_pause.png')">
        </div>
        <div class="btn-item" @click="onPlayNext">
          <img src="../../assets/images/audio_play_next.png">
        </div>
        <div class="btn-item" @click="onPlayList">
          <img src="../../assets/images/audio_play_list.png">
        </div>
      </div>
    </div>
    <!-- 音频列表弹框 -->

    <van-popup v-model="popupVisible" position="bottom"  close-on-click-overlay >
      <div class="play-list-container">
        <div class="list-header">
          <h3>播放列表</h3>
        </div>
        <hr>
        <div class="list-container">
          <div v-for="(item,index) of singleSetList" :key="item.id" class="list-item">
            <div class="list-content" @click="onItemClick(item)">
              <img v-if="lessonId==item.id" src="../../assets/images/audio_list_playing.png">
              <p :class="{'p-playing':lessonId==item.id}">{{item.title}}</p>
            </div>
            <hr v-show="singleSetList.length-1 != index">
          </div>
        </div>
        <div class="list-close" @click="onCloseList">关闭</div>
      </div>
    </van-popup>
    <!-- 分享框 -->
    <share-pop :show="showShare" @close="closeShare" :shareInfo="shareData" />
    <van-loading color="white" />
  </div>
</template>
<script>
import SharePop from '../share/Share.vue'
import { createNamespacedHelpers ,mapState as rootState, mapActions as rootActions} from 'vuex'
const { mapState,mapMutations, mapActions, mapGetters } = createNamespacedHelpers('audiotaskData/audioData')

export default {
  components: { 'share-pop': SharePop },
  data() {
    return {
      shareData: null, //分享数据
      lessonId: this.$route.params.id,
      hiddenDraft: this.$route.query.hiddenDraft,
      playType: this.$route.query.playType,       //播放类型 FreeZone 免费专区  OnlineVision 在线视野  Readings 读书会
      courseName: this.$route.query.courseName,   //专栏名
      isInit: true,
      play: true, 
      popupVisible: false, //是否显示音频列表弹框 
      showShare: false, //是否显示分享框
      touching: false, //slider触摸
      progress: 0,     
    }
  },
  computed: {
    ...rootState(['url']),
    ...mapState({
      isLike(state) {
        let like = state.isLike
        if (!this.isInit) {
          if (like)
            this.$toast.success({ duration: 2000, message: '已添加到我喜欢的' })
          else this.$toast.fail({ duration: 2000, message: '已取消喜欢' })
        }
        return state.isLike
      },
      singleSetList: 'singleSetList'
    }),
    ...mapGetters([
      'audio',
      'audioId',
      'courseId',
      'currentTime',
      'maxTime',
      'playMode',
      'status',
      'playing'
    ])
  },
  created() {
    this.isInit = true 
    this.bindCourseName(this.courseName)
    this.toggleFloatButton(false)  //隐藏悬浮按钮
    this.playAudio({ lessonId: this.lessonId ,playType:this.playType})
    const { fullPath } = this.$route
    this.registerWxConfig({fullPath,jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']})
  },
  mounted(){  
     this.getUserInfo()
    .then(user=>{ 
      let link = ''
      switch (this.playType) { 
        case 'OnlineVision':
          link = this.url +`/#/home/visionDetail/${this.courseId}`
          break
        case 'Readings':
           link=this.url + `/#/home/readings/book/${this.courseId}`
          break 
      } 
      //拼装分享内容
      this.shareData = {
        link, 
        title: `${this.courseName}`,
        desc: '你一定会爱上国学课...',
        successCB: () => console.log('分享回调成功') ,
        cancelCB: () =>  this.$toast('分享回调失败')
      } 
      this.setWxShareFriend(this.shareData)
      this.setWxShareZone(this.shareData)
    }) 
  },
  watch: {
    audioId: function(id) {
      this.lessonId = id
    },
    currentTime: function(value) {
      this.progress = (value * 100) / this.maxTime 
      return value
    }
  },
  methods: {
      ...rootActions(['getUserInfo','registerWxConfig', 'setWxShareFriend', 'setWxShareZone']), 
    ...mapActions([
      'getAudioDetail',
      'postFavorite',
      'postUnFavorite',
      'playAudio',
      'pauseAudio',
      'setPlayMode',
      'seekTo',
      'pre',
      'next',
      'toggleFloatButton',
      'bindCourseName'
    ]), 
    //拖动进度改变进度
    onInputChange(e) {
      this.progress = e.target.value
    },
    onSliderChnage() {
      this.seekTo(this.progress)
    },
    handleTouchStart(e) {
      this.touching = true
      console.log(e)
    },
    handleTouchMove() {},
    handleTouchEnd(e) {
      this.touching = false
      this.seekTo(this.progress)
    },
    handleTouchCancel() {
      this.touching = false
    },
    //收藏
    onCollect() {
      this.isInit = false
      if (this.isLike) {
        this.postUnFavorite({ lessonId: this.lessonId })
      } else {
        this.postFavorite({ lessonId: this.lessonId })
      }
    },
    //查看文稿
    onDraft() {
      this.$router.push({name: 'AudioDraft',params: { lessonid: this.lessonId }})
    },
    //评论
    toComment() {
      this.$router.push({name: 'AudioCmts',params: { lessonid: this.lessonId }})
    },
    //分享
    onShare() { 
      this.getUserInfo()
      .then(user=>{
        let link = ''
          switch (this.playType) { 
            case 'OnlineVision':
              link = this.url +`/home/visionDetail/${this.courseId}`
              break
            case 'Readings':
              link=this.url + `/home/readings/book/${this.courseId}`
              break 
          } 
          //拼装分享内容
          this.shareData = {
            link: this.url + `/#/audio/audioplay/${this.lessonId}`, 
            title: `我是${user.nickName}, 我想免费领取《${this.courseName}》,来帮我点赞吧`,
            desc: '你一定会爱上国学课...',
            successCB: () => console.log('分享回调成功') ,
            cancelCB: () =>  this.$toast('分享回调失败')
          } 
          this.setWxShareFriend(this.shareData)
          this.setWxShareZone(this.shareData)
          this.showShare = true
      })
    },
    //分享框关闭
    closeShare() {
      this.showShare = false
    },
    //切换播放模式
    onPlayMode() {
      let mode = this.playMode == 'single' ? 'order' : 'single'
      this.$toast(mode == 'single' ? '单曲循环' : '列表循环')
      this.setPlayMode(mode)
    },
    //播放/暂停
    onPlayPause() {
      this.playAudio()
    },
    //上一首
    onPlayPrv() {
      if (!this.audio) return
      let preId = this.audio.preLessonId
      if (preId && -1 != preId) {
        this.pre({ lessonId: preId })
      } else {
        this.$toast.fail('这是第一条')
      }
    },
    //下一首
    onPlayNext() {
      if (!this.audio) return
      let nextId = this.audio.nextLessonId
      if (nextId && -1 != nextId) {
        this.pre({ lessonId: nextId })
      } else {
        this.$toast.fail('已经是最后一条')
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
      this.isInit = true
      this.popupVisible = false
      if (audio.isFree) {
        this.$router.push({ name: 'AudioPlay',params: { id: audio.id },query:{playType:this.playType}})
        this.playAudio({ lessonId: audio.id })
      } else {
        this.$toast({duration: 2000, message: '你还未购买该专栏,请购买之后收听!'})
      }
    }
  },
  /**
   * 监听页面离开，设置本页面是否缓存起来， 如果跳转到评论页面, 设置本页面router:meta.keepAlive = true, 否则 = false
   */
  beforeRouteLeave(to, from, next) {  
      this.toggleFloatButton(from.name =='AudioPlay')  //隐藏悬浮按钮
     // 设置下一个路由的 meta
      from.meta.keepAlive = (to.name === 'AudioCmts')  // 让 頁面缓存，即不刷新
      next()
  },
  beforeDestroy(){
    //  this.toggleFloatButton(true)  //隐藏悬浮按钮
  }
}
</script>
<style lang="scss" >
.audioplay-container {
  display: flex;
  flex-direction: column;
  background: transparent center no-repeat;
  background-size: 100vw 100vw;
  height: 0px;
  padding-bottom: 100%;
  .cover {
    height: 750px;
    width: 100%;
    background-color: #d5d8de;
  }
  .controller-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
  }
  h3 {
    line-height: 32px;
    font-size: 32px;
    color: rgb(38, 38, 38);
    text-align: center;
    margin: 40px 0 0 0;
  }
  h4 {

    line-height: 24px;
    color: rgb(118, 118, 118);
    text-align: center;
    margin: 18px 0 0 0;
  }
  .tab-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 60px 120px 0;
    &-collect {
      width: 48px;
      height: 41px;
      background-repeat: no-repeat;
      background-size: 48px 41px;
    }
    &-draft {
      width: 37px;
      height: 45px;
      background-repeat: no-repeat;
      background-size: 37px 45px;
      background-image: url('../../assets/images/audio_play_manuscripts.png');
    }
    &-comment {
      position: relative;
      width: 41px;
      height: 41px;
      background-repeat: no-repeat;
      background-size: 41px 41px;
      background-image: url('../../assets/images/audio_play_comments.png');
      span {
        left: 30px;
        top: -10px;
        position: absolute;
        font-size: 20px;
        color: rgb(146, 145, 150);
      }
    }
    &-share {
      width: 42px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: 41px 41px;
      background-image: url('../../assets/images/audio_play_share.jpg');
    }
  }

  .slider-container {
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 32px;

    > :nth-child(1) {
      margin-right: 30px;
      font-size: 20px;
      color: rgb(146, 145, 150);
    }
    > :nth-child(3) {
      font-size: 20px;
      color: rgb(146, 145, 150);
      margin-left: 30px;
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
      background: url(../../assets/images/audio_play_slider.png) center/32px no-repeat;
      border-radius: 15px;
      // border: 5px solid #006eb3;
      /*-webkit-box-shadow: 0 -1px 1px #fc7701 inset;*/
    }
    .van-slider {
      background-color: #E5E5E5;
      /deep/.van-slider__bar {
        max-width: 100%;
      }
      .van-slider__button {
        background: url(../../assets/images/audio_play_slider.png) center/18px no-repeat;
        border-radius: 15px;
        width: 18px;
        height: 18px;
      }
      .van-slider__bar{
        background-color: #FFCD7D;
      }
    }
  }
  .play-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 58px;
    padding: 0 36px 70px;
    box-sizing: content-box;
    .btn-item {
      display: flex;
      align-items: center;
      img {
        vertical-align: middle;
        margin: 0;
        width: 50px; 
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
      // padding: 26px 29px 26px 30px;
      // padding: 26px 35px;
      img {
        margin-left: 4px;
        width: 30px; 
      }
    }
    .play-btn-active {
      // padding: 26px 35px;
      img {
        margin-left: 4px;
        width: 20px; 
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

.van-toast {
  /deep/.van-icon-success {
    background-image: url('../../assets/images/audio_love_collect.png');
    background-size: 28px;
    background-repeat: no-repeat;
    margin: 1px auto 12px;
    height: 28px;
    width: 28px;
  }
  .van-icon-success::before {
    content: none;
  }
  .van-toast--text {
    max-width: 80%;
    white-space: nowrap;
    min-width: inherit;
    width: auto;
  }

  .van-icon-fail::before {
    content: none;
  }
  .van-toast__text {
    padding-top: 0;
    width: auto;
  }

  .van-list__loading {
    width: 100vw;
  }
}
.van-toast.van-toast--default {
  min-height: 0;
  width: auto;
  min-width: inherit;
  white-space: nowrap;
}
.van-toast.van-icon-fail {
  background-image: url('../../assets/images/audio_play_tip.png');
  background-size: 28px;
  background-repeat: no-repeat;
  margin: 1px auto 12px;
  height: 28px;
  width: 28px;
}
</style>
