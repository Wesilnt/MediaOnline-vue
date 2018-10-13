<template>
    <div>
        <SkeletonFullScreen  v-show="loading"/>
        <div v-show="!loading" class="videocourse-detail-container" id="detailmain" ref="detailmain">
            <!-- 播放器封面 -->
            <div class="video-detail-header lazy-img-most" v-lazy:background-image="`${coverPic|''}`">
                <div class="video-detail-header-right-top">
                    <img :src="isLike?collectIcon:unCollectIcon" class="video-detail-collect" alt="" @click="onCollectFavorite">
                    <img :src="require('../../assets/images/onlinecourse-play_ic_share.png')" class="video-detail-share" alt="" @click="onShareAction">
                </div>
                <a class="video-playbtn-icon" @click="handleVideoPlay">
                    开始播放
                </a>
                <!-- <img :src="require('../../assets/images/onlinecourse_video_ic_gift.png')" class="video-detail-header-gift" alt="">     -->
            </div>
            <!-- 播放器 -->
            <ScrollNavBar :bars="navBars" />
            <!-- 资料 -->
            <div class="video-detail-base">
                <div id="desc" ref="desc" class="video-detail-sction-title">
                    <h4>笔记</h4>
                </div>
                <CourseIntroduce :courseinfo="subTitle" />
            </div>
            <div class="video-detail-base" v-if="haveQuestionBOList">
                <div class="video-detail-sction-title">
                    <h4>自测题</h4>
                </div>
                <QuestionList @update="getVideoCourseDetail"/>
            </div>
            <!-- 目录 -->
            <div class="video-detail-base">
                <div id="tryCourse" ref="tryCourse" class="video-detail-sction-title">
                    <h4>目录</h4>
                </div>
                <playlist v-for="(item,index) of lessonList" :key="item.id" :iteminfo="item" :activeID="activeID" :lastindex="index == (lessonList.length - 1)" @jumpEvent="beActive"/>
            </div>
            <!-- 留言 -->
            <div class="video-detail-base">
                <div id="leaveMessage" ref="leaveMessage" class="video-detail-sction-title">
                    <h4>留言</h4>
                    <div class="video-detail-leavemessage" @click="toggleKeyboard(true)">
                        <img src="../../assets/images/onlinecourse_video_detail_ic_editor.png" alt="">
                        <span>我要留言</span>
                    </div>
                </div>
                <CommentList  :regionid="lessonId" :regiontype="2202" :haspadding="true" ></CommentList>
                <!-- <CommentItem class="video-course-comment" v-for="item in singleComments" :key="item.id" :comment="item" :unindent="true" :regiontype="2202"/> -->
            </div>
            <CommentBar :show="commentBarShow" v-on:toggle="toggleKeyboard"/>
            <Share :show="sharePageShow" :shareid="courseId" @close="cancelSharePage"></Share>
            <van-popup :lazy-render="false"
                       :click-overlay="handleVideoPause"
                       v-model="videoShow" class="video-popup">
                <video class="videoitem"
                       ref="videoitem"
                       :src="videoUrl"
                       controls="controls"
                       width="100%"
                       preload="auto"
                       webkit-playsinline
                       playsinline="true"
                       x-webkit-airplay="allow"
                       x5-video-player-type="h5"
                       x5-video-player-fullscreen="true"
                       x5-video-orientation="portraint"
                       style="object-fit:fill"></video>
            </van-popup>
        </div>
    </div>
</template>

