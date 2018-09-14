<template>
    <div class="videocourse-detail-container" id="detailmain" ref="detailmain">
        <div class="video-detail-header" :style="{ background : 'url('+radioShowPic+')' }">
            <div class="video-detail-header-right-top" @click="onCollectFavorite">
                <img :src="isLike?collectIcon:unCollectIcon" class="video-detail-collect" alt="">
                <img :src="require('../../assets/images/onlinecourse-play_ic_share@2x.png')" class="video-detail-share" alt="">
            </div>

             <div class="video-detail-header-left-bottom" @click="clickPlayVideoBtn">
                 <img :src="require('../../assets/images/onlinecourse-video-detail-header.jpg')" alt="" >
                 <label>开始播放</label>   
                 </div>
             <!-- <img :src="require('../../assets/images/onlinecourse_video_ic_gift.png')" class="video-detail-header-gift" alt="">     -->
        </div>
            <div ref="navbar" :class="navbarFixed == true ? 'isFixed' : ''" class="video-detail-navbar">
                <div v-for="(item,index) of navbar" :class="{'selected':selected == index }" :key="index" class="video-detail-navbar-item" @click="clickFnc(index)">{{item}}</div>
            </div>
        <div class="video-detail-content">
            <div id="note" ref="note" class="video-detail-sction-title">
                <h4>笔记</h4>
           </div>
           <course-introduce :courseinfo="description" />
            <hr class="video-detail-line">
            <div class="video-detail-sction-title">
                <h4>自测题</h4>
            </div>
            <div class="video-detail-questions">
                <img :src="lockIcon" class="video-test-question-img" alt="">
            </div>
            <div class="video-test-question-title">共3道自测题</div>
            <van-progress
                    pivot-text=""
                    color="#FFA32F"
                    :percentage="progress"
            />
            <div class="video-test-question-warn">在学习n分钟可解锁自测题</div>
            <QuestionList  />
            <hr class="video-detail-line">
            <div id="catalog" ref="catalog" class="video-detail-sction-title">
                <h4>目录</h4>
            </div>
            <playlist v-for="(item,index) of lessonList" :key="item.id" :iteminfo="item" :lastindex="index == (lessonList.length - 1)"/>
            <hr class="video-detail-line">
            <div id="leavemessage" ref="leavemessage" class="video-detail-sction-title">
                <h4>留言</h4>
                <div class="video-detail-leavemessage" @click="showkeyboard">
                    <img src="../../assets/images/onlinecourse_video_detail_ic_editor.png" alt="">
                    <span>我要留言</span>
                </div>
            </div>
            <!-- <video-comment v-for="item in singleComments" :key="item.id" :comment="item"/> -->
            <commentitem class="video-course-comment" v-for="item in singleComments" :key="item.id" :comment="item" :unindent="true" :regiontype="2202"/>
        </div>

        <!-- style="display:none" -->
        <video class="videoitem" ref="videoitem" :src="videoUrl" controls="controls" width="100%" height='100%' preload="auto"></video>
        <!-- <van-field class="video-detail-input-" v-model="inputValue" placeholder="请输入用户名" /> -->

    </div>
</template>

