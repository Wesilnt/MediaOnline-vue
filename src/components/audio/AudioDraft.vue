<template>
    <div class="detail-container">
      <div class="draft-content" v-html="draftContent.manuscript"/>
        <!-- <div class="detail-cover" :style="{background:'url('+audio.coverPic+')'}"> 
        </div> 
        <div class="detail-content">
            <h4>{{audio.title}}</h4>
            <hr>
            <div class="teacher-info">
                <span/>
                <div class="teacher-desc">
                    <p>{{audio.teacherName}}</p>
                    <p>{{audio.subTitle}}</p>
                </div>
            </div>
            <div class="detail-text">
                <div class="description" v-html="audio.description"/>
            </div> 
        </div> -->
    </div>
</template>
<script>
import { createNamespacedHelpers, mapState } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('audio')
export default {
  data() {
    return {
      lessonId: this.$route.params.lessonid
    }
  },
  computed: {
    ...mapGetters(['audio']),
    ...mapState(['draftContent'])
  },
  created() {
    this.getAudioDesc(this.lessonId)
  },
  methods: {
    ...mapActions(['getAudioDesc'])
  }
}
</script>
<style lang='scss'>
.detail-container {
  display: flex;
  flex-direction: column;
  .draft-content{
    padding: 0 5.333333333%;
    width: 89.33333333%; 
  }
  .detail-cover {
    height: 300px;
    width: 100%;
    background-color: #fde3e3;
  }
  .detail-content {
    box-sizing: border-box;
    width: 100%;
    h4 {
      font-size: 52px;
      color: rgb(47, 59, 81);
      margin: 72px 0 0 40px;
    }
    hr {
      margin-top: 72px 0 0 0;
      height: 1px; /*no*/
      border: none;
      background-color: rgb(227, 227, 227);
      width: 100%;
    }
    .teacher-info {
      margin: 40px 0 0 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #cda7a8;
      }
      .teacher-desc {
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        :nth-child(1) {
          color: rgb(51, 51, 51);
          font-size: 36px;
          margin: 0;
        }
        :nth-child(2) {
          color: rgb(179, 179, 179);
          margin: 0;
          font-size: 28px;
        }
      }
    }
  }
  .detail-text {
    font-size: 32px;
    color: rgb(51, 51, 51);
    line-height: 56px;
    word-break: break-all;
    word-wrap: break-word;
    word-spacing: 2px; /*no*/
    letter-spacing: 2px; /*no*/
    padding: 0 5.333333333%;
    width: 89.33333333%;
    margin: 60px 0;
    box-sizing: content-box;
    img{
      width: 100%;
    }
  }
}
</style>
