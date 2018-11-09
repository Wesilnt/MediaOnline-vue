<template>
    <div class="descrip-container">
      <div class="book-header-container"  >
       <div class="book-cover" :style="{background:'url('+getBookIntroduce.coverPic+')','background-size':'100%'}">
        <span v-if="new Date().getTime() - new Date(getBookIntroduce.createTime).getTime()<30*24*3600*1000">上新</span>
      </div>
    </div>
        <div class="course-name">
           {{getBookIntroduce.name}}
        </div>
        <hr>
        <div class="course-detail">
            <div class="course-content">
                <h2>内容介绍:</h2>
                <p v-html= "getBookIntroduce.description"/>
            </div>
            <div class="course-author">
                <h2>作者介绍:</h2>
                <p v-html= "getBookIntroduce.authorBriefIntro"/>
            </div>
            <div class="course-speaker">
                <h2>播讲者介绍:</h2>
                <p v-html="getBookIntroduce.radioIntro" />
            </div>
        </div>

    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('columnData')
export default {
  computed: {
    ...mapGetters(['getBookIntroduce'])
  },
}
</script>
<style lang="less" scoped>
.descrip-container {
  display: flex;
  flex-direction: column;

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
  .descrip-header {
    height: 372px;
    width: 100%;
    background-color: #fde3e3;
  }
  .course-name {
    font-size: 52px;
    color: rgb(47, 59, 81);
    margin-top: 72px;
    margin-left: 40px;
  }

  hr {
    border: none;
    height: 1px; /*no*/
    background-color: rgb(227, 227, 227);
    margin: 72px 40px 0;
  }
  .course-detail {
    display: flex;
    flex-direction: column;
    margin: 40px;
    box-sizing: border-box;
    h2 {
      margin: 40px 0 0 0;
      font-size: 36px;
      color: rgb(5, 4, 0);
    }
    p {
      margin: 0;
      letter-spacing: 2px; /*no*/
      font-size: 32px;
      line-height: 52px;
      color: rgb(70, 69, 77);
    }
  }
}
</style>
