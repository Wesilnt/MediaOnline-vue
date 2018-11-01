<template>
  <div>
    <SkeletonFullScreen  v-if="renderLoading"/>
    <div v-else>
      <GroupHeader />
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
        @offset="10">
           <SingleSetList 
              :courseid="courseId"
              :list="lessonList" 
              :play-id="playingId" 
              :columnType="columnType" 
              :coursename="columnDetail.name" 
              :useraccessstatus="userAccessStatus"/>
      </van-list>
      <!-- 6. 分页布局 -->
      <div class="load-more-container" v-if="lessonFinished">
        没有更多了，不要再拉啦～
      </div>
      <!-- 7. 底部工具条 -->
      <toolsNavbar />
    </div>
  </div>
</template>
<script>
import SkeletonFullScreen from '../../components/SkeletonFullScreen'
import toolsNavbar from '../../components/toolsNavbar.vue'
import GroupHeader from '../onlineCourse/components/GroupHeader'
import SingleSetList from '../../components/SingleSetList.vue'
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} = createNamespacedHelpers('columnData')
export default {
  data() {
    return {
      isNew: false,
      courseId: this.$route.params.courseId,
      columnType: this.$route.params.columnType,
      currentPage: 1,
      pageSize: 20,
      refreshing: false
    }
  },
  components: {
    SingleSetList,
    toolsNavbar,
    GroupHeader,
    SkeletonFullScreen
  },
  computed: {
    ...rootState(['url']),
    ...mapState([
      'renderLoading',
      'columnDetail',
      'lessonLoading',
      'lessonFinished',
      'lessonList',
      'courseName',
      'userAccessStatus'
    ]),
    ...mapGetters(['playingId'])
  },
  created() {
    this.initDatas({
      courseId: this.courseId,
      groupBuyId: this.$route.query.groupBuyId
    })
    this.getColumnDetail({
      columnType: this.columnType,
      courseId: this.courseId,
      groupBuyId: this.$route.query.groupBuyId
    })
  },
  mounted() {
    this.getUserInfo().then(user => {
      //拼装分享内容
      this.shareData = {
        link: this.url + `/#/home/readings/book/${this.courseId}`,
        title: this.courseName,
        desc: '你一定会爱上国学课...',
        imgUrl: `${
          this.columnDetail.sharePostUrl
        }?imageView2/1/w/100/h/100/format/jpg`,
        successCB: () => console.log('分享回调成功'),
        cancelCB: () => console.log('分享回调失败')
      }
      this.setWxShareFriend(this.shareData)
      this.setWxShareZone(this.shareData)
    })
    this.isNew =
      new Date().getTime() - new Date(this.columnDetail.createTime).getTime() <
      30 * 24 * 3600 * 1000
  },
  watch: {
    lessonLoading: function(loading) {
      this.refreshing = loading
    }
  },
  methods: {
    ...rootActions(['getUserInfo', 'setWxShareFriend', 'setWxShareZone']),
    ...mapMutations(['initDatas']),
    ...mapActions(['getLessonList', 'getColumnDetail']),
    toLookWhole() {
      this.$router.push({ path: '/home/readings/summary' })
    },
    //分页加载
    scrollBottom() {
      this.getLessonList({ courseId: this.courseId, refresh: false })
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
