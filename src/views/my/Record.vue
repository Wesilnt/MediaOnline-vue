<template>
    <section>
        <div v-if="playRecordList.length===0" class="playRecord-nodata">
            <i class="qhht-icon playRecord-nodata-icon"/>
            <p class="playRecord-nodata-warn">暂无播放记录</p>
            <a class="playRecord-nodata-btn"></a>
        </div>
        <div v-else class="playRecord-container">
            <div class="playRecord-head-top-img">
            </div>

            <div class="playRecord-head">
                <img class="playRecord-head-left-icon" src="../../assets/images/my_record_play.png"/>
                <p class="playRecord-head-record-text">最近播放</p>
                <p class="playRecord-head-record-number">(共26条记录)</p>
                <img class="playRecord-head-right-icon" src="../../assets/images/my_sys_menu.png">
            </div>

            <div v-for="item in playRecordList" :key="item.id">
                <van-swipe-cell :right-width="150" :on-close="onClose(item.id)">
                    <div class="playRecord-item">
                        <img src="" class="like-item-avatar"/>
                        <div class="playRecord-item-content">
                            <p class="playRecord-item-content-name">{{item.title}}</p>
                            <p class="playRecord-item-content-detail">{{item.subTitle}}</p>
                        </div>
                        <img class="playRecord-item-img-more" src="../../assets/images/my_record_more.png"/>
                    </div>
                    <span slot="right">删除</span>
                </van-swipe-cell>
            </div>
        </div>
    </section>
</template>

<script>

  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers(
    'myPlayRecord'
  )
  export default {
    name: 'Record',
    components: {
      // NavBar
    },
    data: function () {
      return {}
    },
    computed: {
      ...mapState(['playRecordList', 'loading'])
    },
    methods: {
      ...mapActions(['queryList', 'delPlayRecord']),
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
              this.delPlayRecord({msgId: id})
              break;
          }
        }
      }
    },
    created() {
      this.queryList()
    }
  }
</script>

<style scoped lang="less">
    .playRecord {
        &-container {

        }
        &-head-top-img {
            width: 100%;
            height: 300px;
            background: #fde3e3;
        }
        &-head {
            padding: 20px;
            display: flex;
            flex-direction: row;

            &-left-icon {
                width: 60px;
                height: 60px;
                margin: 20px 20px 20px 20px;
            }
            &-record-text {
                padding: 20px 8px 0px 0px;
                font-size: 36px;
                color: #3e3e53;
            }
            &-record-number {
                padding: 25px 0px 0px 0px;
                font-size: 28px;
                color: #57668f;
            }

            &-right-icon {
                width: 42px;
                height: 39px;
                margin: 30px 30px 0px 0px;
                position: absolute;
                right: 30px;
            }
        }

        &-item {
            width: 100%;
            height: 200px;
            padding: 30px;
            display: flex;
            flex-direction: row;
            border-top: 1px solid #ddd;
            &-avatar {
                width: 94px;
                height: 94px;
                background-color: #ff9521;
                border-radius: 12px;
                float: left;
                margin: 30px 0px 0px 0px;
            }

            &-content {
                flex-grow: 1;
                padding: 20px;
                &-name {
                    padding: 6px 0px 0px 0px;
                    font-size: 28px;
                    color: #57668f;
                }
                &-detail {
                    font-size: 28px;
                    color: #111111;
                    padding: 20px 30px 22px 0px;
                }
            }

            &-img-more {
                width: 34px;
                height: 6px;
                margin: 59px 30px 0px 0px;
                /*position: absolute;*/
                /*right: 30px;*/
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
        color: #FFFFFF;
        font-size: 18px;
        display: block;
        line-height: 44px;
        background-color: #F44;
        display: flex;
        justify-content: center;
        align-items: Center;
    }
</style>
