<template>
  <div class="book-detail-container">
     <SkeletonFullScreen  v-if="dataLoading"/>
     <GroupHeader></GroupHeader>
    <!-- 1. 头部 -->
    <div class="book-header-container" v-show="false">
      <div class="book-cover" :style="{background:`url(${bookDetail?bookDetail.coverPic:''})`,'background-size':'100%'}">
        <span v-if="new Date().getTime() - new Date(bookDetail.createTime).getTime()<30*24*3600*1000">上新</span>
      </div>
    </div>
    <!-- 2. 书的相关人物信息 -->
    <div class="book-persons-container">
      <div class="person-item">
        <div class="person-label">
          <span>作</span>
          <span>者:</span>
        </div>
        <span>{{bookDetail.authorName}}</span>
      </div>
      <hr>
      <div class="person-item">
        <div class="person-label">
          <span>演</span>
          <span>讲</span>
          <span>者:</span>
        </div>
        <span>{{bookDetail.commentator}}</span>
      </div>
      <hr>
      <div class="person-item">
        <div class="person-label">
          <span>系</span>
          <span>列:</span>
        </div>
        <span>{{bookDetail.series}}</span>
      </div>
      <hr>
    </div>
    <!-- 3. 作品属性 -->
    <div class="book-properties-container">
      <p>{{bookDetail.radioIntro}}</p> 
    </div>
    <hr>

    <!-- 4. 作品简介 -->
    <div class="book-introduce-container">
      <div class="book-introduce-header">
        <span>音频简介</span>
        <span>共{{bookDetail.availLessonCount}}集</span>
      </div>
      <div class="introduce-content">
        <p>
           {{bookDetail.description}}
        </p>
        <div class="intoduce-whole">
          <span @click="toLookWhole">查看全部</span>
        </div>
      </div>
    </div>
    <hr>
    <!-- 5. 作品单集/章集 播放列表 -->
    <van-list 
      v-model="refreshing"
      :finished="singleFinished"
      :immediate-check="false"
      @load="scrollBottom"
      @offset="10">
         <SingleSetList :list="singleSetList" :play-id="playingId" :singletype="'Readings'" :coursename="courseName" :useraccessstatus="userAccessStatus"/>
    </van-list>
    <!-- 6. 分页布局 -->
    <div class="load-more-container" v-if="singleFinished">
      <span>没有更多了，不要再拉啦～</span>
    </div>
    <!-- 7. 底部工具条 -->
    <toolsNavbar 
      :originPrice="'100'"
      :groupPrice="'10'"
      collageText="拼团"
      collectText="集赞"
      :collect='true'
      :collage='true'/>

  </div>
</template>
<script>
import SkeletonFullScreen from '../../components/SkeletonFullScreen'
import toolsNavbar from '../../components/toolsNavbar.vue'
import GroupHeader from '../onlineCourse/components/GroupHeader'
import SingleSetList from '../../components/SingleSetList.vue'
import { createNamespacedHelpers,mapState as rootState,mapActions as rootActions } from 'vuex'
const {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} = createNamespacedHelpers('readingsData')
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
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
      'dataLoading',
      'bookDetail',
      'singleLoaing',
      'singleFinished',
      'singleSetList',
      'courseName',
      'userAccessStatus'
    ]),
    ...mapGetters(['playingId'])
  },
  created() {
    this.initData(this.courseId)
    this.getBookDetail({courseId: this.courseId, groupBuyId: this.$route.query.groupBuyId})
  },
  mounted(){  
    this.getUserInfo()
    .then(user=>{ 
      //拼装分享内容
      this.shareData = {
        link: this.url + `/#/home/readings/book/${this.courseId}`, 
        title: this.courseName,
        desc: '你一定会爱上国学课...',
        successCB: () => console.log('分享回调成功') ,
        cancelCB: () =>  console.log('分享回调失败')
      } 
      this.setWxShareFriend(this.shareData)
      this.setWxShareZone(this.shareData)
    }) 
  },
  watch: {
    singleLoaing: function(loading) {
      this.refreshing = loading
    }
  },
  methods: {
    ...rootActions(['getUserInfo', 'setWxShareFriend', 'setWxShareZone']),
    ...mapMutations(['initData']),
    ...mapActions(['getBookDetail', 'getSingleSetList']),
    toLookWhole() {
      this.$router.push({ path: '/home/readings/summary' })
    },
    //分页加载
    scrollBottom() {
      this.getSingleSetList()
    }
  }
}
</script>
<style lang="scss" scoped>
.book-detail-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  hr {
    height:1px;/*no*/
    border: none;
    margin: 0 20px;
    background-color: rgb(237, 237, 237);
  }
  //1. 作品封面介绍
  .book-header-container {
    height: 440px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #f6f5f6;
    padding-top: 36px;
    .book-cover {
      position: relative;
      height: 350px;
      width: 268px;
      background-color: #fde3e3;
      span {
        border-top-right-radius: 20px;
        background-color: red;
        font-weight: 500;
        padding: 10px 20px;
        position: absolute;
        bottom: 0;
        color: white;
        font-size: 36px;
        letter-spacing: 4px;
      }
    }
  }
  //2. 相关人物介绍
  .book-persons-container {
    display: flex;
    flex-direction: column;
    .person-item {
      padding: 48px 40px;
      background-color: white;
      display: flex;
      flex-direction: row;
    }
    .person-label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 124px;
      margin-right: 20px;
    }
    .person-label > span {
      color: rgb(170, 175, 188);
      font-size: 28px;
    }
    .person-item > :nth-child(2) {
      color: rgb(22, 35, 60);
      font-size: 28px;
    }
  }
  //3. 相关属性/称号介绍
  .book-properties-container {
    padding: 40px 40px;
    display: flex;
    flex-direction: column; 
    p {
      color: rgb(22, 35, 60);
      font-size: 28px;
      line-height: 44px;
      margin: 8px 0px;
    }
  }
  //4. 作品简介
  .book-introduce-container {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    box-sizing: content-box;
    .book-introduce-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 48px;
    }
    .book-introduce-header :nth-child(1) {
      font-size: 32px;
      line-height: 36px;
      font-weight: 800;
      color: rgb(62, 62, 83);
    }
    .book-introduce-header :nth-child(2) {

      align-self: flex-end;
      line-height: 24px;
      color: rgb(170, 175, 188);
    }
    .introduce-content {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      p {
        margin: 0;
        font-size: 32px;
        color: rgb(22, 35, 60);
        line-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .intoduce-whole {
        text-align: center;
        margin: 48px 0;
      }
      .intoduce-whole span {
        font-size: 36px;
        color: rgb(255, 163, 47);
      }
    }
  }
  //5. 作品单集/章集列表

  // 6. 分页布局
  .load-more-container {
    width: 100%;
    text-align: center;
    height: 64px;

    padding: 96px 0 216px;
    color: rgb(200, 200, 200);
  }
}
</style>
