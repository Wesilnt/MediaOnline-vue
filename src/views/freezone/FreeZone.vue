<template>
    <div>
       <van-list
               class="freeZone-list"
          v-model="refreshing"
          :finished="finished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
            <router-link class="qhht-flex freeZone-item" v-for="(item,index) of freeZoneList" :key="item.id" :to="{name:'AudioPlay', params:{id:item.id},query:{playType:'freezone'}}">
                    <img  class="freeZone-infoBtn" :src="playingId===item.id?playingIcon:pauseIcon" >
                    <div class="freeZone-content">
                        <p class="freeZone-item-title" :class="{'book-title-playing':playingId === item.id}">
                           {{ item.title}}
                        </p>
                        <span class="book-datetime" v-if="isNewest(item.createTime,timeLen)">{{item.createTime| createtimeFormat(timeLen)}}</span>
                        <span>时长{{item.totalTime | formatDuring}} | {{item.learnTime |learntimeFormat(item.totalTime,item.id)}}</span>
                </div>
            </router-link>
            </van-list>
        <p class="footer-warn">没有更多啦</p>
           <a class="qhht-blockButton subscribe-btn" :class="{'subscribe-disabled':isSubscribe}" @click="subscribe">{{isSubscribe?'已订阅':'订阅'}}</a>
    </div>
</template> 
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('FreeZoneData')
export default {
  filters: {
    createtimeFormat: function(value, timeLen) {
      let createDate = new Date(value)
      let isNewest = Date.now() - createDate.getTime() < timeLen
      if (isNewest) {
        return '最新'
      } else {
        let year = createDate.getFullYear()
        let month = createDate.getMonth() + 1
        let m = month < 10 ? '0' + month : month
        let date = createDate.getDate()
        let d = date < 10 ? '0' + date : date
        return year + '/' + m + '/' + d
      }
    }
  },
  data() {
    return {
      timeLen: 30 * 24 * 60 * 60 * 1000,
      playingIcon: require('../../assets/images/freezone_playing.png'),
      pauseIcon: require('../../assets/images/freezone_pause.png'),
      refreshing: false
    }
  },
  computed: {
    ...mapState(['freeZoneList', 'loading', 'finished', 'isSubscribe']),
    ...mapGetters(['playingId'])
  },
  created() {
    this.getFreezoneList(1)
    this.getUserByToken()
  },
  watch: {
    loading: function(loading) {
      this.refreshing = loading
    }
  },
  methods: {
    ...mapActions(['getFreezoneList', 'doFreeLesson', 'getUserByToken']),
    //分页加载
    scrollBottom() {
      this.getFreezoneList()
    },
    isNewest(createTime, timeLen) {
      let createDate = new Date(createTime)
      return Date.now() - createDate.getTime() < timeLen
    },
    subscribe() {
      if (this.isSubscribe) {
        this.$toast('已订阅')
      } else {
        this.doFreeLesson()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.freeZone-list {
  padding: 0 20px;
  letter-spacing: 1px;
}
.freeZone-item {
  padding: 32px;
  border: 0;
  border-bottom: 2px #f1f1f1 solid;
}
.freeZone-item-title {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
  &.book-title-playing {
    font-weight: bolder;
    color: #ffa32f;
  }
}

.freeZone-infoBtn {
  width: 60px;
  margin-right: 20px;
}
.freeZone-content {
  flex-grow: 1;
  color: #666;
}
.book-datetime {
  border: 2px solid #ed6c67;
  border-radius: 6px;
  padding: 4px 20px;
  color: #ed6c67;
  margin-right: 20px;
}
.footer-warn {
  margin: 96px 0 192px;
  text-align: center;
  font-weight: bolder;
  color: #c8c8c8;
}
.subscribe-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 96px;
  line-height: 96px;
  font-size: 32px;
  border-radius: 0;
  outline: none;
}
.subscribe-disabled {
  background-color: #e6e6e6;
}
</style>
