<template>
    <div>
        <SkeletonFullScreen  v-show="loading"/>
        <div v-show="!loading" class="videocourse-detail-container" id="detailmain" ref="detailmain">
            <!-- 播放器封面 -->
            <div class="lazy-img-most  video-detail-header"  v-lazy:background-image="`${coverPic}?imageView2/1/format/jpg`">
                <div class="video-detail-header-bg">
                    <div class="video-detail-header-right-top">
                        <img :src="isLike?collectIcon:unCollectIcon" class="video-detail-collect" alt="" @click="onCollectFavorite">
                        <img :src="require('../../assets/images/onlinecourse-play_ic_share.png')" class="video-detail-share" alt="" @click="onShareAction">
                    </div>
                    <a class="video-playbtn-icon" @click="handleVideoPlay">
                        开始播放
                    </a>
                    <!-- <img :src="require('../../assets/images/onlinecourse_video_ic_gift.png')" class="video-detail-header-gift" alt="">     -->
                </div>

            </div>
            <!-- navbar -->
            <ScrollNavBar :bars="navBars" />
            <!-- 资料 -->
            <div id="desc">
                <div class="video-detail-base" v-if="manuscript">
                    <div class="video-detail-sction-title">
                        <h4>笔记</h4>
                    </div>
                    <CourseIntroduce :courseinfo="manuscript"/>
                </div>
                <div class="video-detail-base" v-if="haveQuestionBOList">
                    <div class="video-detail-sction-title">
                        <h4>自测题</h4>
                    </div>
                    <QuestionList @update="getVideoCourseDetail" :key="id"/>
                </div>
            </div>
            <!-- 目录 -->
            <div class="video-detail-base" id="tryCourse">
                <div  ref="tryCourse" class="video-detail-sction-title">
                    <h4>目录</h4>
                </div>
                <playlist v-for="(item,index) of lessonList" :key="item.id" :iteminfo="item" :activeID="activeID" :lastindex="index == (lessonList.length - 1)" @jumpEvent="beActive"/>
            </div>
            <!-- 留言 -->
            <div class="video-detail-base" id="leaveMessage">
                <div  ref="leaveMessage" class="video-detail-sction-title">
                    <h4>留言</h4>
                    <div class="video-detail-leavemessage" @click="toggleKeyboard(true)">
                        我要留言
                    </div>
                </div>
                <CommentList  :regionid="lessonId" :regiontype="2202" :unindent="true" ></CommentList>
                <!-- <CommentItem class="video-course-comment" v-for="item in singleComments" :key="item.id" :comment="item" :unindent="true" :regiontype="2202"/> -->
            </div>
            <CommentBar :show="commentBarShow" v-on:toggle="toggleKeyboard"/>
            <Share :show="sharePageShow" :courseId="courseId" :columnType ="'1005'" @close="cancelSharePage"></Share>
            <div v-show="videoShow" class='video-wrapper popup-modal-white' @click="handleVideoPause">
               <video class="videoitem"
                       ref="videoitem"
                       :src="videoUrl"
                       controls="controls"
                       width="100%"
                       preload="auto"
                       style="object-fit:fill"></video>
            </div>
            <!-- <van-popup :lazy-render="false"
                       position="top"
                       @click-overlay="handleVideoPause"
                       v-model="videoShow" class="video-popup"
                       overlay-class="popup-modal-white">
               
            </van-popup> -->
        </div>
    </div>
</template>