<script>
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import playlist from './components/playlist.vue'
import CommentItem from '../../components/CommentItem.vue'
import videoComment from '../../components/video-comment.vue'
import QuestionList from './QuestionList'
import { createNamespacedHelpers } from 'vuex'
import { log } from '../../store/module/type'
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
    QuestionList
  },
  data() {
    return {
      navbar: ['资料', '目录', '留言'],
      navbarFixed: false, //控制navbar是否吸顶
      selected: 0,
      currentVideoTime:0,
      inputValue:'',
      lockIcon:require('../../assets/images/onlinecourse_lock.jpg'),//未解锁
      unlockIcon:require('../../assets/images/onlinecourse_unlock.jpg'),//已解锁
      collectIcon:require('../../assets/images/onlinecourse_love_highlight.png'),//已收藏
      unCollectIcon:require('../../assets/images/onlinecourse_love_normal.png'),//未搜藏
      //视频播放相关属性
      timer:0,          //定时器
      duration: 0, //视频时长
      progress:0,
      loaclPlayTotalTime:1,   //本地累计播放时长
      localPlayTime:0,         //本地播放位置
      isUnlockQuestion:false   //是否解锁自测题    
    }
  },
  watch: {
    loaclPlayTotalTime: function(loaclPlayTotalTime) {
      if (!this.duration) {
        return (this.progress = 0)
      }
      return (this.progress = (loaclPlayTotalTime / this.duration) * 100)
    }
  },
  computed: {
    ...mapState([          
        'lessonList',              //目录课程
        'radioShowPic',              //视频背景图
        'audioUrl',              //音频地址
        'videoUrl',             //视频地址
        'courseId',              //专栏ID
        'id',                    //单集ID
        'singleComments',
        'description',           //笔记
        'totalTime',             //服务器返回的视频总长度
        'isFree',
        'isLike',
        'questionBOList',        //自测题列表
        'createTime',
        'isAchieveCollect',           //是否完成收藏
        'collectionId',          //收藏Id
        'learnTime',            //服务器上次播放位置
        'learnTotalTime',       //服务器累计播放时长  

    ]),
    ...mapGetters(['haveQuestionBOList'])
  },
  async mounted() {
    //监听滚动
    await window.addEventListener('scroll', this.handleScroll)
    //视频播放器相关监听
    const vid = await this.$refs.videoitem
    //视频进度
    vid.addEventListener('timeupdate', this.getVideoProgress)
    //视频开始播放
    vid.addEventListener('play', this.getVideoPlay)
    //视频暂停
    vid.addEventListener('pause', this.getVideoPause)
    //视频结束
    vid.addEventListener('ended', this.getVideoEnd)
  },
  beforeDestroy() {
    console.log('Vue实例销毁了,页面也销毁了')
    const vid = this.$refs.videoitem
    vid.removeEventListener('timeupdate', this.getVideoProgress)
    vid.removeEventListener('play', this.getVideoPlay)
    vid.removeEventListener('pause', this.getVideoPause)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created() {
    //获取课程ID
    const lessonId = this.$route.params.lessonID
    this.getVideoCourseDetail({ lessonId })
    //获取目录课程数据
    var courseId = this.courseId
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
    openTimer(){
      console.log('打开定时器')
      // console.log(Math.round(parseInt(this.duration) * 0.7))
      // console.log(parseInt(this.duration))
      this.timer = setInterval(()=>{     
        if(!this.isUnlockQuestion&&this.loaclPlayTotalTime >= Math.round(Math.round(this.duration) * 0.7)) {
          this.isUnlockQuestion = true          
          console.log('已经解锁自测题' + this.isUnlockQuestion)
        }
        // if(this.loaclPlayTotalTime > Math.round(parseInt(this.totalTime))) {
        //   this.loaclPlayTotalTime = 0
        //   this.clearTimer()
        //   this.getVideoPause()
        // }
        this.loaclPlayTotalTime++     
      },1000)
    },
    clearTimer() {
      console.log('清空定时器')
      clearInterval(this.timer)
      this.loaclPlayTotalTime = 1
    },
    //播放视频
    clickPlayVideoBtn() {
      const video = this.$refs.videoitem
      video.play()
      if (!this.duration) {
        this.duration = video.duration
      }
    },
    getVideoPlay() {
      console.log('视频播放')
      //从本地获取历史播放位置
      let videoData = JSON.parse(window.localStorage.getItem(this.id))
      console.log(videoData)
      console.log(this.duration)
      let historyPlayPosition = videoData.historyPlayPosition
      if(historyPlayPosition >= this.duration){
        this.$refs.videoitem.currentTime = 0
      }else{
        this.$refs.videoitem.currentTime =historyPlayPosition
      }     
      //开启定时器记录视频累计播放时长
      this.openTimer()
    },
    getVideoPause() {
      console.log('视频暂停')
      let videoData = JSON.parse(window.localStorage.getItem(this.id))
      let newTotalTime = this.loaclPlayTotalTime + Math.round(parseFloat(videoData.playTotalTime))
      let newPlayTime = this.$refs.videoitem.currentTime
      this.clearTimer()          
      // console.log(newTotalTime)
      // console.log(newPlayTime)
      let obj = {
        'playTotalTime': newTotalTime,
        'historyPlayPosition': newPlayTime
      }
      console.log(JSON.stringify(obj))
      window.localStorage.setItem(this.id,JSON.stringify(obj))

    },
    getVideoEnd(){
      console.log("视频结束")
      // this.clearTimer()
      // let obj = {
      //   'playTotalTime': this.loaclPlayTotalTime,
      //   'historyPlayPosition': 0
      // }
      // window.localStorage.setItem(this.id,JSON.stringify(obj))
    },
    getVideoProgress(){

    },
    //显示键盘
    showkeyboard(){
      console.log('显示键盘')
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
      window.pageYOffset = anchor.offsetTop - 50
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

//分割线
.video-detail-line {
  margin-left: -40px;
  width: 113%;
  height: 8px;
  background-color: rgb(247, 247, 247);
  border: none;
}
//content
.video-detail-content {
  padding: 0 40px;
  border: none;
  border-bottom: 8px solid #f7f7f7;
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
.video-detail-input {
  display:fixed;
  bottom:0;
  width: 100%;
  height: 60px;
  border-radius: 30px;
}
</style>



