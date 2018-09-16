<template>
  <div class="videocourse-detail-container" id="detailmain" ref="detailmain">
      <!-- 播放器封面 -->
    <div class="video-detail-header" :style="{ background : 'url('+radioShowPic+')' }">
      <div class="video-detail-header-right-top" @click="onCollectFavorite">
          <img :src="isLike?collectIcon:unCollectIcon" class="video-detail-collect" alt="">
          <img :src="require('../../assets/images/onlinecourse-play_ic_share@2x.png')" class="video-detail-share" alt="" @click="onShareAction">
      </div>
      <div class="video-detail-header-left-bottom" @click="clickPlayVideoBtn">
          <img :src="require('../../assets/images/onlinecourse-video-detail-header.jpg')" alt="" >
          <label>开始播放</label>   
      </div>
          <!-- <img :src="require('../../assets/images/onlinecourse_video_ic_gift.png')" class="video-detail-header-gift" alt="">     -->
    </div>
    <!-- 播放器 -->
    <video class="videoitem" ref="videoitem" :src="videoUrl" controls="controls" width="100%" height='100%' preload="auto"></video>
    <!-- Navbar -->
    <div ref="navbar" :class="navbarFixed == true ? 'isFixed' : ''" class="video-detail-navbar">
        <div v-for="(item,index) of navbar" :class="{'selected':selected == index }" :key="index" class="video-detail-navbar-item" @click="clickFnc(index)">{{item}}</div>
    </div>
    <!-- 资料 -->
    <div class="video-detail-base">
      <div id="note" ref="note" class="video-detail-sction-title">
          <h4>笔记</h4>
      </div>
      <course-introduce :courseinfo="description" />
    </div>
    <div class="video-detail-base">
      <div class="video-detail-sction-title">
          <h4>自测题</h4>
      </div>
      <div class="video-detail-questions">
          <img :src="deblockQuestion ? lockIcon : unlockIcon" class="video-test-question-img" alt="">
      </div>
      <div class="video-test-question-title">共3道自测题</div>
      <div v-if="deblockQuestion">
        <van-progress
          pivot-text=""
          color="#FFA32F"
          :percentage="progress"
        />
      <div class="video-test-question-warn">在学习n分钟可解锁自测题</div>
      </div>
      <div v-else>
         <QuestionList  />    
      </div>
      <div class="video-achieve-question">
        <div class="video-achieve-question-top">
          <div class="video-achieve-question-item">
            <p>3</p>
            <span>题数</span>    
          </div>
          <div class="video-achieve-question-item">
            <p>3</p>
            <span>答对</span>  
          </div>
          <div class="video-achieve-question-item">
            <p>3</p>
            <span>排行</span>
          </div>
        </div>

        <div class="video-achieve-question-bottom">
          <a class="qhht-blockButton quesbtn">回顾自测题</a>
          <a class="qhht-blockButton quesbtn">
            <QuestionList  >查看成绩单</QuestionList></a>
        </div>
      </div>    

    </div>
    <!-- 目录 -->
    <div class="video-detail-base">
      <div id="catalog" ref="catalog" class="video-detail-sction-title">
          <h4>目录</h4>
      </div>
      <playlist v-for="(item,index) of lessonList" :key="item.id" :iteminfo="item" :lastindex="index == (lessonList.length - 1)"/>      
    </div>
    <!-- 留言 -->
    <div class="video-detail-base">
      <div id="leavemessage" ref="leavemessage" class="video-detail-sction-title">
          <h4>留言</h4>
          <div class="video-detail-leavemessage" @click="toggleKeyboard(true)">
              <img src="../../assets/images/onlinecourse_video_detail_ic_editor.png" alt="">
              <span>我要留言</span>
          </div>
      </div>
      <commentitem class="video-course-comment" v-for="item in singleComments" :key="item.id" :comment="item" :unindent="true" :regiontype="2202"/>      
    </div>
      <CommentBar :show="commentBarShow" v-on:toggle="toggleKeyboard"/>
  </div>
</template>

