<template>
    <div>
        <div class="purchase-head">
            <div class="purchase-head-text">最近学习</div>
            <img class="purchase-head-left-icon" src="../../assets/images/onlinecourse_arrow_down.png"/>
            <img class="purchase-head-right-icon" src="../../assets/images/my_sys_menu.png"/>
        </div>

        <div v-if="onLineVisionList.length != 0" class="purchase-container">
            <p>少年视野</p>
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
      return {}
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
        &-head {
            padding: 20px;
            display: flex;
            flex-direction: row;
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
                font-size: 36px;
                color: #3e3e53;
            }
        }
        &-container {
            &-item {
                width: 100%;
                height: 300px;
                padding: 30px;
                display: flex;
                flex-direction: row;
                border-top: 1px solid #ddd;
                &-avatar {
                    width: 150px;
                    height: 200px;
                    background-color: #fde7e7;
                    border-radius: 12px;
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
                    &-playto {
                        font-size: 28px;
                        color: #111111;
                        padding: 20px 30px 22px 0px;
                    }
                    &-updateto {
                        font-size: 28px;
                        color: #111111;
                        padding: 20px 30px 22px 0px;
                    }
                }
            }
        }
    }
</style>
