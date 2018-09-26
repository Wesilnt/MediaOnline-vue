<template>
    <section>
        <div v-if="onLineVisionList.length === 0 &&onLineVideoList.length === 0 && onLineReadList.length === 0 " >
            <div class="purchase-nodata">
                <i class="qhht-icon purchase-nodata-icon"/>
                <p class="purchase-nodata-warn">暂无购买记录</p>
                <a class="purchase-nodata-btn"></a>
            </div>
        </div>
        <div v-else class="purchase">
            <div class="purchase-head">
                <div class="purchase-head-text">最近学习</div>
                <img class="purchase-head-left-icon" src="../../assets/images/onlinecourse_arrow_down.png"/>
                <img class="purchase-head-right-icon" src="../../assets/images/my_sys_menu.png"/>
            </div>

            <div v-if="onLineVisionList.length !== 0" class="purchase-container">
                <p class="purchase-container-head">{{tab[0]}}</p>
                <div v-for="item in onLineVisionList" :key="item.id">
                    <div class="purchase-container-item" @click='toPlayAudio(item.newestLessonId)'>
                        <img :src='item.coverPic' class="purchase-container-item-avatar"/>
                        <div class="purchase-container-item-content">
                            <div class="purchase-container-item-content-name">{{item.name}}</div>
                            <div class="purchase-container-item-content-playto">播放至：{{item.readto}}</div>
                            <div class="purchase-container-item-content-updateto">更新至：{{item.lessonCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="onLineVideoList.length !== 0" class="purchase-container">
                <p class="purchase-container-head">{{tab[1]}}</p>
                <div v-for="item in onLineVideoList" :key="item.id">
                    <div class="purchase-container-item" @click='toPlayVideo(item.newestLessonId)'>
                        <img :src='item.coverPic' class="purchase-container-item-avatar"/>
                        <div class="purchase-container-item-content">
                            <div class="purchase-container-item-content-name">{{item.name}}</div>
                            <div class="purchase-container-item-content-playto">播放至：{{item.readto}}</div>
                            <div class="purchase-container-item-content-updateto">更新至：{{item.lessonCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="onLineReadList.length !== 0" class="purchase-container">
                <p class="purchase-container-head">{{tab[2]}}</p>
                <div v-for="item in onLineReadList" :key="item.id">
                    <div class="purchase-container-item" @click='toPlayAudio(item.newestLessonId)'>
                        <img :src='item.coverPic' class="purchase-container-item-avatar"/>
                        <div class="purchase-container-item-content">
                            <div class="purchase-container-item-content-name">{{item.name}}</div>
                            <div class="purchase-container-item-content-playto">播放至：{{ item.availLessonCount }} |  {{ item.lastViewLessonTitle }}</div>
                            <div class="purchase-container-item-content-updateto">更新至：{{ item.lessonCount }}  |  {{ item.newestLessonTitle }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('myPurchase')
export default {
  name: 'Purchase',
  data: function() {
    return {
      tab: ['少年视野', '视频课程', '读书会']
    }
  },
  computed: {
    ...mapState([
      'onLineVisionList',
      'onLineVideoList',
      'onLineReadList',
      'loading'
    ])
  },
  methods: {
    ...mapActions(['queryList']),
    getAllPurchase: function(orderBy) {
      this.queryList({ type: 1003, orderBy: orderBy }) //  获取视野
      this.queryList({ type: 1005, orderBy: orderBy }) //  获取在线课堂
      this.queryList({ type: 1007, orderBy: orderBy }) //  获取读书会
    },
    toPlayAudio: function(id) {
      this.$router.push({ name: 'AudioPlay', params: { id } })
    },
    toPlayVideo: function(id) {
      console.log(id)
    }
  },
  created() {
    this.getAllPurchase('lastBought')
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
      height: 26px;
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
    &-item {
      width: 100%;
      height: 280px;
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
        padding-left: 30px;
        &-name {
          padding-top: 40px;
          color: #333333;
          font-size: 30px;
          font-weight: bold;
        }
        &-playto {
          font-size: 26px;
          color: #999999;
          padding: 32px 30px 0px 0px;
        }
        &-updateto {
          font-size: 26px;
          color: #999999;
          padding: 38px 30px 0px 0px;
        }
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
</style>