<script>
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
    SkeletonFullScreen
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
      collectIcon: require('../../assets/images/love_collect.png'), //已收藏
      unCollectIcon: require('../../assets/images/onlinecourse_love_normal.png'), //未搜藏
      //视频播放相关属性
      timer: 0, //定时器

      localPlayTotalTime: 0, //本地累计播放时长
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
    ...rootState(['url', 'columnDetail']),
    ...mapState([
      'loading',
      'lessonList', //目录课程
      'coverPic', //视频背景图
      'audioUrl', //音频地址
      'videoUrl', //视频地址
      'courseId', //专栏ID
      'id', //单集ID
      'singleComments',
      'manuscript', //笔记
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
    //视频进度
    this.videoElem.addEventListener('timeupdate', this.getVideoProgress)
    this.videoElem.addEventListener('play', this.handleVideoPlay)
    this.videoElem.addEventListener('error',this.catchError)
    this.videoElem.addEventListener('contextmenu', () => {
      return false
    })
  },
  beforeDestroy() {
    this.videoElem.removeEventListener('timeupdate', this.getVideoProgress)
    this.videoElem.removeEventListener('play', this.handleVideoPlay)
    this.videoElem.removeEventListener('error',this.catchError)
    this.resetLoading(true)
  },
  created() {
    const { lessonId } = this.$route.params
    this.getVideoCourseDetail({ lessonId, loading: true })
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
    ...mapRootActions(['getUserInfo', 'setWxShareFriend', 'setWxShareZone']),
    catchError(error){
      console.log('抓取错误')
      console.log(error)
    },
    //播放视频
    handleVideoPlay() {
      const videoData = JSON.parse(localStorage.getItem(this.id))
      const { historyPlayPosition } = videoData
      const { paused } = this.videoElem
      this.videoShow = true
      // 有些苹果手机 弹窗和视频同时进行会在视频上面有背景色遮罩(微信浏览器)
      setTimeout(()=>{
        paused && this.videoElem.play()
      this.videoElem.currentTime =
        historyPlayPosition >= this.videoElem.duration ? 0 : historyPlayPosition
      // 记录当前播放时间戳
      this.playStartTime = new Date()
      this.localPlayTotalTime = Math.round(parseFloat(videoData.playTotalTime))
      },100)
      
    },
    handleVideoPause() {
      this.videoShow=false
      const { paused } = this.videoElem
      if (!paused) this.videoElem.pause()
      //刷新页面
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      const { lessonId } = this.$route.params
      this.getVideoCourseDetail({ lessonId })
    },
    getVideoProgress({ target }) {
      const { currentTime, paused, duration, readyState } = target
      /*
      视频存储数据逻辑
      */
      // 获取播放累计时长
      if (readyState == 4 || readyState == 3) {
        // console.log('代码是否能走到这里~~~~~~~~')
        // console.log(this.playStartTime)
        // this.localPlayTotalTime += durationPlayingTime
        // const newVideoData = JSON.parse(localStorage.getItem(this.id))
        // const newTotalTime =
        //   durationPlayingTime + Math.round(parseFloat(newVideoData.playTotalTime))
        // let newPosition = durationPlayingTime + Math.round(parseFloat(newVideoData.historyPlayPosition))
        //累计播放时长大于视频总长度.将历史播放进度置为0
        const durationPlayingTime = this.playStartTime
          ? (new Date() - this.playStartTime) / 1000
          : 0

        const newTotalTime = this.localPlayTotalTime + durationPlayingTime
        let newPosition = currentTime
        const obj = {
          playTotalTime: newTotalTime,
          historyPlayPosition: newPosition
        }
        console.log('实时存储的播放数据 = ')
        console.log(obj)
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
        console.log('0-0-0-0-0-0-0-0-0-0')
        console.log(videoData)
        if(videoData){
          this.localPlayTotalTime = Math.round(
              parseFloat(videoData.playTotalTime)
          )
        } 
      }
      if (paused) {
        // 进度条 未解锁就动态显示
        if (!this.deblockQuestion && duration) {
          const percent = (this.localPlayTotalTime / duration) * 100
          let progress = percent <= 100 ? percent : 100
          this.bindQuestionBymyself({ progress })
          console.log('localPlayTotalTime ===', this.localPlayTotalTime)
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
      this.sharePageShow = true
    },
    cancelSharePage(data) {
      this.sharePageShow = false
    },
    //点击目录
    beActive(lessonId) {
      if (this.activeID !== lessonId) {
        this.getVideoCourseDetail({ lessonId, loading: true })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.videocourse-detail-container {
  background-color: #fff;
}
//header
.video-detail-header {
  height: 422px;
  position: relative;
  background: #f6f6f6 center/cover no-repeat;
  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
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
  padding: 16px 0;
  border: 2px solid #fff;
  padding-left: 30px;
  text-align: center;
  border-radius: 60px;
  color: #fff;
  background: url('../../assets/images/icon_pause.png') 32px center/20px
    no-repeat;
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
  padding-top: 48px;

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
  border-radius: 80px;
  padding: 8px 0 8px 70px;
  background: #f7f7f7
    url('../../assets/images/onlinecourse_video_detail_ic_editor.png') 30px
    center/30px no-repeat;
  color: #ffa32f;
}
.video-wrapper{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right:0;
  z-index:400;
}
</style>
