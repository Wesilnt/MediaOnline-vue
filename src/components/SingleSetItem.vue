<template> 
    <div class="singleset-item-container" tag="div" @click="onItemClick(item)">
      <div class="item-content">
        <div :class="{'icon-playing':playing}" class="item-icon" v-lazy:background-image="`${item.coverPic}?imageView2/1/w/100/h/100/format/jpg/q/50`">
          <img :src="playing?require('../assets/images/icon_playing_shadow.png'):require('../assets/images/icon_pause_shadow.png')">
        </div>
        <div class="item-describe">
          <h3 :class="{'item-playing':playing}">
            {{item.title}}
          </h3>
          <h4>
            {{item.subTitle}}
          </h4>
          <div class="bottom-container">
            <span v-if="item.isFree">试听</span> 
            <p>{{item.totalTime | formatDuring}} | {{item.learnTime | learntimeFormat(item.totalTime,item.id)}}</p> 
          </div>
        </div>
      </div>
    </div> 
</template>

<script>
export default {
  //singleset 单集  playing是否正在播放
  props: ['item', 'playing','columnType','courseid','coursename','useraccessstatus'],
  methods: {
    onItemClick(item) {
      let unLock = false
      switch(this.useraccessstatus){
        case -3://拼团失败
        break
        case 0:
        break
        case 1001://单购成功
          unLock = true
        break
        case 1003://拼团成功
         unLock = true
        break
        case 1005://拼团中
        break
        case 1007://集赞成功未领取
        break
        case 1008://集赞成功已领取
         unLock = true
        break
        case 1009://集赞中
        break
      }
      if (item.isFree || unLock) {
        if(this.columnType == '1005'){
          this.$router.push({path: `/videoCourseDetail/${item.id}`})
        }else{
          this.$router.push({
            name: 'AudioPlay',
            params: { 
              courseId: this.courseid,
              columnType: this.columnType,
              lessonId: item.id,
            },  
            query:{courseName:this.coursename}
          })
        }
      } else {
        this.$toast.fail('您还未购买该专栏')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.singleset-item-container {
  display: block;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px solid #F1F1F1;
  margin: 0 36px -2px;

  .item-icon {
    align-self: center;
    width: 96px;
    height: 96px;
    // padding: 28px 31px 28px 35px;
    box-sizing: border-box;
    background-color: #fde3e3;
    background-size: 96px;
    display: flex;
    border-radius: 96px;
  }
  .icon-playing {
    padding: 31px 28px 31px 29px;
  }
  .item-icon img {
    margin: auto 31px auto 35px;
    width: 28px;
    height: 40px;
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
