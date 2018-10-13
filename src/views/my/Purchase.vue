<template>
    <section>
        <div v-if="onLineVisionByBoughtList.length === 0 &&onLineVideoByBoughtList.length === 0 && onLineReadByBoughtList.length === 0 ">
            <div class="purchase-nodata">
                <i class="qhht-icon purchase-nodata-icon"/>
                <p class="purchase-nodata-warn">亲，您还没有购买</p>
                <a class="purchase-nodata-btn"></a>
            </div>
        </div>
        <div v-else class="purchase">
            <div class="purchase-head">
                <div class="purchase-head-text">最近学习</div>
                <img class="purchase-head-left-icon"
                     v-lazy="require('../../assets/images/onlinecourse_arrow_down.png')"/>
                <img class="purchase-head-right-icon" v-lazy="displayMenu" @click="handleMenu"/>
            </div>

            <div v-if="onLineVisionByBoughtList.length !== 0" class="purchase-container">
                <p class="purchase-container-head">{{tab[0]}}</p>
                <div v-if="isVertical" class="qhht-flex" >
                    <PurchaseListItem :item="item" :type="1003" v-for="(item,index) in onLineVisionByBoughtList" :key="index"/>
                </div>
                <div v-if="!isVertical" class="qhht-flex list" >
                    <PurchaseGridItem :item="item" :type="1003" v-for="(item,index) in onLineVisionByLearnList" :key="index"/>
                </div>
            </div>
            <div v-if="onLineVideoByBoughtList.length !== 0" class="purchase-container">
                <p class="purchase-container-head">{{tab[1]}}</p>
                <div v-if="isVertical" class="qhht-flex" >
                    <PurchaseListItem :item="item" :type="1005" v-for="(item,index) in onLineVideoByBoughtList" :key="index"/>
                </div>
                <div v-if="!isVertical" class="qhht-flex list" >
                    <PurchaseGridItem :item="item" :type="1005" v-for="(item,index) in onLineVideoByLearnList" :key="index"/>
                </div>
            </div>
            <div v-if="onLineReadByBoughtList.length !== 0" class="purchase-container">
                <p class="purchase-container-head">{{tab[2]}}</p>
                <div v-if="isVertical" class="qhht-flex" >
                    <PurchaseListItem :item="item" :type="1007" v-for="(item,index) in onLineReadByBoughtList" :key="index"/>
                </div>
                <div v-if="!isVertical" class="qhht-flex list" >
                    <PurchaseGridItem :item="item" :type="1007" v-for="(item,index) in onLineReadByLearnList" :key="index"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import PurchaseGridItem from './component/PurcheaseGridItem'
  import PurchaseListItem from './component/PurcheaseListItem'
  import myMenuList from './../../assets/images/my_menu_list.png'
  import myMenuGrid from './../../assets/images/my_menu_grid.png'

  const {mapState, mapActions} = createNamespacedHelpers('myPurchaseData')
  export default {
    name: 'Purchase',
    components: {
      PurchaseListItem,
      PurchaseGridItem
    },
    data: function () {
      return {
        tab: ['少年视野', '视频课程', '读书会'],
        isVertical: true,
        displayMenu: myMenuList
      }
    },
    computed: {
      ...mapState([
        'onLineVisionByBoughtList',
        'onLineVideoByBoughtList',
        'onLineReadByBoughtList',
        'onLineVisionByLearnList',
        'onLineVideoByLearnList',
        'onLineReadByLearnList',
        'loading'
      ])
    },
    methods: {
      ...mapActions(['queryListByBought', 'queryListByLearn']),
      getAllPurchaseByBought: function () {
        this.queryListByBought({type: 1003}) //  获取视野
        this.queryListByBought({type: 1005}) //  获取在线课堂
        this.queryListByBought({type: 1007}) //  获取读书会
      },
      getAllPurchaseByLearn: function () {
        this.queryListByLearn({type: 1003}) //  获取视野
        this.queryListByLearn({type: 1005}) //  获取在线课堂
        this.queryListByLearn({type: 1007}) //  获取读书会
      },
      handleMenu: function () {
        // 横竖显示切换
        this.isVertical = !this.isVertical
        if (this.isVertical) {
          this.displayMenu = myMenuList
        } else {
          this.displayMenu = myMenuGrid
          this.getAllPurchaseByLearn()
        }
      },
      toPlayAudio: function (item) {
        this.$router.push({path: '/home/visionDetail/' + item.id})
      },
      toPlayVideo: function (item) {
        this.$router.push({name: 'videoCourseDetail', params: {lessonId: item.id}})
      }
    },
    created() {
      // 默认根据购买时间排序
      this.getAllPurchaseByBought()
    }
  }
</script>

<style scoped lang="less">
    .purchase {
        background: #e3e3e3;
        &-head {
            padding: 20px;
            display: flex;
            flex-direction: row;
            background: white;
            &-left-icon {
                width: 30px;
                height: 30px;
                margin: 25px 20px 20px 20px;
            }
            &-right-icon {
                width: 28px;
                height: 28px;
                margin: 30px 0px 0px 0px;
                position: absolute;
                right: 30px;
            }
            &-text {
                padding: 20px 8px 0px 0px;
                font-size: 28px;
                font-weight: bold;
                color: #666666;
            }
        }
        &-container {
            background: white;
            margin-top: 18px;
            padding: 0px 0px 40px 0px;
            &-head {
                font-size: 44px;
                font-weight: bold;
                padding: 40px 0px 40px 30px;
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
                background-image: url('../../assets/images/my_data_empty.png');
            }
            &-warn {
                margin: 40px 0;
            }
        }
    }
    .list {
        flex-wrap: wrap;
        padding: 30px;
    }
</style>
