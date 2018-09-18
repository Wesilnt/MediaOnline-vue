<template>
  <div class="comments-container">
    <!-- 全部留言 -->
    <!-- <div class="commment-list"> -->
      <div v-if="commentList.length<=0" class="nodata-container">
          还没有评论，快来评论吧!
      </div>
      <van-list
          class="commment-list"
          v-model="refreshing"
          :finished="finished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
      <!-- <div v-for="item of commentList" :key="item.id" class="comment-item"> -->
           <van-cell  v-for="item of commentList" :key="item.id" class="comment-item" >
                  <comment-item :comment="item"/>
           </van-cell>
      <!-- </div> -->
      <!-- <div class="loadmore" v-scrollbottom="scrollBottom">加载更多</div> -->
      </van-list>
    <!-- </div> -->
    <!-- 评论按钮 -->
    <div class="comment-publish">
      <div class="comment-method" @click="onCommentMethod" v-if="false">
        <img :src="isSpeak?require('../../assets/audio_cmt_text.png'):require('../../assets/audio_cmt_speak.png')">
      </div>
      <div :class="{touched:isSpeaking}" class="comment-button">
        <p v-if="isSpeak" class="speak-btn" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          {{isSpeaking?'松开&nbsp;结束':'按住&nbsp;说话'}}
        </p>
        <textarea v-else v-model="commentContent" rows="1" placeholder="写评论" @keyup.enter="onKeyUp"/>
      </div>
      <div v-if="!isSpeak" class="comment-send" @click="onSendComment">
        <img :src="commentContent.length<=0?require('../../assets/cmt_send_unable.png'):require('../../assets/cmt_send_abled.png')">
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('comment')
import CommentItem from '../CommentItem.vue'
export default {
  components: {'comment-item': CommentItem},
  data() {
    return {
      lessonId: this.$route.params.lessonid,
      isSpeak: false,
      isSpeaking: false,
      commentContent: '',  
      refreshing:false
    }
  },
  directives:{
    'scrollbottom':(el,binding)=>{
      // window.onscroll = ()=>{
      //   // console.log(el.scrollTop)
      //   // console.log(el.scrollHeight)
      //   // console.log(el.offsetHeight)
      //   // binding.value()
      // }
    }
  },
  computed: { ...mapState(['commentList','finished','loading']) },
  created() {
    this.getCommentList({lessonId:this.lessonId,isLoadMore:false}) 
  },
  watch:{
    loading:function(loading){
      this.refreshing = loading
    }
  },
  methods: { 
    ...mapActions(['getCommentList', 'postComment']),
    //分页加载
    scrollBottom(){ 
      this.getCommentList({lessonId:this.lessonId,isLoadMore:true}) 
    },
    //切换评论方式
    onCommentMethod() {
      this.isSpeak = !this.isSpeak
    }, 
    //输入或者录入评论
    onInputeComment() {},
    //发送评论
    onSendComment() {  
       if(this.commentContent.trim().length<=0){
           this.$toast('期待你宝贵的建议')
           this.commentContent = ''
         return
       }
      this.postComment({
        regionId: this.lessonId, //单集id
        regionType: 2202, //目标类型（2201：专栏，2202：单集）
        commentType: 3301, //评论类型（3301:text,3302:voice,3303:text&voice)
        content: this.commentContent, //留言内容
        duration: '' //音频长度
      }) 
      this.commentContent = ''
    },
    //点赞
    onPraise(index) {
      let isPraised = this.comments[index].isPraised
      this.comments[index].isPraised = !isPraised
      this.$toast(isPraised ? '取消点赞' : '点赞成功')
    },
    onKeyUp(key){ 
      this.onSendComment(); 
    },
 
  }
}
</script>
<style lang='scss' scoped>
.commment-list {
  display: flex;
  flex-direction: column;
  padding-bottom: 160px;
  padding-top: 10px;
}
.nodata-container{
  height: 100vh;
  width: 100%;
  text-align: center;
  line-height: 80vh;
  font-size: 20px;
}
.comment-publish {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 20px 20px;
  width: 100%;
  height: 120px;
  background-color: rgb(247, 247, 247);
  align-items: center;
  justify-content: space-between;
  .comment-method {
    display: flex;
    img {
      align-self: center;
      width: 64px;
      height: 64px;
    }
  }
  .comment-button {
    flex-grow: 1;
    border: 1px solid rgb(204, 204, 204); /*no*/
    border-radius: 120px;
    overflow: hidden;
    height: 100%;
    margin: 20px 20px 20px 0;
    background-color: rgb(242, 242, 242);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    textarea {
      line-height: 64px;
      padding-left: 20px;
      overflow: hidden;
      font-size: 26px;
      width: 100%;
      height: 100%;
      color: rgb(128, 128, 128);
      border: none;
      background-color: transparent;
      outline: none;
    }
    .speak-btn {
      color: rgb(102, 102, 102);
      font-size: 26px;
      width: 100%;
      padding: 40px;
      text-align: center;
      background-color: transparent;
    }
  }
  .touched {
    background-color: rgb(204, 204, 204);
  }
  .comment-send {
    width: 64px;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