<script>
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import playlist from './components/playlist.vue'
import CommentItem from '../../components/CommentItem.vue'
import videoComment from '../../components/video-comment.vue'
import QuestionList from './QuestionList'
import CommentBar from '../../components/CommentBar'
import { createNamespacedHelpers } from 'vuex'
const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('videoCourseDetail')
export default {
  name: 'VideoCourseDetail',
  components: {
    'course-introduce': CourseIntroduce,
    playlist: playlist,
    'video-comment': videoComment,
    commentitem: CommentItem,
    QuestionList,
    CommentBar
  },
  data() {
    return {
      navbar: ['资料', '目录', '留言'],
      navbarFixed: false, //控制navbar是否吸顶
      selected: 0,
      currentVideoTime: 0,
      inputValue: '',
      lockIcon: require('../../assets/images/onlinecourse_lock.jpg'), //未解锁
      unlockIcon: require('../../assets/images/onlinecourse_unlock.jpg'), //已解锁
      collectIcon: require('../../assets/images/onlinecourse_love_highlight.png'), //已收藏
      unCollectIcon: require('../../assets/images/onlinecourse_love_normal.png'), //未搜藏
      //视频播放相关属性
      timer: 0, //定时器
      progress: 0,
      loaclPlayTotalTime: 0, //本地累计播放时长
      localPlayTime: 0, //本地播放位置
      playStartTime: null,
      deblockQuestion: false, //是否解锁自测题
      isAchieveQuestion: false, //是否完成自测题
      // 我要留言显示
      commentBarShow: false
    }
  },
  computed: {
    ...mapState([
      'lessonList', //目录课程
      'radioShowPic', //视频背景图
      'audioUrl', //音频地址
      'videoUrl', //视频地址
      'courseId', //专栏ID
      'id', //单集ID
      'singleComments',
      'description', //笔记
      'totalTime', //服务器返回的视频总长度
      'isFree',
      'isLike',
      'questionBOList', //自测题列表
      'createTime',
      'isAchieveCollect', //是否完成收藏
      'collectionId', //收藏Id
      'learnTime', //服务器上次播放位置
      'learnTotalTime', //服务器累计播放时长
      'quesNum', //自测题个数
      'rightNum', //自测题答对个数
      'rankNum' //自测题排行
    ]),
    ...mapGetters(['haveQuestionBOList'])
  },
  async mounted() {
    //监听滚动
    await addEventListener('scroll', this.handleScroll)
    //视频播放器相关监听
    const vid = await this.$refs.videoitem
    //视频进度
    vid.addEventListener('timeupdate', this.getVideoProgress)
    vid.addEventListener('play', this.clickPlayVideoBtn)
  },
  beforeDestroy() {
    const vid = this.$refs.videoitem
    vid.removeEventListener('timeupdate', this.getVideoProgress)
    vid.removeEventListener('play', this.clickPlayVideoBtn)
  },
  destroyed() {
    removeEventListener('scroll', this.handleScroll)
  },
  created() {
    //获取课程ID
    const lessonId = this.$route.params.lessonID
    this.getVideoCourseDetail({ lessonId })
    //获取目录课程数据
    const { courseId } = this
    this.getLessonListByCourse({
      courseId: courseId,
      currentPage: 1,
      pageSize: 11
    })
    //获取单集评论
    this.getCommentList({
      regionType: 2202,
      regionId: lessonId,
      currentPage: 1,
      pageSize: 11
    })
  },
  methods: {
    ...mapMutations(['updateLocalVideoData']),
    ...mapActions([
      'getVideoCourseDetail',
      'getLessonListByCourse',
      'getCommentList',
      'doCollectFavorite',
      'unCollectFavorite'
    ]),
    //播放视频
    clickPlayVideoBtn() {
      const video = this.$refs.videoitem
      //从本地获取历史播放位置
      const videoData = JSON.parse(localStorage.getItem(this.id))
      const { historyPlayPosition } = videoData
      video.play()
      video.currentTime =
        historyPlayPosition >= video.duration ? 0 : historyPlayPosition
      // 记录当前播放时间戳
      this.playStartTime = new Date()
    },
    getVideoProgress({ target }) {
      const { currentTime, paused, duration } = target

      //  播放累计时长大于视频的总时长，解锁
      const videoData = JSON.parse(localStorage.getItem(this.id))
      if (
        !this.deblockQuestion &&
        Math.round(videoData.playTotalTime) >= Math.round(duration * 0.7)
      ) {
        this.deblockQuestion = true
      }
      if (paused) {
        // 获取播放累计时长
        const durationPlayingTime = this.playStartTime
          ? (new Date() - this.playStartTime) / 1000
          : 0
        this.loaclPlayTotalTime += durationPlayingTime
        this.playStartTime = null
        const videoData = JSON.parse(localStorage.getItem(this.id))
        const newTotalTime =
          durationPlayingTime + Math.round(parseFloat(videoData.playTotalTime))
        // console.log(this.loaclPlayTotalTime )
        const obj = {
          playTotalTime: newTotalTime,
          historyPlayPosition: currentTime
        }
        // console.log('更新本地数据 obj = ')
        // console.log(obj)
        localStorage.setItem(this.id, JSON.stringify(obj))
        // console.log(this.loaclPlayTotalTime)
      }
      // console.log("duration = ",duration)
      // 进度条 未解锁就动态显示
      if (!this.deblockQuestion && duration) {
        console.log('duration=' + duration)
        const percent = (this.loaclPlayTotalTime / duration) * 100
        this.progress = percent <= 100 ? percent : 100
        // const videoData = JSON.parse(localStorage.getItem(this.id))
        // const percent=(videoData.playTotalTime / duration) * 100
        // this.progress = percent<=100?percent:100
      }
    },
    //显示键盘
    toggleKeyboard(commentBarShow, inputer) {
      this.commentBarShow = commentBarShow
      if (inputer) {
        console.log('留言内容为 ' + inputer)
      }
    },
    //收藏
    onCollectFavorite() {
      const lessonId = this.$route.params.lessonID
      if (this.isLike) {
        this.unCollectFavorite(lessonId)
      } else {
        this.doCollectFavorite(lessonId)
      }
    },
    onShareAction() {
      console.log('点击分享')
    },
    clickFnc(index) {
      this.selected = index
      let positionId
      switch (index) {
        case 0:
          positionId = '#note'
          break
        case 1:
          positionId = '#catalog'
          break
        case 2:
          positionId = '#leavemessage'
          break
        default:
          break
      }

      let anchor = this.$el.querySelector(positionId)
      document.body.scrollTop = anchor.offsetHeight - 50
      // // Firefox
      document.documentElement.scrollTop = anchor.offsetTop - 50
      // Safari
      pageYOffset = anchor.offsetTop - 50
    },
    async handleScroll() {
      //1.监听滚动
      let scrollTop = Math.abs(
        this.$refs.detailmain.getBoundingClientRect().top
      )
      let noteH = this.$el.querySelector('#note').offsetTop - 50
      let catalogH = this.$el.querySelector('#catalog').offsetTop - 50
      // let leavemessageH = this.$el.querySelector('#leavemessage').offsetTop -50
      if (scrollTop < noteH) {
        this.selected = 0
      } else if (scrollTop < catalogH && scrollTop > noteH) {
        this.selected = 1
      } else if (scrollTop > catalogH) {
        this.selected = 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.videocourse-detail-container {
  background-color: #fff;
  font-size: 24px;
}
//header
.video-detail-header {
  width: 100%;
  height: 422px;
  background-color: rgb(198, 72, 172);
  position: relative;
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
.video-detail-header-left-bottom {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 30px;
  bottom: 30px;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 30px;
  width: 196px;

  label {
    color: white;
    font-size: 24px;
    height: 28px;
    line-height: 28px;
    padding: 0;
    margin: 0;
    align-self: center;
  }

  img {
    width: 20px;
    height: 26px;
    margin: 20px;
  }
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
//自测题
.video-detail-questions {
  text-align: center;
  width: 100%;
  img {
    width: 298px;
    height: 252px;
  }
}
.video-test-question-title {
  margin-top: 30px;
  margin-bottom: 88px;
  text-align: center;
}

.video-test-question-warn {
  margin: 15px auto 48px;
  text-align: center;
}
//完成自测题样式
.video-achieve-question {
  width: 100%;

  .video-achieve-question-top {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
    text-align: center;
  }

  .video-achieve-question-bottom {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
  }
}

.quesbtn {
  width: 240px;
  line-height: 80px;
  background-color: white;
  color: rgb(255, 163, 47);
  border: 2px solid rgb(255, 163, 47);
}

.video-achieve-question-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  border-right: 1px solid lightgray;
  width: 33%;
  margin: 48px 0 88px;
  &:last-child {
    border: none;
  }
  p {
    font-size: 36px;
    color: rgb(255, 163, 47);
  }
  span {
    font-size: 24px;
    color: rgb(102, 102, 102);
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
