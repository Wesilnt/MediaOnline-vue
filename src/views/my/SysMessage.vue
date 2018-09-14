<template>
    <section>
        <div v-if="messageList.length===0" class="sysmessage-nodata">
            <i class="qhht-icon sysmessage-nodata-icon"/>
            <p class="sysmessage-nodata-warn">暂无系统消息</p>
            <a class="sysmessage-nodata-btn"></a>
        </div>
        <div v-else class="sysmessage-container">
            <div class="sysmessage-head">
                <img class="sysmessage-head-left-icon" src="../../assets/images/my_record_play.png"/>
                <p class="sysmessage-head-record-text">最近播放</p>
                <img class="sysmessage-head-right-icon" src="../../assets/images/my_sys_menu.png">
            </div>
        </div>
        <div>
            <div>
                <div v-for="item in messageList" :key="item.id" class="sysmessage-list">
                    <div class="sysmessage-list-item">
                        <!--<img src="" class="like-item-avatar"/>-->
                        <div class="sysmessage-list-item-content">
                            <div class="sysmessage-list-item-content">
                                <div>
                                    <div v-if="item.busiType===3102" class="sysmessage-list-item-content-top-title">
                                        留言入选通知
                                    </div>
                                    <div v-if="item.busiType===3103" class="sysmessage-list-item-content-top-title">
                                        系统消息
                                    </div>
                                    <div v-if="item.busiType===3105" class="sysmessage-list-item-content-top-title">
                                        留言升级通知
                                    </div>
                                    <div v-if="item.busiType===3106" class="sysmessage-list-item-content-top-title">
                                        用户反馈通知
                                    </div>
                                    <div class="sysmessage-list-item-content-top-time">{{item.createTime | formatDate
                                        }}
                                    </div>
                                </div>
                                <div class="sysmessage-list-item-content-detail">{{item.content}}</div>
                            </div>
                        </div>
                        <img class="sysmessage-list-item-img-more" src="../../assets/images/my_record_more.png"/>
                    </div>
                </div>
                <div/>
            </div>
        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('mySysMessage')
export default {
  name: 'SysMessage',
  components: {
    // NavBar
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['messageList', 'loading'])
  },
  methods: {
    ...mapActions(['queryList', 'delSysMessage']),
    onClose(id) {
      return (clickPosition, instance) => {
        console.log(id)
        switch (clickPosition) {
          case 'left':
          case 'cell':
          case 'outside':
            instance.close()
            break
          case 'right':
            instance.close()
            this.delSysMessage({ msgId: id })
            break
        }
      }
    }
  },
  created() {
    this.queryList()
  },
  filters: {
    formatDate: function(time) {
      var date = new Date(time)
      const seperator1 = '-'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return month + seperator1 + strDate
    }
  }
}
</script>

<style scoped lang="less">
@active: #ffa32f;
.sysmessage {
  &-container {
  }
  &-head {
    display: flex;
    flex-direction: row;
    padding: 34px 0px 34px 0px;
    margin: 0px 30px 0px 30px;
    border-bottom: 0.1px solid #ddd;
    &-left-icon {
      width: 40px;
      height: 40px;
      margin: 7px 20px 0px 0px;
    }
    &-record-text {
      padding: 3px 8px 0px 0px;
      font-size: 36px;
      color: #3e3e53;
    }
    &-right-icon {
      width: 28px;
      height: 26px;
      margin: 10px 0px 0px 0px;
      position: absolute;
      right: 30px;
    }
  }
  &-list {
    padding: 0px 30px 0px 30px;

    &-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 24px 0px 32px 0px;
      border-bottom: 0.1px solid #ddd;
      &-content {
        flex-grow: 1;
        &-top {
          display: flex;
          flex-direction: row;
          &-title {
            font-weight: bold;
            font-size: 32px;
            display: inline;
            padding-right: 24px;
          }
          &-time {
            font-size: 22px;
            display: inline;
            color: #9ba1b0;
          }
        }
        &-detail {
          padding: 32px 32px 0px 70px;
          font-size: 28px;
          color: #808080;
        }
      }
      &-img-more {
        width: 34px;
        height: 6px;
        margin: 59px 0px 0px 0px;
        /*position: absolute;*/
        /*right: 30px;*/
      }
    }
  }
  &-nodata {
    height: 100vh;
    text-align: center;
    color: #949aaa;
    &-icon {
      width: 180px;
      height: 200px;
      margin-top: 180px;
      background-image: url('../../assets/my-nodata.png');
    }
    &-warn {
      font-size: 24px;
      margin: 40px 0;
    }
  }
}

.van-swipe-cell span {
  width: 150px;
  height: 100%;
  color: #ffffff;
  font-size: 18px;
  display: block;
  line-height: 44px;
  background-color: #f44;
  display: flex;
  justify-content: center;
  align-items: Center;
}
</style>
