<template>
    <div class="books-container">
        <hr>
        <div class="book-list">
       <van-list
          class="commment-list"
          v-model="refreshing"
          :finished="finished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
            <router-link v-for="item of freeZoneList" :key="item.id" :to="'/audio/audioplay?id='+item.id">
                <div class="book-item">
                    <img :src="playingId==item.id?playingIcon:pauseIcon" >
                    <div class="book-content">
                        <p :class="{'book-title-playing':playingId == item.id}">
                           {{ item.title}}
                        </p>
                        <div class="book-bottom">
                            <span :class="{'book-datetime':isNewest(item.createTime,timeLen)}">{{item.createTime| createtimeFormat(timeLen)}}</span>
                            <span class="book-state">时长{{item.totalTime | formatDuring}} | {{item.learnTime |learntimeFormat(item.totalTime,item.id)}}</span>
                        </div>
                    </div>
                </div>
                <hr>
            </router-link> 
            </van-list>
           <button :class="{subscribe:isSubscribe}" @click="subscribe">{{isSubscribe?'已订阅':'订阅'}}</button> 
        </div>
    </div>
</template> 
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('freezone')
export default {
  filters: {
    createtimeFormat:function(value,timeLen){
      let createDate = new Date(value)
      let isNewest = Date.now() - createDate.getTime()<timeLen
      if(isNewest) {
       return '最新'
      }else{
        let year = createDate.getFullYear()
        let month = createDate.getMonth()+1
        let m =  month < 10 ? "0"+ month : month
        let date = createDate.getDate()
        let d =  date < 10 ? "0"+ date:date
        return year + "/" + m + "/"+ d
      }
    }
  },
  data() {
    return {
      timeLen : 30*24*60*60*1000,
      playingIcon: require('../../assets/freezone_playing.png'),
      pauseIcon: require('../../assets/freezone_pause.png'), 
      refreshing:false
    }
  },
  computed:{...mapState(['freeZoneList','loading','finished','isSubscribe']),...mapGetters(['playingId'])},
  created(){
      this.getFreezoneList(1);
      this.getUserByToken();
  },
   watch:{
    loading:function(loading){ 
      this.refreshing = loading
    }
  },
  methods: {
    ...mapActions(["getFreezoneList",'doFreeLesson','getUserByToken']),
    //分页加载
    scrollBottom(){ 
      this.getFreezoneList() 
    },
    isNewest(createTime, timeLen){
      let createDate = new Date(createTime)
      return Date.now() - createDate.getTime()<timeLen
    },
    subscribe() {  
      this.doFreeLesson()  
    }
  }
}
</script>

<style lang="scss" scoped>
.books-container {
  hr {
    height: 1px; /*no*/
    background: rgb(227, 227, 227);
    border: 0;
    margin: 0;
  }
  .book-list {
    display: flex;
    flex-direction: column;
    padding-bottom: 116px;
    hr {
      height: 1px; /*no*/
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
      border: 1px solid; /*no*/
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
  .subscribe {
    background-color: rgb(230, 230, 230);
  }
  button:focus {
    outline: 0;
  }
}
.book-subscribe:focus {
  outline: 0;
}
</style>
