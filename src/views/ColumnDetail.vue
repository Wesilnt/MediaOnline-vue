<template>
    <div>
        <SkeletonFullScreen  v-if="renderLoading"/>
        <div v-else>
            <Payment
                :isTryScan="isCourseType"
                :columnDetail="columnDetail"
                :groupBuyId="groupBuyId"
                :collectLikeId="collectLikeId"
                :userAccessStatus="userAccessStatus"
                :key="courseId+groupBuyId+collectLikeId+userAccessStatus"
            />
            <div id="detailmain" ref="detailmain" v-if="!isReadType">
                <div class="lazy-img-larger column-banner" v-lazy:background-image="`${columnDetail.profilePic}?imageView2/1/format/jpg`">
                    <div class="qhht-mask"></div>
                    <span class="column-banner-bottom" v-show="columnDetail.buyCount == 0 ? false : true">{{columnDetail.buyCount}}人已购买</span>
                </div>
                <ScrollNavBar :bars="navBars" />
                <!-- description(介绍) -->
                <div class="column-base">
                    <course-introduce  id="desc" :courseinfo="columnDetail.description"/>
                </div>
                <!-- 课程列表 -->
                <div class="column-bigimage">
                    <div class="column-sction-title">
                        <h4>课程列表 <label>(共{{columnDetail.lessonCount}}讲)</label></h4>
                    </div>
                    <ImagePreview :src="columnDetail.outlinePic"/>
                </div>
                <!-- 试看课程 -->
                <div class="column-base">
                    <div class="column-sction-title" id="tryCourse">
                        <h4>{{this.columnType === 'onlineCourse'? '试看课程':'试听课程'}}</h4>
                        <div class="column-all" @click="enterAllVideoList()">
                            <span class="column-allbtn">全部</span>
                            <img :src="require('../assets/images/arrow_right.png')" class="column-allbtn-icon">
                        </div>
                    </div>
                 <SingleSetItem v-for="item of columnDetail.freeLessonList"
                    :key="item.id" 
                    :item="item"  
                    :courseid="courseId"
                    :columnType="columnType" />
                </div>
                <div id="leaveMessage">
                    <!-- 精选留言 -->
                    <div class="column-base">
                        <div class="column-sction-title">
                            <h4>精选留言</h4>
                            <div class="column-all" @click="enterVideoCommentsList">
                                <span class="column-allbtn">{{commentsTotalCount}}条</span>
                                <img :src="require('../assets/images/arrow_right.png')" class="column-allbtn-icon">
                            </div>
                        </div>
                        <CommentList  :regionid="courseId" :regiontype="2201" :unindent="true" ></CommentList>
                    </div>
                    <!-- 购买须知 -->
                    <div class="column-base column-base-last">
                        <div class="column-sction-title">
                            <h4>购买须知</h4>
                        </div>
                        <div class="column-purchase-tip-fatherView">
                            <p v-html="columnDetail.buyIntro"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <!-- 1. 头部 -->
                <div class="book-header">
                    <div class="book-cover" :style="{background:`url(${columnDetail?columnDetail.coverPic:''})`,'background-size':'100%'}">
                        <span v-if="isNew" class="book-isNew">上新</span>
                    </div>
                </div>
                <div class="book-body">
                    <!-- 2. 书的相关人物信息 -->
                    <div class="book-body-item flex">
                        <div class="person-label">
                            <span>作</span>
                            <span>者:</span>
                        </div>
                        <span>{{columnDetail.authorName}}</span>
                    </div>
                    <div class="book-body-item flex">
                        <div class="person-label">
                            <span>演</span>
                            <span>讲</span>
                            <span>者:</span>
                        </div>
                        <span>{{columnDetail.commentator}}</span>
                    </div>
                    <div class="book-body-item flex">
                        <div class="person-label">
                            <span>系</span>
                            <span>列:</span>
                        </div>
                        <span>{{columnDetail.series}}</span>
                    </div>
                    <!-- 3. 作品属性 -->
                    <div class="book-body-item">
                        <p v-html="columnDetail.radioIntro"></p>
                    </div>
                    <!-- 4. 作品简介 -->
                    <div class="book-body-item ">
                        <div class="qhht-flex">
                            <span class="dark-gray">音频简介</span>
                            <span class="light-gray">共{{columnDetail.availLessonCount}}集</span>
                        </div>
                        <p v-html="columnDetail.description" class="introduce-content"/>
                        <div class="introduce-to-all" @click="toLookWhole">
                            查看全部
                        </div>
                    </div>
                </div>
                <!-- 5. 作品单集/章集 播放列表 -->
                <van-list
                        v-model="refreshing"
                        :finished="lessonFinished"
                        :immediate-check="true"
                        @load="scrollBottom"
                        @offset="3">
                    <SingleSetList
                            :courseid="courseId"
                            :list="lessonList"
                            :play-id="playingId"
                            :columnType="columnType"
                            :coursename="columnDetail.name"
                            :useraccessstatus="userAccessStatus"/>
                </van-list>
            </div>
            <!-- 7. 底部工具条 -->
            <div class="load-more-container" v-if="lessonFinished">
                没有更多了，不要再拉啦～
            </div>
             <!--<toolsNavbar :freeLesson="columnDetail.freeLessonList" :lessonList="lessonList"/>-->

            <!-- <toolsNavbar :freeLesson="freeLesson" :lessonList="lessonList"/> -->
        </div>
    </div>
