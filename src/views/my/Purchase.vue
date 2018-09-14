<template>
    <div class="purchase">
        <div class="purchase-head">
            <div class="purchase-head-text">最近学习</div>
            <img class="purchase-head-left-icon" src="../../assets/images/onlinecourse_arrow_down.png"/>
            <img class="purchase-head-right-icon" src="../../assets/images/my_sys_menu.png"/>
        </div>

        <div v-if="onLineVisionList.length !== 0" class="purchase-container">
            <p class="purchase-container-head">{{tab[0]}}</p>
            <div v-for="item in onLineVisionList" :key="item.id">
                <div class="purchase-container-item">
                    <img :src='null' class="purchase-container-item-avatar"/>
                    <div class="purchase-container-item-content">
                        <div class="purchase-container-item-content-name">{{item.name}}</div>
                        <div class="purchase-container-item-content-playto">{{item.readto}}</div>
                        <div class="purchase-container-item-content-updateto">{{item.lessonCount }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="onLineVideoList.length !== 0" class="purchase-container">
            <p class="purchase-container-head">{{tab[1]}}</p>
            <div v-for="item in onLineVisionList" :key="item.id">
                <div class="purchase-container-item">
                    <img :src='null' class="purchase-container-item-avatar"/>
                    <div class="purchase-container-item-content">
                        <div class="purchase-container-item-content-name">{{item.name}}</div>
                        <div class="purchase-container-item-content-playto">{{item.readto}}</div>
                        <div class="purchase-container-item-content-updateto">{{item.lessonCount }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="onLineReadList.length !== 0" class="purchase-container">
            <p class="purchase-container-head">{{tab[2]}}</p>
            <div v-for="item in onLineVisionList" :key="item.id">
                <div class="purchase-container-item">
                    <img :src='null' class="purchase-container-item-avatar"/>
                    <div class="purchase-container-item-content">
                        <div class="purchase-container-item-content-name">{{item.name}}</div>
                        <div class="purchase-container-item-content-playto">{{item.readto}}</div>
                        <div class="purchase-container-item-content-updateto">{{item.lessonCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers(
    'myPurchase'
  )
  export default {
    name: 'Purchase',
    data: function () {
      return {
        tab : ['少年视野','视频课程','读书会']
      }
    },
    computed: {
      ...mapState(['onLineVisionList', 'onLineVideoList', 'onLineReadList', "loading"]),
    },
    methods: {
      ...mapActions(['queryList']),
      getAllPurchase: function (orderBy) {

        this.queryList({type: 1003, orderBy: orderBy})//  获取视野
        this.queryList({type: 1005, orderBy: orderBy})//  获取在线课堂
        this.queryList({type: 1007, orderBy: orderBy})//  获取读书会
      }
    },
    created() {
      this.getAllPurchase("lastBought")
    }
  }
</script>

<style scoped lang="less">
    .purchase {
        background: #E3E3E3;
        &-head {
            padding: 20px;
            display: flex;
            flex-direction: row;
            background: white;
            &-left-icon {
                width: 30px;
                height: 30px;
                margin: 30px 20px 20px 20px;
            }
            &-right-icon {
                width: 42px;
                height: 39px;
                margin: 30px 30px 0px 0px;
                position: absolute;
                right: 30px;
            }
            &-text {
                padding: 20px 8px 0px 0px;
                font-size: 28px;
                font-weight: bold;
                color: #3e3e53;
            }
        }
        &-container {
            background: white;
            margin-top: 20px;
            padding: 0px 0px 40px 0px;
            &-head {
                font-size: 44px;
                font-weight: bold;
                padding: 40px 0px 40px 40px;
            }
            &-item {
                width: 100%;
                height: 260px;
                padding: 0px 20px 0px 30px;
                display: flex;
                flex-direction: row;
                &-avatar {
                    width: 150px;
                    height: 200px;
                    background-color: #fde7e7;
                    border-radius: 12px;
                    margin: 30px 0px 0px 0px;
                }
                &-content {
                    padding: 30px;
                    &-name {
                        padding: 24px 0px 0px 0px;
                        color: #333333;
                        font-size: 30px;
                        font-weight: bold;
                    }
                    &-playto {
                        font-size: 26px;
                        color: #999999;
                        padding: 20px 30px 22px 0px;
                    }
                    &-updateto {
                        font-size: 26px;
                        color: #999999;
                        padding: 20px 30px 0px 0px;
                    }
                }
            }
        }
    }
</style>
