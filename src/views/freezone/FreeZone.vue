<template>
    <div class="books-container">
        <hr>
        <div class="book-list">
            <router-link to="/audio/audioplay" v-for="item of bookList" :key="item.id">
                <div class="book-item">
                    <img :src="item.isPlaying?playingIcon:pauseIcon" />
                    <div class="book-content">
                        <p :class="{'book-title-playing':item.isPlaying}">
                            文学| 为什么抱怨科技没有食堂?
                        </p>
                        <div class="book-bottom">
                            <span :class="{'book-datetime':item.isPlaying}">{{item.isPlaying?'最新':'2018/08/11'}}</span>
                            <span class="book-state">时长02:11 | 未学习</span>
                        </div>
                    </div>
                </div>
                <hr>
            </router-link> 
                <button :class="{subscribe:isSubscribe}" @click="isSubscribe = !isSubscribe">订阅</button> 
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      playingIcon:require("../../assets/freezone_playing.png"),
      pauseIcon: require("../../assets/freezone_pause.png"),
      bookList: [
        { id: 1, isPlaying: true },
        { id: 2, isPlaying: false },
        { id: 3, isPlaying: false },
        { id: 4, isPlaying: false },
        { id: 5, isPlaying: false },
        { id: 6, isPlaying: false },
        { id: 7, isPlaying: false },
        { id: 8, isPlaying: false },
        { id: 9, isPlaying: false },
        { id: 10, isPlaying: false },
        { id: 11, isPlaying: false }
      ],
      isSubscribe : false
    }
  },
  methods:{
      subscribe(){
          //TODO 订阅代码
          Toast('订阅')
      }
  }
};
</script>

<style lang="scss" scoped>
.books-container { 
  hr {
    height: 1px;/*no*/
    background: rgb(227, 227, 227);
    border: 0;
  }
  .book-list {
    display: flex;
    flex-direction: column;
    padding-bottom: 116px;
    hr {
      height: 1px;/*no*/
      background: rgb(227, 227, 227);
      border: 0;
      margin: 0 40px;
      box-sizing: border-box;
    }
  }
  .book-item {
    display: flex;
    flex-direction: row;
    padding: 40px;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      margin: auto 20px auto 0;
    }
  }
  .book-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      line-height: 28px;
      margin: 0 0 12px 0;
      font-size: 28px;
      color: rgb(51, 51, 51);
    }
    .book-title-playing {
      color: rgb(255, 163, 47);
    }
  }
  .book-bottom {
    margin: 12px 0 0px 0;
    line-height: 24px;
    span {
      font-size: 24px;
      color: rgb(102, 102, 102);
      margin-right: 20px;
    }
    .book-datetime {
      font-size: 24px;
      border: 1px solid;/*no*/
      border-radius: 10px;
      padding: 2px 20px;
      color: red;
      margin-right: 20px;
    }
  }
  button {
    z-index: 99999;
    position: fixed;
    height: 96px;
    color: white;
    font-size: 32px;
    width: 100%;
    bottom: 0px;
    border: 0;
    background-color: rgb(255, 163, 47);
    outline: none;
  }
  .subscribe{
    background-color: rgb(230, 230, 230);
  }
  button:focus{outline:0;}
   
} 
.book-subscribe:focus{outline:0;} 
</style>
