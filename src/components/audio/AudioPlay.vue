<template>
<div>
   <div class="lazy-img-most audioplay-container" v-lazy:background-image="`${audio.coverPic}?imageView2/1/w/750/h/750`" ref='container'>
  
    <!-- 封面 -->
    <div class="controller-container" ref='controller'>
      <div class="empty-layout"></div>
      <!-- 主，副标题 -->
      <h3> {{audio.title}}</h3>
      <h4> {{audio.subTitle}}</h4>
      <!-- 中间tabbar -->
      <div class="tab-container" ref="tab">
        <div class="tab-container-collect" @click="onCollect"
         :style="{backgroundImage:isLike
         ? 'url('+require('../../assets/images/love_collect.png')+')'
         : 'url('+require('../../assets/images/audio_love_normal.png')+')'}">
        </div>
        <div v-if="'1007'!=columnType" class="tab-container-draft" @click="onDraft"/>
        <div  class="tab-container-comment" @click="toComment">
          <span>{{audio.commentCount}}</span>
        </div>
        <div class="tab-container-share" @click="onShare"/>
      </div>
      <!-- 进度条 -->
      <div class="slider-container"> 
        <div slot="start">{{currentTime | formatDuring}}</div>
        <van-slider style="width:80%;" 
          v-model="progress"
          :max="maxTime" 
          :min="0"
          bar-height="2px" 
          @change="onSliderChnage"/>
        <div slot="end">{{ maxTime | formatDuring}}</div>
      </div>
      <!-- 播放按钮 -->
      <div class="play-btns" ref="playButton">
        <div class="btn-item" :style="{backgroundImage:`url(${'single'==playMode?singleIcon:orderIcon})`}" @click="onPlayMode" />
        <div class="btn-item" :style="{backgroundImage:`url(${preIcon})`}" @click="onPlayPrv"/> 
        <div :class="{'btn-item':true,'play-btn-active':playing}"  @click="onPlayPause">
          <span :style="{backgroundImage:`url(${playing?playIcon:pauseIcon})`}"/>
        </div>
        <div class="btn-item" :style="{backgroundImage:`url(${nextIcon})`}" @click="onPlayNext"/>  
        <div class="btn-item" :style="{backgroundImage:`url(${listIcon})`}" @click="onPlayList"/>
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
    <share-pop :show="showShare" @close="closeShare" :courseId="courseId" :columnType ="columnType"/>
     <!--loading-->
     <div class="loading-container" v-show="isBuffering">
        <van-loading color="white" />
     </div>
  </div>
</div>

