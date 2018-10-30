<template>
    <div class="group-content-container" id="detailmain" ref="detailmain">
        <div class="lazy-img-larger videocol-banner" v-lazy:background-image="`${columnDetail.profilePic}?imageView2/1/format/jpg`">
            <span class="videocol-banner-bottom" v-show="columnDetail.buyCount == 0 ? false : true">{{columnDetail.buyCount}}人已购买</span>
        </div>
        <ScrollNavBar :bars="navBars" />
        <!-- description(介绍) -->
        <div class="videocol-base">
            <course-introduce  id="desc" :courseinfo="columnDetail.description"/>
        </div>
        <!-- 课程列表 -->
        <div class="videocol-bigimage">
            <div class="videocol-sction-title">
                <h4>课程列表 <label>(共{{columnDetail.lessonCount}}讲)</label></h4>
            </div>
            <videoBigimage :src="columnDetail.outlinePic"/>   
            <!-- <img :src="require('../../../assets/images/icon_zoom.png')" class="videocol-bigimage-search"> -->
        </div>
        <!-- 试看课程 -->
        <div class="videocol-base">
            <div class="videocol-sction-title" id="tryCourse">
                <h4>试看课程</h4>
                <div class="videocol-all" @click="enterAllVideoList()">
                    <span class="videocol-allbtn">全部</span>
                    <img :src="require('../../../assets/images/arrow_right.png')" class="videocol-allbtn-icon">
                </div>
            </div>
            <playlist v-for="(item,index) of columnDetail.freeLessonList" :key="item.id" :iteminfo="item" :lastindex="index === (columnDetail.freeLessonList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item.id)"/>
        </div>
        <!-- 精选留言 -->
        <div class="videocol-base">
            <div class="videocol-sction-title" id="leaveMessage">
                <h4>精选留言</h4>
                <div class="videocol-all" @click="enterVideoCommentsList">
                    <span class="videocol-allbtn">{{commentsTotalCount}}条</span>
                    <img :src="require('../../../assets/images/arrow_right.png')" class="videocol-allbtn-icon">
                </div>
            </div>
             <CommentList  :regionid="courseId" :regiontype="2201" :unindent="true" ></CommentList>
            <!-- <CommentItem class="video-column-comment" v-for="(item,index) of videoColumnComments" :key="index" :comment="item" :regiontype="2201"/> -->
        </div>
        <!-- 购买须知 -->
        <div class="videocol-base">
        <div class="videocol-sction-title">
            <h4>购买须知</h4>
        </div>
        <div class="videocol-purchase-tip-fatherView">
            <p v-html="columnDetail.buyIntro"></p>
        </div>  
        </div>
    </div>
</template>

<script>
import CommentList from '../../../components/comment/CommentList.vue'
import ScrollNavBar from '../../../components/ScrollNavBar'
import CourseIntroduce from '../../../components/CourseIntroduce.vue'
import playlist from './playlist.vue'
import videoComment from '../../../components/video-comment.vue'
import CommentItem from '../../../components/comment/CommentItem.vue'
import videoBigimage from '../../../components/videoBigimage.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'columnData/groupContentData'
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
          title: '试看',
          ref: 'tryCourse'
        },
        {
          title: '留言',
          ref: 'leaveMessage'
        }
      ],
      columnType:this.$route.params.columnType,
    }
  },
  components: {
    CourseIntroduce,
    playlist,
    videoComment,
    CommentItem,
    videoBigimage,
    ScrollNavBar,
    CommentList
  },
  computed: {
    ...mapState(['videoColumnComments','commentsTotalCount']),
    ...mapGetters([
      'columnDetail',
      'courseId',
      // 'description',
      // 'lessonCount',
      // 'outlinePic',
      // 'buyIntro',
      // 'buyCount',
      // 'freeLessonList', 
      // 'courseId'
    ])
  },
  methods: {
    ...mapActions(['getCommentList', 'likeComment']),
    enterAllVideoList(){
      if(this.columnType === 'onlineCourse'){
        this.$router.push(`/videoInnerList/${this.courseId}`)
      }else if(this.columnType === 'onlineVision'){
        this.$router.push({path:`/home/visionDetail/visionCourseList/${this.courseId}`})
      }
       
    },
    enterVideoCommentsList(){
      this.$router.push(`/videoCourseCmts/${this.courseId}`)
    },
    gotoVideoCourseDetailPage(lessonId) {
      this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
    },
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
//banner头图
.videocol-banner {
  height: 300px;
  padding: 0 40px;
  text-align: left;
  position: relative;
  background: #f6f6f6 center/cover no-repeat;
  span {
    position: absolute;
    bottom: 20px;
    right: 40px;
    font-size: 28px;
    color: white;
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
  padding: 0 40px;
  width: 100%;
  height: auto;
  //   margin: 40px 0;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
  overflow: hidden;
}

// .videocol-bigimage-search {
//   position: absolute;
//   width: 80px;
//   height: 80px;
//   right: 40px;
//   bottom: 50px;
// }

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

