<template>
    <section>
        <div v-if="messageList.length===0" class="sysmessage-nodata">
            <i class="qhht-icon sysmessage-nodata-icon"/>
            <p class="sysmessage-nodata-warn">暂无系统消息</p>
            <a class="sysmessage-nodata-btn"></a>
        </div>
        <div v-else class="sysmessage-container">
            <div class="sysmessage-head" justify-content="around">
                <div class="sysmessage-head-left">
                    <img class="sysmessage-head-left-img" src="../../assets/images/my_sys_notify.png">
                    <div class="sysmessage-head-left-text">全部通知</div>
                </div>
                <div class="sysmessage-head-right">
                    <img class="sysmessage-head-right-img" src="../../assets/images/my_sys_menu.png">
                </div>
            </div>
            <div class="divider-line"></div>
            <div>
                <div>
                    <div v-for="item in messageList" :key="item.id">
                        <van-swipe-cell :right-width="150" :on-close="onClose(item.id)">
                            <div class="sysmessage-list-item">
                                <div class="item-head">
                                    <div v-if="item.busiType===3102" class="sysmessage-list-item-title">留言入选通知</div>
                                    <div v-if="item.busiType===3103" class="sysmessage-list-item-title">系统消息</div>
                                    <div v-if="item.busiType===3105" class="sysmessage-list-item-title">留言升级通知</div>
                                    <div v-if="item.busiType===3106" class="sysmessage-list-item-title">用户反馈通知</div>
                                    <div class="sysmessage-list-item-time">{{item.createTime | formatDate }}</div>
                                </div>
                                <div class="sysmessage-list-item-content">{{item.content}}</div>
                            </div>
                            <span slot="right">删除</span>
                        </van-swipe-cell>
                        <div class="divider-line"></div>
                    </div>
                    <div/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

  import {createNamespacedHelpers} from 'vuex'

  const {
    mapState,
    mapActions,
  } = createNamespacedHelpers('mySysMessage')
  export default {
    name: 'SysMessage',
    components: {
      // NavBar
    },
    data: function () {
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
              instance.close();
              break;
            case 'right':
              instance.close();
              this.delSysMessage({msgId: id})
              break;
          }
        }
      }
    },
    created() {
      this.queryList()
    },
    filters: {
      formatDate: function (time) {
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
            padding: 30px;
        }

        &-head {
            display: flex;
            justify-content: space-between;
            padding: 54px 30px 34px 30px;
        }

        &-head-left {
            align-items: center; /*垂直居中*/
            justify-content: center; /*水平居中*/
            display: flex;
            flex-direction: row;
        }

        &-head-left-text {
            width: 300px;
            padding-top: 5px;
            font-size: 36px;
        }

        &-head-right {
            display: none;
        }

        &-head-left-img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
        }

        &-head-right-img {
            width: 42px;
            height: 39px;
        }

        .divider-line {
            height: 1px;
            background: #ddd;
            text-align: center;
            margin: 0px 30px 0px 30px;
        }

        &-list-item {
            padding: 0px 32px 0px 32px;
        }

        &-list-item-title {
            font-weight: bold;
            font-size: 32px;
            display: inline;
            padding-right: 24px;
        }

        &-list-item-time {
            font-size: 22px;
            display: inline;
            color: #9ba1b0;
        }

        &-list-item-content {
            padding: 0px 32px 32px 70px;
            font-size: 28px;
            color: #808080;
        }

        .van-swipe-cell span {
            width: 150px;
            height: 100%;
            color: #FFFFFF;
            font-size: 18px;
            display: block;
            line-height: 44px;
            background-color: #F44;
            display: flex;
            justify-content: center;
            align-items: Center;
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
</style>
