<template>
    <div class="qhht-flex playItem-container" @click="onClick">
        <i class="qhht-icon playItem-avator"  v-lazy:background-image="`${iteminfo.coverPic}?imageView2/1/w/100/h/100/format/jpg/q/50`">
            <i class="qhht-icon playItem-item-badge" :class="{'playItem-item-badge-active':activeID === iteminfo.id}"></i>
        </i>
        <div class="playItem-content">
            <p class="playItem-title" :class="{'playItem-title' : true, 'playItem-title-active' : activeID === iteminfo.id}">{{iteminfo.title}}</p>
            <p class="playItem-info">{{iteminfo.subTitle}}</p>
            <p>
                <a v-if="iteminfo.isFree" class="audition-btn">试听</a>
                <span>{{iteminfo.totalTime | formatDuring}}</span> |
                <span>{{ iteminfo.learnTime |getProgress(iteminfo.totalTime,iteminfo.id) }}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['iteminfo', 'lastindex', 'activeID'],
  data() {
    return {
      studyProgress: '', //收听进度
      isPlaying: false
    }
  },
  filters: {
    //截取得到时分秒
    handleDate: function(value) {
      return value.substr(11, 8)
    },
    //计算收听进度
    getProgress(learnTime,totalTime,lessonId) {
      // if(本地有播放数据){
      //   用本地播放数据计算进度
      // }else {
      //   用服务器的播放数据计算进度
      // }
      let videoData = JSON.parse(window.localStorage.getItem(lessonId))
      let curTime = 0
      let percent = 0
      if (videoData && videoData.historyPlayPosition > 0) {
        curTime = parseInt(videoData.historyPlayPosition)
        console.log('curTime =',curTime)
        if (!curTime || curTime <= 1) return '未收听'
        percent = parseInt((curTime * 100) / totalTime)
      }else{
        curTime = learnTime
        if (!curTime || curTime <= 1) return '未收听'
        percent = parseInt((curTime * 100) / totaltime)
      }
      return '已收听' + (percent < 1 ? 1 : percent) + '%'
    }
  },
  methods: {
    onClick() {
      this.$emit('jumpEvent', this.iteminfo.id)
    }
  }
}
</script>

<style lang='less' scoped>
.playItem-container {
  padding: 24px;
  background-color: white;
  flex-direction: row;
  &:not(:last-child) {
    border-bottom: 2px solid #ededed;
  }
  color: #717171;
}
.playItem-avator {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f6f6f6;
  overflow: hidden;
}
.playItem-item-badge {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  background-image: url('../../../assets/images/icon_pause_shadow.png');
  background-size: 36px;
  &.playItem-item-badge-active {
    background-size: 48px;
    background-image: url('../../../assets/images/icon_playing_shadow.png');
  }
}
.playItem-content {
  flex-grow: 1;
  padding: 0 24px;
}
.playItem-title {
  font-size: 32px;
  color: #333;
  &.playItem-title-active {
    color: #ffa32f;
    font-weight: bolder;
  }
}

.playItem-info {
  margin: 12px 0;
}
.audition-btn {
  border-radius: 8px;
  background-color: #ed6c67;
  padding: 7px 20px;
  color: white;
  margin-right: 20px;
}
</style>