</template>
<script>
import { courseType } from '../../utils/config'
import SharePop from '../share/Share.vue'
import {createNamespacedHelpers,mapState as rootState, mapActions as rootActions} from 'vuex'
const {mapState,mapMutations, mapActions,mapGetters} = createNamespacedHelpers('audiotaskData/audioData')
export default {
  components: { 'share-pop': SharePop },
  data() {
    return {
      singleIcon:require('../../assets/images/audio_play_single.png'),
      orderIcon:require('../../assets/images/audio_play_sort.png'),
      listIcon:require('../../assets/images/audio_play_list.png'),
      preIcon:require('../../assets/images/audio_play_prv.png'),
      nextIcon:require('../../assets/images/audio_play_next.png'),
      playIcon:require('../../assets/images/audio_play_play.png'),
      pauseIcon:require('../../assets/images/icon_pause.png'),
      lessonId: this.$route.params.lessonId,       //单集ID
      courseId:this.$route.params.courseId,        //专栏ID
      columnType: this.$route.params.columnType,   //专栏类型 freezone(1001) 免费专区  onlineCourse(1005) 在线课堂 onlineVision(1003) 在线视野  reading(1007) 读书会 
      courseName: this.$route.query.courseName,    //专栏名
      isInit: true, 
      play: true,
      popupVisible: false,   //是否显示音频列表弹框
      showShare: false,      //是否显示分享框
      touching: false,       //slider触摸
      progress: 0 ,  
      subBottom:35,
      subTop:29,
      subTab:30,   
    }
  },
  computed: {
    ...rootState(['url','columnDetail']),
    ...mapState({
      isLike(state) {
        let like = state.isLike
        if (!this.isInit) {
          if (like)this.$toast.success({ duration: 2000, message: '已添加到我喜欢的' })
          else this.$toast.fail({ duration: 2000, message: '已取消喜欢' })
        }
        return state.isLike
      }
    }),
    ...mapGetters([
      'isLoading',
      'isBuffering',
      'audio',
      'audioId', 
      'currentTime',
      'maxTime',
      'playMode',
      'status',
      'playing',
      'singleSetList'
    ])
  },
  created() {
    this.isInit = true
    this.bindCourseName(this.courseName) 
    this.playAudio({ lessonId: this.lessonId, columnType: this.columnType }) 
    this.setShareInfo({courseId:this.courseId,columnType: this.columnType})
  }, 
  watch: {
    columnId:{
     handler:function(courseId){
        if(courseId>0) this.courseId = courseId
     },
     immediate: true
    },
    audioId: function(id) {
      this.lessonId = id
    },
    currentTime: function(value) {
      this.progress = (value * 100) / this.maxTime
      return value
    }
  },
  methods: { 
    ...mapActions([ 
      'setShareInfo',
      'postFavorite',
      'postUnFavorite',
      'playAudio',
      'pauseAudio',
      'setPlayMode',
      'seekTo',
      'pre',
      'next',
      'bindCourseName' 
    ]),
    ...mapMutations(['clearData']),
    //拖动进度改变进度
    onInputChange(e) {
      this.progress = e.target.value
    },  
    onSliderChnage() { 
      this.seekTo(this.progress*this.maxTime/100)
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
      this.$router.push({
        name: 'AudioDraft',
        params: {  
          columnType: this.columnType, 
          courseId: this.courseId,
          lessonid: this.lessonId 
        }
      })
    },
    //评论
    toComment() {
      this.$router.push({
        name: 'AudioCmts',
        params: {
          columnType: this.columnType, 
          courseId: this.courseId,
          lessonid: this.lessonId 
        }
      })
    },
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
      // let useraccessstatus =this.columnDetail ? this.columnDetail.userAccessStatus : 1001
      // if(this.singleSetList
      //   && 1001 != useraccessstatus 
      //   && 1003 != useraccessstatus 
      //   && 1008 != useraccessstatus) {
      //   let listenable  = true
      //   this.singleSetList.some(item=>{ 
      //       if(item.id == preId && !item.isFree){
      //         listenable = false   
      //         this.$toast.fail('这是第一条')
      //         return
      //       }
      //     }) 
      //     if(!listenable)return
      // } 
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
      // let useraccessstatus =this.columnDetail ? this.columnDetail.userAccessStatus : 1001
      // if( this.singleSetList
      //   && 1001 != useraccessstatus 
      //   && 1003 != useraccessstatus 
      //   && 1008 != useraccessstatus) {
      //     let listenable  = true 
      //     this.singleSetList.some(item=>{ 
      //       if(item.id == nextId && !item.isFree){
      //         listenable = false
      //         this.$toast.fail('已经是最后一条')
      //         return
      //       }
      //     }) 
      //   if(!listenable)return
      // } 
      if (nextId && -1 != nextId) {  
        this.next({ lessonId: nextId })
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
      this.$router.replace({
        name: 'AudioPlay',
        params: { id: audio.id },
        query: { courseId: this.courseId,columnType: this.columnType }
      })
      this.playAudio({ lessonId: audio.id, columnType: this.columnType })
    }
  },
  /**
   * 监听页面离开，设置本页面是否缓存起来， 如果跳转到评论页面, 设置本页面router:meta.keepAlive = true, 否则 = false
   */
  // beforeRouteLeave(to, from, next) {  
  //     console.log("updated")
  //   // 设置下一个路由的 meta
  //   from.meta.keepAlive = false // 让 頁面缓存，即不刷新
  //   next()
  // }, 
  /**
   * 监听页面进入，设置本页面是否缓存起来， 如果跳转到评论页面, 设置本页面router:meta.keepAlive = true, 否则 = false
   */
  // beforeRouteEnter(to, from, next) {   
  //   next(vm => {
  //   console.log(to,from)
  //     // 通过 `vm` 访问组件实例
  //     to.meta.keepAlive = false // 让 頁面缓存，即不刷新
  //   }) 
  // }
  mounted(){
     this.$nextTick(()=>{
        const {height,top,bottom}=this.$refs.controller.getBoundingClientRect()
        const {innerHeight,innerWidth}=window 
        this.$refs.controller.style.height =  innerHeight - innerWidth +'px'
        if(top<innerWidth)  this.$refs.container.style.height=top+'px'
     }) 
  }, 
  beforeDestroy(){
    this.clearData()
  }
}
</script>
<style lang="scss" >
.audioplay-container {
  background: #fff center/100% no-repeat;
  height: 0px;
  padding-bottom: 100%; 
  .controller-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: white;
  }
  .empty-layout{ 
    flex: 1;
    width: 100%;
  }
  h3 {
    line-height: 32px;
    font-size: 32px;
    color: rgb(38, 38, 38);
    text-align: center;
    padding-top: 40px;
  }
  h4 {
    line-height: 24px;
    color: rgb(118, 118, 118);
    text-align: center;
    padding-top: 18px;
  }
  .tab-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 40px 120px 0;
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
    padding-top: 32px;

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
     
    .van-slider {
      background-color: #e5e5e5;
      /deep/.van-slider__bar {
        max-width: 100%;
      }
      .van-slider__button {
        background: url('../../assets/images/audio_play_slider.png') center/18px
          no-repeat;
        border-radius: 15px;
        width: 18px;
        height: 18px;
      }
      .van-slider__bar {
        background-color: #ffcd7d;
      }
    }
  }
  .play-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 36px;
    box-sizing: content-box;
    align-items: center;
    min-height: 120px;
    max-height: 218px;
    height: 0;
    flex: 1;
    .btn-item {
      display: flex;
      align-items: center;
      background-size: 50px;
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;   
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
      display: flex; 
      align-items: center;

      // padding: 26px 29px 26px 30px;
      // padding: 26px 35px; 
      span {
        margin-left: 4px;
        width: 31px; 
        height: 38px;
        background-size: 31px 38px;
        background-repeat: no-repeat;
      }
    }
    .play-btn-active {
      // padding: 26px 35px; 
      span {
        margin-left: 2px; 
        background-repeat: no-repeat; 
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
    background-image: url('../../assets/images/love_collect.png');
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
//loading框
.loading-container {
  position: fixed;
  z-index: 9999;
  width: 180px;
  height: 180px;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 5px;
}
</style>