</template>

<script>
import SkeletonFullScreen from '../components/SkeletonFullScreen'
import Payment from '../components/Payment'
import toolsNavbar from '../components/toolsNavbar.vue'
import SingleSetItem from '../components/SingleSetItem.vue'
import SingleSetList from '../components/SingleSetList.vue'
import CommentList from '../components/comment/CommentList.vue'
import ScrollNavBar from '../components/ScrollNavBar'
import CourseIntroduce from '../components/CourseIntroduce.vue'
import videoComment from '../components/video-comment.vue'
import ImagePreview from '../components/ImagePreview'
import { createNamespacedHelpers } from 'vuex'
import {
  openVideoDetail,
  openAudioDetail,
  columnType as COLUMNTYPE
} from '../utils/config'

const {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} = createNamespacedHelpers('columnData')
export default {
  name: 'ColumnDetail',
  data() {
    const { columnType, courseId } = this.$route.params
    return {
      courseId,
      columnType,
      navBars: [
        {
          title: '介绍',
          ref: 'desc'
        },
        {
          title: columnType === 'onlineCourse' ? '试看' : '试听',
          ref: 'tryCourse'
        },
        {
          title: '留言',
          ref: 'leaveMessage'
        }
      ],
      refreshing: false,
      canLoadMore: false,
      isCourseType: columnType === COLUMNTYPE['onlineCourse'].name,
      isVisionType: columnType === COLUMNTYPE['onlineVision'].name,
      isReadType: columnType === COLUMNTYPE.reading.name
    }
  },
  watch: {
    lessonLoading: function(loading) {
      this.refreshing = loading
    },
    courseId: {
      handler: 'fetchColumnData',
      immediate: true
    }
  },
  computed: {
    ...mapState([
      'renderLoading',
      'columnDetail',
      'commentsTotalCount',
      'lessonLoading',
      'lessonFinished',
      'lessonList',
      'courseName',
      'userAccessStatus',
      'collectLikeId',
      'groupBuyId'
    ]),
    ...mapGetters(['playingId', 'getBookIntroduce', 'isNew', 'freeLesson'])
  },
  methods: {
    ...mapMutations(['resetState']),
    ...mapActions([
      'getLessonList',
      'getColumnDetail',
      'getCategoryList',
      'getCommentList',
      'likeComment'
    ]),
    async fetchColumnData() {
      const { courseId, columnType, isVisionType } = this
      await this.resetState()
      await this.getColumnDetail({
        columnType,
        courseId
      })
      // 音频课程 视频课程 由于数据结构相同，使用同种配置
      //   1.获取专栏下的所有单集
      if (isVisionType) {
        await this.getCategoryList(courseId)
      } else {
        await this.getLessonList({ courseId, refresh: true }) //视频和读书会接口相同
      }
      this.canLoadMore = true
    },
    toLookWhole() {
      this.$router.push({ path: '/home/readings/summary' })
    },
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
      if (this.columnType === 'onlineVision')
        openAudioDetail(this, {
          courseId: this.courseId,
          columnType: this.columnType,
          lessonId,
          courseName: this.columnDetail.name
        })
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
        openVideoDetail(this, {
          courseId: this.courseId,
          columnType: this.columnType,
          lessonId
        })
      // this.$router.push({
      //   name: 'videoCourseDetail',
      //   params: {
      //     courseId: this.courseId,
      //     columnType: this.columnType,
      //     lessonId
      //   }
      // })
    },
    //分页加载
    scrollBottom() {
      this.canLoadMore &&
        this.getLessonList({ courseId: this.courseId, refresh: false })
    }
  },
  components: {
    SingleSetItem,
    SingleSetList,
    toolsNavbar,
    SkeletonFullScreen,
    Payment,
    CourseIntroduce,
    videoComment,
    ImagePreview,
    ScrollNavBar,
    CommentList
  }
}
</script>

