<template>
    <div class="group-content-container" id="detailmain" ref="detailmain">
        <div class="lazy-img-larger videocol-banner" v-lazy:background-image="`${columnDetail.profilePic}?imageView2/1/format/jpg`">
            <div class="qhht-mask"></div>
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
                <h4>{{this.columnType === 'onlineCourse'? '试看课程':'试听课程'}}</h4>
                <div class="videocol-all" @click="enterAllVideoList()">
                    <span class="videocol-allbtn">全部</span>
                    <img :src="require('../../../assets/images/arrow_right.png')" class="videocol-allbtn-icon">
                </div>
            </div>
            <playlist v-for="(item,index) of columnDetail.freeLessonList" :key="item.id" :iteminfo="item" :lastindex="index === (columnDetail.freeLessonList.length - 1)" @jumpEvent="toDetail(item.id)"/>
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
            <!-- <CommentItem class="video-column-comment" v-for="(item,index) of columnComments" :key="index" :comment="item" :regiontype="2201"/> -->
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
  import {openVideoDetail,openAudioDetail} from "../../../utils/config";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'columnData/groupContentData'
)
export default {
  name: 'GroupContent',
  data() {
    return {
      columnType: this.$route.params.columnType,
      navBars: [
        {
          title: '介绍',
          ref: 'desc'
        },
        {
          title: this.columnType === 'onlineCourse' ? '试看' : '试听',
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
    ScrollNavBar,
    CommentList
  },
  computed: {
    ...mapState(['columnComments', 'commentsTotalCount']),
    ...mapGetters([
      'columnDetail',
      'courseId'
    ])
  },
  methods: {
    ...mapActions(['getCommentList', 'likeComment']),
    enterAllVideoList() {
      if (this.columnType === 'onlineCourse') {
        this.$router.push(`/videoInnerList/${this.columnType}/${this.courseId}`)
      } else if (this.columnType === 'onlineVision') {
        this.$router.push({
          path: `/home/visionDetail/visionCourseList/${this.courseId}`
        })
      }
    },
    enterVideoCommentsList() {
      this.$router.push(`/videoCourseCmts/${this.courseId}`)
    },
    toDetail(lessonId) {
      let columnType = this.columnType
      if (this.columnType === 'onlineVision')
        openAudioDetail(this,{courseId:this.courseId, columnType, lessonId})
        // this.$router.push({
        //   name: 'AudioPlay',
        //   params: {
        //     courseId: this.courseId,
        //     columnType: this.columnType,
        //     lessonId
        //   },
        //   query: { courseName: this.columnDetail.name }
        // })
      if (this.columnType === 'onlineCourse')
        openVideoDetail(this,{ courseId:this.courseId, columnType, lessonId})
        // this.$router.push({
        //   name: 'videoCourseDetail',
        //   params: {
        //     courseId: this.courseId,
        //     columnType: this.columnType,
        //     lessonId
        //   }
        // })
    }
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

</style>
