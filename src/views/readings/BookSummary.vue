<template>
    <div class="descrip-container">
        <div class="descrip-header" :style="{background:'url('+getBookIntroduce.coverPic+')'}"/>
        <div class="course-name">
           {{getBookIntroduce.name}}
        </div>
        <hr>
        <div class="course-detail">
            <div class="course-content">
                <h2>内容介绍:</h2>
                <p>{{getBookIntroduce.description||'暂无相关介绍'}}</p>
            </div>
            <div class="course-author">
                <h2>作者介绍:</h2>
                <p>{{getBookIntroduce.authorIntro||'暂无相关介绍'}}</p>
            </div>
            <div class="course-speaker">
                <h2>播讲者介绍:</h2>
                <p>{{getBookIntroduce.commentatorIntro||'暂无相关介绍'}}</p>
            </div>
        </div>

    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('readings')
export default {
  computed: {
    ...mapGetters(['getBookIntroduce'])
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.descrip-container {
  display: flex;
  flex-direction: column;
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
