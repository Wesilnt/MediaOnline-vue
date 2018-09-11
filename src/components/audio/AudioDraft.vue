<template>
    <div class="detail-container">
        <div class="detail-cover">
            <!-- <img src="" alt=""> -->
        </div>
        <div class="detail-content">
            <h4>绿山墙</h4>
            <hr>
            <div class="teacher-info">
                <span/>
                <div class="teacher-desc">
                    <p>伍智</p>
                    <p>国学老师</p>
                </div>
            </div>
            <div class="detail-text">
                <p>本书讲述安环科啊哈麻辣辣的发动机卡萨法即可，一组第卅饭店扩大收费监督卡父卡斯蒂略分 法即可大煞风景了 本书讲述安环科啊哈麻辣辣的发动机卡萨法即可，一组第卅饭店扩大收费监督卡 本书讲述安环科啊哈麻辣辣的发动机卡萨法即可，一组第卅饭店扩大收费监督卡 本书讲述安环科啊哈麻辣辣的发动机卡萨法即可，一组第卅饭店扩大收费监督卡</p>
            </div>

        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('audio'); 
export default {
  data(){
    return{
      lessonId:this.$route.params.lessonid
    }
  },
  created(){
      this.getAudioDesc({lessonId:this.lessonId})
  },
  methods:{
    ...mapActions(["getAudioDesc"])
  }
}
</script>
<style lang='scss'>
.detail-container {
  display: flex;
  flex-direction: column;
  .detail-cover {
    height: 300px;
    width: 100%;
    background-color: #fde3e3;
  }
  .detail-content {
    padding: 0 40px;
    h4 {
      font-size: 52px;
      color: rgb(47, 59, 81);
      margin-top: 72px;
    }
    hr {
      margin-top: 72px 0 0 0;
      height: 1px; /*no*/
      border: none;
      background-color: rgb(227, 227, 227);
      width: 100%;
    }
    .teacher-info {
      margin-top: 40px;
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
    margin-top: 60px;
    word-break: break-all;
    word-wrap: break-word;
    word-spacing: 2px; /*no*/
    letter-spacing: 2px; /*no*/
  }
}
</style>
