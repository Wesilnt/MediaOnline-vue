<template> 
    <li class="singleset-item-container" tag="div" @click="onItemClick(item)">
      <div class="item-content">
        <div :class="{'icon-playing':playing}" class="item-icon" 
        v-lazy:background-image="`${item.coverPic}?imageView2/1/w/100/h/100/format/jpg/q/50`">
          <!-- <img :src="playing?require('../assets/images/icon_playing_shadow.png'):require('../assets/images/icon_pause_shadow.png')"> -->
          <i class="qhht-icon playItem-item-badge" :class="{'playItem-item-badge-active':activeID === item.id}"></i>
        </div>
        <div class="item-describe">
          <h3 :class="{'item-playing':playing}">{{item.title}}</h3>
          <h4> {{item.subTitle}}</h4>
          <div class="bottom-container">
            <span v-if="item.isFree">{{this.columnType === 'onlineCourse'? '试看':'试听'}}</span> 
            <p>{{item.totalTime | formatDuring}} | {{item.learnTime | learntimeFormat(item.totalTime, item.id)}}</p> 
          </div>
        </div>
      </div>
    </li> 
</template>

<script>
import {openVideoDetail,openAudioDetail} from '../utils/config'
export default {
  data(){
    return{
      columnType : this.$route.params.columnType,
      courseId : this.$route.params.courseId,
    }
  },
  //singleset 单集  playing是否正在播放
  props: ['item','isEmit', 'playing','activeID', 'coursename','useraccessstatus'],
  methods: {
    onItemClick(item) {
      if(this.isEmit)
      {
      this.$emit('jumpEvent', item.id)
      return
      }
      //单购成功、拼团成功、集赞成功已领取
      let unLock =1001 === this.useraccessstatus ||  1003 === this.useraccessstatus || 1008 === this.useraccessstatus
      if (item.isFree || unLock) { 
        if(this.columnType == 'onlineCourse'){
          openVideoDetail(this,{ courseId : this.courseId, columnType:this.columnType, lessonId:item.id})
          // this.$router.push({path: `/videoCourseDetail/${item.id}`})
          // this.$router.push({
          //      name: 'videoCourseDetail',
          //      params:{
          //        courseId : this. courseid,
          //        columnType:this.columnType,
          //        lessonId:item.id
          //      }
          //   })
        }else{
          openAudioDetail(this,{ courseId : this.courseId, columnType:this.columnType, lessonId:item.id})
          // this.$router.push({
          //   name: 'AudioPlay',
          //   params: { 
          //     courseId: this.courseid,
          //     columnType: this.columnType,
          //     lessonId: item.id,
          //   },  
          //   query:{courseName:this.coursename}
          // })
        }
      } else {
        this.$toast.fail('您还未购买该专栏')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
li+li{
  // border-bottom:none;
  border-top: 2px solid #F1F1F1;
}
.singleset-item-container {
  display: block;
  flex-direction: column;
  justify-content: center;
  // margin: 0 36px -2px;
  // margin: 0 0px -2px;


  .item-icon {
    align-self: center;
    width: 96px;
    height: 96px;
    // padding: 28px 31px 28px 35px;
    box-sizing: border-box;
    background-color: #fde3e3;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 96px;
    display: flex;
    border-radius: 96px;
  }
  // .icon-playing {
    // padding: 31px 28px 31px 29px;
  // }
  .item-icon img {
    margin: auto 31px auto 35px;
    width: 28px;
    height: 40px;
  }
  .playItem-item-badge {
    margin: auto 31px auto 35px;
    width: 28px;
    height: 40px;
    background-image: url('../assets/images/icon_pause_shadow.png');
    background-size: 36px;
    &.playItem-item-badge-active { 
      background-image: url('../assets/images/icon_playing_shadow.png');
    }
  }
  .icon-playing img {
    width: 38px;
    height: 34px;
    margin: auto 0;
  }
  .item-content {
    display: flex;
    flex-direction: row;
  }
  .item-describe {
    display: block;
    flex-direction: column;
    margin-left: 20px;
    h3 {
      font-size: 32px;
      color: rgb(22, 35, 60);
      margin: 24px 0 0 0;
      line-height: 32px;
      font-weight: 500;
    }
    h4 {
      margin: 20px 0 0 0;

      line-height: 24px;
      font-weight: 300;
      color: rgb(102, 102, 102);
    }
    .item-playing {
      color: rgb(255, 163, 47);
    }
  }
  .bottom-container {
    display: flex;
    flex-direction: row;
    margin: 20px 0 24px 0;
    align-items: center;
  }
  .bottom-container span {
    background-color: #ea605c;
    color: white;
    padding: 4px 12px;
    border-radius: 10px;
    font-size: 26px;
    margin-right: 20px;
  }
  .bottom-container p {

    color: rgb(148, 154, 170);
    margin: 0;
    line-height: 24px;
  }
}
</style>
