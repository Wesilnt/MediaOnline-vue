<template>
  <div class="book-detail-container">
    <!-- 1. 头部 -->
    <div class="book-header-container">
      <div class="book-cover" :style="{background:'url('+bookDetail.coverPic+')'}">
        <span v-if="new Date().getTime() - new Date(bookDetail.createTime).getTime()<30*24*3600*1000">上新</span>
      </div>
    </div>
    <!-- 2. 书的相关人物信息 -->
    <div class="book-persons-container">
      <div class="person-item">
        <div class="person-label">
          <font>作</font>
          <font>者:</font>
        </div>
        <font>{{bookDetail.authorName}}</font>
      </div>
      <hr>
      <div class="person-item">
        <div class="person-label">
          <font>演</font>
          <font>讲</font>
          <font>者:</font>
        </div>
        <font>{{bookDetail.commentator}}</font>
      </div>
      <hr>
      <div class="person-item">
        <div class="person-label">
          <font>系</font>
          <font>列:</font>
        </div>
        <font>{{bookDetail.series}}</font>
      </div>
      <hr>
    </div>
    <!-- 3. 作品属性 -->
    <div class="book-properties-container">
      <p>{{bookDetail.radioIntro}}</p>
      <!-- <div class="property-item">
        <img src="../../assets/readings_detail_star.png">
        <p> 教育部新课必读书目 </p>
      </div>
      <div class="property-item">
        <img src="../../assets/readings_detail_star.png">
        <p> 民国四大才子宅王鹏代表作</p>
      </div>
      <div class="property-item">
        <img src="../../assets/readings_detail_star.png">
        <p>现代诗性小说大师之作</p>
      </div> -->
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
    <singleset-list :list="singleSetList" :play-id="0"/>
    <!-- 6. 分页布局 -->
    <div class="load-more-container">
      <span>没有更多了，不要再拉啦～</span>
    </div>

  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions ,mapGetters} = createNamespacedHelpers('readings'); 
import SingleSetList from '../../components/SingleSetList.vue'
export default {
  components: { 'singleset-list': SingleSetList },
  data() {
    return {
      courseId:this.$route.query.id,
      currentPage:1,
      pageSize:20, 
    }
  },

  computed: {
    ...mapState(['bookDetail','singleSetList'])
  },
  created() {
    console.log(this.courseId)
    this.getBookDetail({courseId:this.courseId})
    this.getSingleSetList({courseId:this.courseId,currentPage:this.currentPage,pageSize:this.pageSize})
  },
  methods: {
    ...mapActions(['getBookDetail','getSingleSetList']),
    toLookWhole() {
      this.$router.push({
        path: '/home/readings/summary',
        query: {}
      }) //query参数，replace 表示当前组件移除
    }
  }
}
</script>
<style lang="scss" scoped>
.book-detail-container {
  background-color: white;
  hr {
    height: 2px;
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
    .person-label > font {
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
    // .property-item {
    //   display: flex;
    //   flex-direction: row;
    //   margin: 8px 0px;
    //   align-items: center;
    // }
    // .property-item img {
    //   width: 28px;
    //   height: 28px;
    // }
    // .property-item p {
    //   color: rgb(22, 35, 60);
    //   font-size: 28px;
    //   line-height: 28px;
    //   margin: 0;
    // }
    p{
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
      font-size: 24px;
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
    font-size: 24px;
    padding: 96px 0;
    color: rgb(200, 200, 200);
  }
}
</style>