<style lang="less" scoped>
//1. 作品封面介绍
.book-header {
  padding: 36px 0 54px;
  background-color: #f6f5f6;
  .book-cover {
    position: relative;
    height: 350px;
    margin: 0 auto;
    width: 268px;
  }
  .book-isNew {
    padding: 10px 20px;
    position: absolute;
    bottom: 0;
    border-top-right-radius: 20px;
    font-weight: 500;
    font-size: 36px;
    letter-spacing: 4px;
    background-color: red;
    color: white;
  }
}
.book-body {
  padding: 0 20px;
  font-size: 28px;
  color: #16233c;
}
.light-gray {
  color: #aaafbc;
}
.dark-gray {
  font-size: 32px;
  font-weight: 800;
}
.book-body-item {
  padding: 48px 20px;
  border-bottom: 1px solid #ededed;
  &.flex {
    display: flex;
    justify-content: left;
    align-items: center;
  }
}
//2. 相关人物介绍
.person-label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 124px;
  margin-right: 20px;
  color: #aaafbc;
}
.introduce-content {
  margin: 40px 0 48px;
  font-size: 32px;
}
.introduce-to-all {
  text-align: center;
  font-size: 36px;
  color: #ffa32f;
}
.load-more-container {
  text-align: center;
  padding: 96px 0 216px;
  color: #c8c8c8;
}
//banner头图
.column-banner {
  height: 300px;
  // padding: 0 40px;
  text-align: left;
  position: relative;
  background: #f6f6f6 center/cover no-repeat;
}
.column-banner-bottom {
  position: absolute;
  bottom: 20px;
  right: 40px;
  color: white;
}
//介绍
.column-base {
  padding: 0 40px;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
  &.column-base-last {
    padding-bottom: 180px;
    border-bottom: none;
  }
}
//大图浏览
.column-bigimage {
  position: relative;
  padding: 0 40px;
  width: 100%;
  height: auto;
  //   margin: 40px 0;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
  overflow: hidden;
}

//区头
.column-sction-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  color: rgb(62, 62, 83);
  margin-top: 48px;
  margin-bottom: 32px;
  align-items: center;
}

.column-sction-title h4 {
  margin: 0;
  font-size: 32px;
  color: rgb(62, 62, 83);
}
.column-sction-title h4 label {
  color: rgb(155, 161, 176);
  margin: 0;
}
//试看课程
.column-all {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.column-allbtn {
  margin-right: 20px;
  border: none;

  height: 24px;
  line-height: 24px;
  color: rgb(155, 161, 176);
}
.column-allbtn-icon {
  width: 16px;
  height: 28px;
}

//精选留言
.video-column-comment {
  margin: 56px 0 40px;
}

//购买须知
.column-purchase-tip {
  font-size: 32px;
  color: rgb(128, 128, 128);
  margin: 20px 0 20px;
}
</style>
