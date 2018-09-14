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
                <p class="playRecord-head-record-number">(共{{playRecordList.length}}条记录)</p>
                <img class="playRecord-head-right-icon" src="../../assets/images/my_sys_menu.png">
            </div>
            <div v-for="item in playRecordList" :key="item.id" class="playRecord-list">
                <van-swipe-cell :right-width="150" :on-close="onClose(item.id)">
                    <div class="playRecord-list-item">
                        <!--<img src="" class="like-item-avatar"/>-->
                        <div class="playRecord-list-item-content">
                            <p class="playRecord-list-item-content-name">{{item.title}}</p>
                            <div>
                                <p v-if="" class="playRecord-list-item-content-detail">{{item.courseName}} -
                                    {{item.subTitle}} - {{item.learnTime}} / {{item.totalTime}}</p>
                            </div>
                        </div>
                        <img class="playRecord-list-item-img-more" src="../../assets/images/my_record_more.png"/>
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
            padding: 40px 30px 40px 0px;
            display: flex;
            flex-direction: row;
            margin-right: 30px;
            margin-left: 30px;
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
            &-record-number {
                padding: 6px 0px 0px 0px;
                font-size: 28px;
                color: #57668f;
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
                padding: 24px 0px 24px 63px;
                border-bottom: 0.1px solid #ddd;
                &-avatar {
                    width: 94px;
                    height: 94px;
                    background-color: #ff9521;
                    border-radius: 12px;
                    margin: 30px 0px 0px 0px;
                }
                &-content {
                    flex-grow: 1;
                    &-name {
                        padding: 6px 0px 0px 0px;
                        font-size: 36px;
                        color: #333030;
                    }
                    &-detail {
                        font-size: 24px;
                        color: #7d7d7e;
                        padding: 16px 0px 0px 0px;
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
