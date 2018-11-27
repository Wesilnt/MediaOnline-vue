<template>
  <div class="comments-container">
    <!-- 全部留言 -->
      <CommentList  :regionid="lessonId" :regiontype="2202" />
    <!-- 评论按钮 -->
    <div class="comment-publish">
      <div class="comment-method" @click="onCommentMethod" v-if="false">
        <img :src="isSpeak?require('../../assets/images/audio_cmt_text.png'):require('../../assets/images/audio_cmt_speak.png')">
      </div>
      <div :class="{touched:isSpeaking}" class="comment-button">
        <p v-if="isSpeak" class="speak-btn" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          {{isSpeaking?'松开&nbsp;结束':'按住&nbsp;说话'}}
        </p>
        <textarea v-else v-model="commentContent" @focus="onFocus" @blur="onBlur" rows="1" placeholder="写评论" @keyup.enter="onKeyUp"></textarea>
      </div>
      <div v-if="!isSpeak" class="comment-send" @click="onSendComment">
        <img :src="require('../../assets/images/cmt_send_abled.png')" :style="{opacity:commentContent.length<=0?'0.5':'1'}">
      </div>
    </div>
  </div>
</template>
<script>
import CommentList from '../comment/CommentList.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('commentData')
let commentInter = null
export default {
  components: { CommentList },
  data() {
    return {
      lessonId: this.$route.params.lessonId,
      isSpeak: false,
      isSpeaking: false,
      commentContent: ''
    }
  },
  methods: {
    ...mapActions(['postComment']),
    //切换评论方式
    onCommentMethod() {
      this.isSpeak = !this.isSpeak
    },
    //输入或者录入评论
    onInputeComment() {},
    onFocus() {
      this.handleResize()
    },
    onBlur() {
      clearInterval(commentInter)
    },
    //发送评论
    onSendComment() {
      if (this.commentContent.trim().length <= 0) {
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
    handleResize: function(e) {
      window.addEventListener('contextmenu', this.preventDefault)
      let height = null
      commentInter = setInterval(() => {
        const winHeight = window.innerHeight
        if (winHeight !== height) {
          height = winHeight
          commentBar.scrollIntoView(false)
          window.scrollTo(0, document.body.scrollHeight)
        }
      }, 100)
    },
    preventDefault: function(e) {
      e.preventDefault()
    },
    //点赞
    onPraise(index) {
      let isPraised = this.comments[index].isPraised
      this.comments[index].isPraised = !isPraised
      this.$toast(isPraised ? '取消点赞' : '点赞成功')
    },
    onKeyUp(key) {
      this.onSendComment()
    }
  }
  /**
   * 监听页面离开，设置本页面是否缓存起来， 如果跳转到评论页面, 设置本页面router:meta.keepAlive = true, 否则 = false
   */
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的 meta
  //   to.meta.keepAlive = true // 让 頁面缓存，即不刷新
  //   next()
  // },
}
</script>
<style lang='scss' scoped>
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
