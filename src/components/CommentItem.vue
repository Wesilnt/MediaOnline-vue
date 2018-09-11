<template>
  <div class="comments-container">
    <!-- 全部留言 -->
    <div class="comment-item" :style="{padding:'0px '+unindent?0:40+'px 48px'}">
      <div class="comment-header">
        <img :src="comment.fromAvatarUrl">
      </div>
      <div class="comment-detail">
        <div class="top-container">
          <div class="username-date">
            <h2>{{comment.fromNickName}}</h2>
            <h5>{{comment.createTime | dateFormat("MM-mm")}}</h5>
          </div>
          <div class="thumb-container" @click="onPraise()">
            <img :src="comment.isPraised?require('../assets/cmt_praise_selected.png'):require('../assets/cmt_praise_normal.png')">
            <span>{{comment.likeCount}}</span>
          </div>
        </div>
        <div class="center-container">
          <div v-if="comment.commentType==3301" class="text-container">
            <p :class="{fold:!isExpand}" ref="cmtContent">{{comment.content | getSingleCourseName(0)}}</p>
            <p  style="visibility:hidden;position:absolute;color:red;margin:0 40px 0 0" id="ref" ref="reference">{{comment.content | getSingleCourseName(0)}}</p>
            <span v-if="!isExpand && canExpand" @click="isExpand=true">全文</span>
          </div>
          <div v-else class="voice-container">
            <img src="../assets/cmt_voice_icon.png">
            <span>{{comment.audioTime}}"</span>
          </div>
        </div>
        <div v-if="regiontype==2201" class="bottom-container">
          <!-- <font>{{comment.content | getSingleCourseName()}}</font> -->
          {{comment.content | getSingleCourseName(1)}}
        </div>
        <div v-else-if="regiontype===2202">
          <font>{{comment.childComment && comment.childComment.fromNickName}}</font>
          {{comment.childComment && comment.childComment.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  filters: {
    dateFormat: function(value) {
      var date = new Date(value)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      var d = date.getDate()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    },
    getSingleCourseName:function(value,index) { 
      console.log('---------------------') 
      console.log(value) 
      let arr = value.split('=>')
      return arr[index]
    }
  },
  props:{
    comment:{
      default:{}
    },unindent:'',regiontype:''
  }, 
  data() {
    return {
      canExpand: true,
      isExpand:false,
    }
  },
  methods: {
    //点赞
    onPraise() {
      let isPraised = this.comment.isPraised
      this.comment.isPraised = !isPraised
      this.$toast({ 
        message: isPraised ? '取消点赞' : '点赞成功'
      })
    }
  },
  mounted() {
    // console.log(this.comment)
    this.$nextTick(() => {
      let ref = this.$refs.reference
      if (ref) {
        console.log(ref.scrollHeight)
        this.canExpand = ref.scrollHeight > 22 * 3
      }
    })
  }
}
</script>
<style lang='scss'>
.comment-item {
  display: flex;
  flex-direction: row;
  padding: 0px 40px 48px;
  .comment-header {
    width: 80px;
    height: 80px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .comment-detail {
    display: flex;
    flex-direction: column;
    margin-left: 32px;
    flex:1
  }
  .top-container {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .username-date {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    h2 {
      margin: 0;
      font-size: 32px;
      line-height: 32px;
      color: rgb(128, 128, 128);
    }
    h5 {
      margin: 0 0 0 24px;
      font-size: 22px;
      line-height: 22px;
      align-self: flex-end;
      color: rgb(179, 179, 179);
    }
    .thumb-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: flex-end;
    }
    .thumb-container img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
    .thumb-container span {
      color: rgb(255, 163, 47);
      font-size: 28px;
      line-height: 28px;
    }
  }
  .center-container {
    margin-top: 24px;
    .text-container {
      font-size: 28px;
      color: rgb(51, 51, 51);
      line-height: 48px;
      display: flex;
      flex-direction: column;
      letter-spacing: 1px; /*no*/
      p {
        margin: 0;
        font-size: 28px;
        line-height: 44px;
      }
      span {
        font-size: 28px;
        color: rgb(255, 149, 33);
        text-align: right;
      }
      .fold {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .voice-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: rgb(255, 205, 126);
      border-radius: 180px;
      width: 180px;
      height: 60px;
      align-items: center;
      padding: 20px;
    }
    .voice-container img {
      width: 20px;
      height: 30px;
    }
    .voice-container span {
      color: white;
      font-size: 30px;
    }
  }
  .bottom-container {
    margin-top: 28px;
    font-size: 28px;
    letter-spacing: 1px; /*no*/
    background-color: rgba(247, 247, 247, 0.5);
  }
  .bottom-container font {
    color: rgb(179, 179, 179);
    font-size: 36px;
  }
}
.van-toast--text {
  width: auto;
  min-width: 0;
}
</style>
