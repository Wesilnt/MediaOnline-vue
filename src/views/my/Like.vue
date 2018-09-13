<template>
    <section>
        <div v-if="likeList.length===0" class="like-nodata">
            <i class="qhht-icon like-nodata-icon"/>
            <p class="like-nodata-warn">暂无任何收藏</p>
            <a class="like-nodata-btn"></a>
        </div>
        <div v-else class="like-container">
            <div class="like-head-top-img">
            </div>
            <div class="like-head">
                <img class="like-head-left-icon" src="../../assets/images/my_record_play.png"/>
                <div class="like-head-record-text">最近播放</div>
                <div class="like-head-record-number">(共26条记录)</div>
                <img class="like-head-right-icon" src="../../assets/images/my_sys_menu.png">
            </div>

            <div v-for="item in likeList" :key="item.id">
                <van-swipe-cell :right-width="150" :on-close="onClose(item.id)">
                    <div class="like-item">
                        <img src="" class="like-item-avatar"/>
                        <div class="like-item-content">
                            <div class="like-item-content-name">{{item.title}}</div>
                            <div class="like-item-content-detail">{{item.subTitle}}</div>
                        </div>
                        <img class="like-item-img-more" src="../../assets/images/my_record_more.png"/>
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
    'myLike'
  )
  export default {
    name: 'Like',
    components: {
      // NavBar
    },
    data: function () {
      return {}
    },
    computed: {
      ...mapState(['likeList', 'loading'])
    },
    methods: {
      ...mapActions(['queryList', 'delMyLike']),
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
              this.delMyLike({id: id})
              break;
          }
        }
      }
    },
   cccccc
  }
</script>

<style scoped lang="less">
    .like {
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
