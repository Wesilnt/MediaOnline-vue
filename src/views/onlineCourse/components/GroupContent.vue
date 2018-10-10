<template>
    <div class="group-content-container" id="detailmain" ref="detailmain">
        <ScrollNavBar :bars="navBars" />
        <!-- description(介绍) -->
        <div class="videocol-base">
            <course-introduce  id="desc" :courseinfo="description"/>
        </div>
        <!-- 课程列表 -->
        <div class="videocol-bigimage">
            <div class="videocol-sction-title">
                <h4>课程列表 <label>(共{{lessonCount}}讲)</label></h4>
            </div>
            <videoBigimage :src="outlinePic"/>   
            <img :src="require('../../../assets/images/onlinecourse_bigimage_search.png')" class="videocol-bigimage-search">
        </div>
        <!-- 试看课程 -->
        <div class="videocol-base">
            <div class="videocol-sction-title" id="tryCourse">
                <h4>试看课程</h4>
                <div class="videocol-all" @click="allFunc()">
                    <span class="videocol-allbtn">全部</span>
                    <img :src="require('../../../assets/images/onlinecourse_arrow_right.png')" class="videocol-allbtn-icon">
                </div>
            </div>
            <playlist v-for="(item,index) of freeLessonList" :key="item.id" :iteminfo="item" :lastindex="index === (freeLessonList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item.id)"/>
        </div>
        <!-- 精选留言 -->
        <div class="videocol-base">
            <div class="videocol-sction-title" id="leaveMessage">
                <h4>精选留言</h4>
                <div class="videocol-all" @click="allFunc">
                    <span class="videocol-allbtn">{{commentCount}}条</span>
                    <img :src="require('../../../assets/images/onlinecourse_arrow_right.png')" class="videocol-allbtn-icon">
                </div>
            </div>
            <CommentItem class="video-column-comment" v-for="(item,index) of commentsList" :key="index" :comment="item" :regiontype="2201"/>
        </div>
        <!-- 购买须知 -->
        <div class="videocol-base">
        <div class="videocol-sction-title">
            <h4>购买须知</h4>
        </div>
        <div class="videocol-purchase-tip-fatherView">
            <p v-html="buyIntro"></p>
        </div>  
        </div>
    </div>
</template>

<script>
import ScrollNavBar from '../../../components/ScrollNavBar'
import CourseIntroduce from '../../../components/CourseIntroduce.vue'
import playlist from './playlist.vue'
import videoComment from '../../../components/video-comment.vue'
import CommentItem from '../../../components/comment/CommentItem.vue'
import videoBigimage from '../../../components/videoBigimage.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'videoColumnDetailData/groupContentData'
)
export default {
  name: 'GroupContent',
  data() {
    return {
      navBars: [
        {
          title: '介绍',
          ref: 'desc'
        },
        {
          title: '试听',
          ref: 'tryCourse'
        },
        {
          title: '留言',
          ref: 'leaveMessage'
        }
      ]
    }
  },
  components: {
    CourseIntroduce,
    playlist,
    videoComment,
    CommentItem,
    videoBigimage,
    ScrollNavBar
  },
  computed: {
    ...mapGetters([
      'description',
      'lessonCount',
      'outlinePic',
      'buyIntro',
      'commentCount',
      'buyCount',
      'freeLessonList',
      'commentsList',
      'courseId'
    ])
  },
  methods: {
    ...mapActions(['getCommentList', 'likeComment']),
    allFunc() {
      this.$router.push({
        name: 'videoCourseCmts',
        params: { courseId: this.courseId }
      })
    },
    gotoVideoCourseDetailPage(lessonId) {
      this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
    },
    /*async handleScroll() {
      //1.监听滚动
      let scrollTop = document.documentElement.scrollTop
      let tryCourseH = this.$el.querySelector('#tryCourse').offsetTop - 60
      let messageH = this.$el.querySelector('#leaveMessage').offsetTop - 60
      console.log('======' + document.body.scrollHeight)
      console.log('scrollTopaaa =', scrollTop)
      // console.log('tryCourseH =',tryCourseH)  //970
      // console.log('messageH =',messageH)    //1289
      if (scrollTop < tryCourseH) {
        this.selected = 0
      } else if (scrollTop < messageH && scrollTop > tryCourseH) {
        this.selected = 1
        console.log('代码走到这里了')
      } else if (scrollTop > messageH) {
        this.selected = 2
      }
    },
    clickFnc(index) {
      this.selected = index
      let positionId = ''
      switch (index) {
        case 0:
          positionId = '#desc'
          break
        case 1:
          positionId = '#tryCourse'
          break
        case 2:
          positionId = '#leaveMessage'
          break
        default:
          break
      }
      console.log(positionId, index)
      let anchor = this.$el.querySelector(positionId)

      document.body.scrollTop = anchor.offsetTop - 60

      // // // Firefox
      document.documentElement.scrollTop = anchor.offsetTop - 60
      // // Safari
      window.pageYOffset = anchor.offsetTop - 60

      // console.log("anchor = "+anchor.offsetTop)
    }*/
  },
  created() {
    //获取专栏评论列表
    this.getCommentList({
      regionType: 2201,
      regionId: this.courseId,
      currentPage: 1,
      pageSize: 11
    })
  }
}
</script>

<style lang="scss" scoped>
.group-content-container {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100%;
}

//导航条
.videocol-navbar {
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  padding-top: 28px;
  text-align: center;
  z-index: 999;

  .videocol-navbar-item {
    width: 100px;
    padding-bottom: 22px;
    font-size: 28px;
    color: rgb(62, 62, 83);
  }

  .videocol-navbar-item.selected {
    font-size: 28px;
    color: rgb(255, 163, 47);
    border-bottom: 6px solid rgb(255, 163, 47);
  }
}
//介绍
.videocol-base {
  padding: 0 40px;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
}
//大图浏览
.videocol-bigimage {
  position: relative;
  padding: 0 40px 40px;
  width: 100%;
  height: auto;
  //   margin: 40px 0;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
  overflow: hidden;
}

.videocol-bigimage-search {
  position: absolute;
  width: 80px;
  height: 80px;
  right: 40px;
  bottom: 50px;
}

//区头
.videocol-sction-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  color: rgb(62, 62, 83);
  margin-top: 48px;
  margin-bottom: 32px;
  align-items: center;
}

.videocol-sction-title h4 {
  margin: 0;
  font-size: 32px;
  color: rgb(62, 62, 83);
}
.videocol-sction-title h4 label {
  font-size: 28px;
  color: rgb(155, 161, 176);
  margin: 0;
}
//试看课程
.videocol-all {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.videocol-allbtn {
  margin-right: 20px;
  border: none;

  height: 24px;
  line-height: 24px;
  color: rgb(155, 161, 176);
}
.videocol-allbtn-icon {
  width: 16px;
  height: 28px;
}

//精选留言
.video-column-comment {
  margin: 56px 0 40px;
}

//购买须知
.videocol-purchase-tip {
  font-size: 32px;
  color: rgb(128, 128, 128);
  margin: 20px 0 20px;
}
.videocol-purchase-tip-fatherView {
  width: 100%;
  margin-bottom: 120px;
}
.videocol-purchase-tip-fatherView :last-child {
  margin-bottom: 60px;
}
</style>