<script>
import enableInlineVideo from 'iphone-inline-video'
import CommentList from '../../components/comment/CommentList.vue'
import ScrollNavBar from '../../components/ScrollNavBar'
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import playlist from './components/playlist.vue'
import CommentItem from '../../components/comment/CommentItem.vue'
import videoComment from '../../components/video-comment.vue'
import QuestionList from './QuestionList'
import CommentBar from '../../components/CommentBar'
import SkeletonFullScreen from '../../components/SkeletonFullScreen'
import Share from '../../components/share/Share.vue'
import { createNamespacedHelpers } from 'vuex'
import { mapActions as mapRootActions, mapState as rootState } from 'vuex'
const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('videoCourseDetailData')
export default {
  name: 'VideoCourseDetail',
  components: {
    CourseIntroduce,
    playlist,
    'video-comment': videoComment,
    CommentItem,
    QuestionList,
    CommentBar,
    Share,
    ScrollNavBar,
    CommentList,
    SkeletonFullScreen, 
  },
  data() {
    return {
      lessonId: this.$route.params.lessonId,
      navBars: [
        {
          title: '资料',
          ref: 'desc'
        },
        {
          title: '目录',
          ref: 'tryCourse'
        },
        {
          title: '留言',
          ref: 'leaveMessage'
        }
      ],
      // navbar: ['资料', '目录', '留言'],
      // navbarFixed: false, //控制navbar是否吸顶
      // selected: 0,
      currentVideoTime: 0,
      inputValue: '',
      lockIcon: require('../../assets/images/onlinecourse_lock.jpg'), //未解锁
      unlockIcon: require('../../assets/images/onlinecourse_unlock.jpg'), //已解锁
      collectIcon: require('../../assets/images/onlinecourse_love_highlight.png'), //已收藏
      unCollectIcon: require('../../assets/images/onlinecourse_love_normal.png'), //未搜藏
      //视频播放相关属性
      timer: 0, //定时器

      loaclPlayTotalTime: 0, //本地累计播放时长
      localPlayTime: 0, //本地播放位置
      playStartTime: null,

      isAchieveQuestion: false, //是否完成自测题
      // 我要留言显示
      commentBarShow: false,
      //分享页面显示
      sharePageShow: false,
      //控制播放的状态
      videoShow: false,
      videoElem: null
    }
  },
  computed: {
    ...rootState(['url']),
    ...mapState([
      'loading',
      'lessonList', //目录课程
      'coverPic', //视频背景图
      'audioUrl', //音频地址
      'videoUrl', //视频地址
      'courseId', //专栏ID
      'id', //单集ID
      'singleComments',
      'subTitle', //笔记
      'totalTime', //服务器返回的视频总长度
      'isFree',
      'isLike',
      'questionBOList', //自测题列表
      'createTime',
      'isAchieveCollect', //是否完成收藏
      'collectionId', //收藏Id
      'learnTime', //服务器上次播放位置
      'learnTotalTime', //服务器累计播放时长
      'deblockQuestion',
      'progress',
      'activeID' //当前播放的单集ID
    ]),
    ...mapGetters(['haveQuestionBOList'])
  },
  mounted() {
    //视频播放器相关监听
    this.videoElem = this.$refs.videoitem
    enableInlineVideo(this.videoElem)

    //视频进度
    this.videoElem.addEventListener('timeupdate', this.getVideoProgress)
    this.videoElem.addEventListener('play', this.handleVideoPlay)
    this.getUserInfo().then(user => {
      //拼装分享内容
      this.shareData = {
        link: this.url + `/#/videoColumnDetail/${this.courseId}`,
        title: `${this.courseName}`,
        desc: '你一定会爱上国学课...',
        successCB: () => console.log('分享回调成功'),
        cancelCB: () => console.log('分享回调失败')
      }
      this.setWxShareFriend(this.shareData)
      this.setWxShareZone(this.shareData)
    })
  },
  beforeDestroy() {
    this.videoElem.removeEventListener('timeupdate', this.getVideoProgress)
    this.videoElem.removeEventListener('play', this.handleVideoPlay)
    this.resetLoading(true)
  },
  created() {
    const { lessonId } = this.$route.params
    this.getVideoCourseDetail({ lessonId })
    this.handleRegisterWxConfig()
    const { fullPath } = this.$route
    this.registerWxConfig({
      fullPath,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })
  },
  methods: {
    ...mapMutations([
      'updateLocalVideoData',
      'bindQuestionBymyself',
      'bindActiveId',
      'resetLoading'
    ]),
    ...mapActions([
      'getVideoCourseDetail',
      'getLessonListByCourse',
      'getCommentList',
      'doCollectFavorite',
      'unCollectFavorite',
      'postComment'
    ]),
    ...mapRootActions([
      'registerWxConfig',
      'getUserInfo',
      'registerWxConfig',
      'setWxShareFriend',
      'setWxShareZone'
    ]),
    handleRegisterWxConfig: function() {
      const { fullPath } = this.$route
      this.registerWxConfig({
        fullPath,
        jsApiList: [
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'translateVoice'
        ]
      })
    },
    //播放视频
    handleVideoPlay() {
      const videoData = JSON.parse(localStorage.getItem(this.id))
      const { historyPlayPosition } = videoData
      const { paused } = this.videoElem
      this.videoShow = true

      if (paused) {
        console.dir(this.videoElem)
        this.videoElem.play()
      }
      this.videoElem.currentTime =
        historyPlayPosition >= this.videoElem.duration ? 0 : historyPlayPosition
      // 记录当前播放时间戳
      this.playStartTime = new Date()
      this.loaclPlayTotalTime = Math.round(parseFloat(videoData.playTotalTime))
    },
    handleVideoPause() {
      const { paused } = this.videoElem
      if (!paused) this.videoElem.pause()
    },
    getVideoProgress({ target }) {
      const { currentTime, paused, duration, readyState } = target
      // console.log('0-0-0-0-9-9--9-')
      // console.dir(target.networkState)
      // console.dir(target.readyState)
      // console.dir(target.error)
      /*
      视频存储数据逻辑
      */

      // 获取播放累计时长
      if (readyState == 4 || readyState == 3) {
        // console.log('代码是否能走到这里~~~~~~~~')
        const durationPlayingTime = this.playStartTime
          ? (new Date() - this.playStartTime) / 1000
          : 0
        // console.log(this.playStartTime)
        // this.loaclPlayTotalTime += durationPlayingTime
        // const newVideoData = JSON.parse(localStorage.getItem(this.id))
        const newTotalTime = this.loaclPlayTotalTime + durationPlayingTime
        // const newTotalTime =
        //   durationPlayingTime + Math.round(parseFloat(newVideoData.playTotalTime))
        let newPosition = currentTime
        // let newPosition = durationPlayingTime + Math.round(parseFloat(newVideoData.historyPlayPosition))
        //累计播放时长大于视频总长度.将历史播放进度置为0
        if (newPosition > this.totalTime) {
          newPosition = 0
        }
        const obj = {
          playTotalTime: newTotalTime,
          historyPlayPosition: newPosition
        }
        // console.log('代码走到这里这阿发0=0=0=00=')
        // console.log(obj)
        localStorage.setItem(this.id, JSON.stringify(obj))
        /*
        自测题逻辑
        */
        //  播放累计时长大于视频的总时长，解锁
        // console.log(newTotalTime,currentTime, this.totalTime * 0.7)
        if (!this.deblockQuestion && newTotalTime >= this.totalTime * 0.7) {
          console.log('deblockQuestion ===', this.deblockQuestion)
          console.log('newTotalTime ===', newTotalTime)
          this.bindQuestionBymyself({ deblockQuestion: true })
        }
      } else {
        const videoData = JSON.parse(localStorage.getItem(this.id))
        this.playStartTime = new Date()
        this.loaclPlayTotalTime = Math.round(
          parseFloat(videoData.playTotalTime)
        )
      }
      if (paused) {
        // 进度条 未解锁就动态显示
        if (!this.deblockQuestion && duration) {
          const percent = (this.loaclPlayTotalTime / duration) * 100
          let progress = percent <= 100 ? percent : 100
          this.bindQuestionBymyself({ progress })
          console.log('loaclPlayTotalTime ===', this.loaclPlayTotalTime)
          console.log('progress ===', progress)
        }
      }
    },
    //显示键盘
    toggleKeyboard(commentBarShow, inputer) {
      this.commentBarShow = commentBarShow
      if (inputer) {
        const { lessonId } = this.$route.params
        const params = {
          regionId: lessonId,
          regionType: 2202,
          commentType: 3301,
          content: inputer
        }
        this.postComment(params)
      }
    },
    //收藏
    onCollectFavorite() {
      const { lessonId } = this.$route.params
      if (this.isLike) {
        this.unCollectFavorite(lessonId)
      } else {
        this.doCollectFavorite(lessonId)
      }
    },
    onShareAction() {
      console.log('点击分享')
      this.sharePageShow = true
    },
    cancelSharePage(data) {
      console.log('关闭分享页面')
      this.sharePageShow = false
    },
    //点击目录
    beActive(lessonId) {
      if (this.activeID !== lessonId) {
        this.getVideoCourseDetail({ lessonId })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.videocourse-detail-container {
  background-color: #fff;
}
//header
.video-detail-header {
  width: 100%;
  height: 422px;
  // background-color: rgb(198, 72, 172);
  position: relative;
  background: #f6f6f6 center/cover no-repeat;
}
.video-detail-header-right-top {
  position: absolute;
  top: 26px;
  right: 30px;
  display: flex;
  flex-direction: row;
}
.video-detail-collect {
  width: 36px;
  height: 30px;
}
.video-detail-share {
  width: 30px;
  height: 30px;
  margin-left: 24px;
}
.video-playbtn-icon {
  position: absolute;
  left: 30px;
  bottom: 30px;
  width: 196px;
  height: 60px;
  line-height: 60px;
  border: 2px solid #fff;
  padding-left: 30px;
  text-align: center;
  border-radius: 60px;
  color: #fff;
  background: url('../../assets/images/onlinecourse-video-detail-header.jpg')
    32px center/20px no-repeat;
}
.video-detail-header-gift {
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
}
//导航条
.video-detail-navbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  padding-top: 28px;
  // padding-bottom: 28px;
  text-align: center;
  z-index: 999;

  &.isFixed {
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .video-detail-navbar-item {
    width: 100px;
    padding-bottom: 22px;
    font-size: 28px;
    color: rgb(62, 62, 83);
  }

  .video-detail-navbar-item.selected {
    font-size: 28px;
    color: rgb(255, 163, 47);
    border-bottom: 6px solid rgb(255, 163, 47);
  }
}

//资料
.video-detail-base {
  padding: 0 40px 24px;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
}

.video-detail-sction-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 32px;
  text-align: left;
  color: rgb(62, 62, 83);
  margin-top: 48px;

  h4 {
    font-size: 32px;
    color: rgb(62, 62, 83);
  }
}
//我要留言
.video-course-comment {
  margin-top: 56px;
}
.video-detail-leavemessage {
  width: 220px;
  height: 60px;
  border-radius: 30px;
  background-color: rgb(247, 247, 247);
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin: 16px 12px 16px 30px;
  }

  input {
    font-size: 32px;
    color: rgb(255, 163, 47);
  }
}
</style>
